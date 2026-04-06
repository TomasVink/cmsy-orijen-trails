// Predefined icon set using material-symbols-light via Iconify + Tailwind 4.
//
// To add a new icon:
//   1. Find the icon name on https://icon-sets.iconify.design/material-symbols-light/
//   2. Add an entry below: 'icon-name': 'icon-[material-symbols-light--icon-name]'
//      The full class string MUST be a static literal so Tailwind can detect it.
//   3. Also add the entry (label + value) to apps/cms/src/icons.ts

export const ICONS = {
  'map-search': 'icon-[material-symbols-light--map-search]',
  group: 'icon-[material-symbols-light--group]',
  route: 'icon-[material-symbols-light--route]',
  clock: 'icon-[material-symbols-light--nest-clock-farsight-analog-rounded]',
  terrain: 'icon-[ic--baseline-terrain]',
  pets: 'icon-[material-symbols-light--pets]',
  restaurant: 'icon-[material-symbols-light--restaurant]',
  water: 'icon-[material-symbols-light--water]',
  'arrow-right': 'icon-[material-symbols--arrow-right-alt-rounded]',
  'arrow-left': 'icon-[material-symbols--arrow-left-alt-rounded]',
  add: 'icon-[material-symbols-light--add]',
  send: 'icon-[material-symbols-light--send]',
  close: 'icon-[material-symbols-light--close]',
  check: 'icon-[material-symbols--check]',
  // Platforms
  instagram: 'icon-[simple-icons--instagram]',
  facebook: 'icon-[simple-icons--facebook]',
  linkedin: 'icon-[simple-icons--linkedin]',
  tiktok: 'icon-[simple-icons--tiktok]',
  twitter: 'icon-[simple-icons--x]',
  youtube: 'icon-[simple-icons--youtube]',
  website: 'icon-[material-symbols-light--language]',
  komoot: 'icon-[simple-icons--komoot]',
  allTrails: 'icon-[simple-icons--alltrails]'
} as const
