export const SOURCE_LOCALE = 'en';

export const SUPPORTED_LOCALES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'bn', label: 'বাংলা' },
];

export const DEFAULT_LOCALE = 'en';

export const STORAGE_KEYS = {
  locale: 'portfolio-locale',
  ui: (locale) => `portfolio-i18n-ui-v2:${locale}`,
  projects: (locale) => `portfolio-i18n-projects-v2:${locale}`,
  skills: (locale) => `portfolio-i18n-skills-v2:${locale}`,
};
