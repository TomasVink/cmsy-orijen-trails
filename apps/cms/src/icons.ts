// Predefined icon set using material-symbols-light via Iconify.
// To add a new icon:
//   1. Find the icon name at https://icon-sets.iconify.design/material-symbols-light/
//   2. Add an entry here with { label, value }
//   3. Add the SVG body to apps/web/src/lib/icons.ts

export const ICON_OPTIONS = [
  { label: 'Map Search', value: 'map-search' },
  { label: 'Group', value: 'group' },
  { label: 'Route', value: 'route' },
  { label: 'Clock', value: 'clock' },
] as const

export type IconName = (typeof ICON_OPTIONS)[number]['value']
