import { flavors } from '@catppuccin/palette'

const STORAGE_KEY = 'catppuccin-flavor'

/** @typedef {'mocha'|'latte'} CatppuccinFlavor */

export function getStoredCatppuccinFlavor() {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'latte' || value === 'mocha' ? value : null
  } catch {
    return null
  }
}

/** @param {CatppuccinFlavor} flavor */
export function setStoredCatppuccinFlavor(flavor) {
  try {
    localStorage.setItem(STORAGE_KEY, flavor)
  } catch {
    // ignore
  }
}

/**
 * Applies Catppuccin (Mocha/Latte) colors to CSS variables used by Tailwind v4 `@theme`.
 * Keeps your existing token names (base, mantle, crust, main, purple, etc.).
 *
 * @param {CatppuccinFlavor} flavor
 * @param {HTMLElement} root
 */
export function applyCatppuccinTheme(flavor = 'mocha', root = document.documentElement) {
  if (!root) return

  const selected = flavor === 'latte' ? flavors.latte : flavors.mocha
  const { colors, dark } = selected

  // Make UA widgets (inputs/scrollbars) match the theme.
  root.style.colorScheme = dark ? 'dark' : 'light'
  root.dataset.catppuccin = flavor

  // Map app token names -> Catppuccin flavor colors.
  const vars = {
    // Surfaces
    '--color-base': colors.base.hex,
    '--color-base-lighter': colors.mantle.hex,
    '--color-mantle': colors.mantle.hex,
    '--color-crust': colors.crust.hex,

    '--color-surface0': colors.surface0.hex,
    '--color-surface1': colors.surface1.hex,
    '--color-surface2': colors.surface2.hex,

    '--color-overlay0': colors.overlay0.hex,
    '--color-overlay1': colors.overlay1.hex,
    '--color-overlay2': colors.overlay2.hex,

    // Text
    '--color-main': colors.text.hex,
    '--color-subtext0': colors.subtext0.hex,
    '--color-subtext1': colors.subtext1.hex,

    // Accents
    '--color-blue': colors.blue.hex,
    '--color-sky': colors.sky.hex,
    '--color-cyan': colors.teal.hex, // no "cyan" in Catppuccin; teal is closest
    '--color-teal': colors.teal.hex,
    '--color-green': colors.green.hex,
    '--color-purple': colors.mauve.hex,
    '--color-pink': colors.pink.hex,
    '--color-rose': colors.rosewater.hex,
    '--color-orange': colors.peach.hex,
    '--color-yellow': colors.yellow.hex,
    '--color-red': colors.red.hex,
    '--color-lavender': colors.lavender.hex,
    '--color-sapphire': colors.sapphire.hex,

    // Common semantic
    '--color-border': colors.surface1.hex,

    // Aliases to keep existing Tailwind utilities within the active flavor
    '--color-gray-100': colors.subtext1.hex,
    '--color-gray-300': colors.subtext1.hex,
    '--color-gray-400': colors.subtext0.hex,
    '--color-gray-500': colors.overlay1.hex,
    '--color-gray-700': colors.surface2.hex,
    '--color-gray-900': colors.crust.hex,
    '--color-slate-900': colors.crust.hex,
  }

  for (const [key, value] of Object.entries(vars)) {
    root.style.setProperty(key, value)
  }
}

// Backward compatibility
export function applyCatppuccinMochaTheme(root = document.documentElement) {
  applyCatppuccinTheme('mocha', root)
}
