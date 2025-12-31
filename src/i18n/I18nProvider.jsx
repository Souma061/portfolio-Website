import { useCallback, useEffect, useMemo, useState } from 'react';
import { projects as projectsEn } from '../data/projects.js';
import { skillCategories as skillCategoriesEn } from '../data/skills.js';
import { I18nContext } from './context.js';
import { localizeObjectWithLingo } from './lingo.js';
import { DEFAULT_LOCALE, SOURCE_LOCALE, STORAGE_KEYS, SUPPORTED_LOCALES } from './locales.js';
import { messagesEn } from './messages.en.js';

function hydrateSkills(cachedSkills) {
  if (!Array.isArray(cachedSkills)) return null;
  if (cachedSkills.length !== skillCategoriesEn.length) return null;

  return skillCategoriesEn.map((base, index) => {
    const cached = cachedSkills[index];
    if (!cached || typeof cached !== 'object') return base;

    // Never trust cached icon (it is not JSON-serializable).
    return {
      ...base,
      title: typeof cached.title === 'string' ? cached.title : base.title,
      skills: Array.isArray(cached.skills) ? cached.skills : base.skills,
    };
  });
}

function stripSkillsForCache(skills) {
  if (!Array.isArray(skills)) return skills;
  return skills.map((c) => {
    if (!c || typeof c !== 'object') return c;
    // Drop `icon` so JSON.stringify doesn't produce broken values.
    // Keep only serializable fields.
    return {
      title: c.title,
      skills: c.skills,
    };
  });
}

function hydrateProjects(cachedProjects) {
  if (!Array.isArray(cachedProjects)) return null;
  if (cachedProjects.length !== projectsEn.length) return null;

  const cachedById = new Map();
  for (const p of cachedProjects) {
    if (p && typeof p === 'object' && typeof p.id === 'number') cachedById.set(p.id, p);
  }

  // If ids don't match, treat cache as stale.
  for (const p of projectsEn) {
    if (!cachedById.has(p.id)) return null;
  }

  return projectsEn.map((base) => {
    const cached = cachedById.get(base.id);
    return {
      ...base,
      title: typeof cached.title === 'string' ? cached.title : base.title,
      description: typeof cached.description === 'string' ? cached.description : base.description,
    };
  });
}

function safeReadJson(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function safeWriteJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota / private mode
  }
}

function buildProjectsTranslatableObject() {
  const obj = {};
  for (const p of projectsEn) {
    obj[`projects.${p.id}.title`] = p.title;
    obj[`projects.${p.id}.description`] = p.description;
  }
  return obj;
}

function buildSkillsTranslatableObject() {
  const obj = {};
  for (const category of skillCategoriesEn) {
    obj[`skills.category.${category.title}`] = category.title;
  }
  return obj;
}

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.locale) : null;
    const normalized = stored && SUPPORTED_LOCALES.some((l) => l.code === stored) ? stored : DEFAULT_LOCALE;
    return normalized;
  });

  const [isTranslating, setIsTranslating] = useState(false);

  const [ui, setUi] = useState(messagesEn);
  const [projects, setProjects] = useState(projectsEn);
  const [skills, setSkills] = useState(skillCategoriesEn);

  const setLocale = useCallback((nextLocale) => {
    const normalized = SUPPORTED_LOCALES.some((l) => l.code === nextLocale) ? nextLocale : DEFAULT_LOCALE;
    setLocaleState(normalized);
    try {
      localStorage.setItem(STORAGE_KEYS.locale, normalized);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (locale === SOURCE_LOCALE) {
        setUi(messagesEn);
        setProjects(projectsEn);
        setSkills(skillCategoriesEn);
        return;
      }

      const cachedUi = safeReadJson(STORAGE_KEYS.ui(locale));
      const cachedProjectsRaw = safeReadJson(STORAGE_KEYS.projects(locale));
      const cachedProjects = hydrateProjects(cachedProjectsRaw);
      const cachedSkillsRaw = safeReadJson(STORAGE_KEYS.skills(locale));
      const cachedSkills = hydrateSkills(cachedSkillsRaw);

      if (cachedUi) setUi(cachedUi);
      if (cachedProjects) setProjects(cachedProjects);
      if (cachedSkills) setSkills(cachedSkills);

      // If everything is cached, we're done.
      if (cachedUi && cachedProjects && cachedSkills) return;

      setIsTranslating(true);
      try {
        const needsUi = !cachedUi;
        const needsProjects = !cachedProjects;
        const needsSkills = !cachedSkills;

        const objectToTranslate = {
          ...(needsUi ? messagesEn : null),
          ...(needsProjects ? buildProjectsTranslatableObject() : null),
          ...(needsSkills ? buildSkillsTranslatableObject() : null),
        };

        const translated = await localizeObjectWithLingo(objectToTranslate, {
          sourceLocale: SOURCE_LOCALE,
          targetLocale: locale,
        });

        if (!translated) return;

        if (cancelled) return;

        if (needsUi) {
          const nextUi = {};
          for (const key of Object.keys(messagesEn)) {
            nextUi[key] = typeof translated[key] === 'string' ? translated[key] : messagesEn[key];
          }
          setUi(nextUi);
          safeWriteJson(STORAGE_KEYS.ui(locale), nextUi);
        }

        if (needsProjects) {
          const localizedProjects = projectsEn.map((p) => ({
            ...p,
            title: translated[`projects.${p.id}.title`] ?? p.title,
            description: translated[`projects.${p.id}.description`] ?? p.description,
          }));
          setProjects(localizedProjects);
          safeWriteJson(STORAGE_KEYS.projects(locale), localizedProjects);
        }

        if (needsSkills) {
          const localizedSkills = skillCategoriesEn.map((c) => ({
            ...c,
            title: translated[`skills.category.${c.title}`] ?? c.title,
          }));
          setSkills(localizedSkills);
          safeWriteJson(STORAGE_KEYS.skills(locale), stripSkillsForCache(localizedSkills));
        }
      } catch (err) {
        // If translation fails, keep English/cached.
        console.error('Lingo translation error:', err);
      } finally {
        if (!cancelled) setIsTranslating(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [locale]);

  const t = useCallback(
    (key) => {
      if (locale === SOURCE_LOCALE) return messagesEn[key] ?? key;
      return ui[key] ?? messagesEn[key] ?? key;
    },
    [locale, ui],
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      locales: SUPPORTED_LOCALES,
      isTranslating,
      t,
      projects,
      skills,
    }),
    [isTranslating, locale, projects, setLocale, skills, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
