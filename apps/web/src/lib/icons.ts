// Predefined icon set using material-symbols-light via Iconify + Tailwind 4.
//
// To add a new icon:
//   1. Find the icon name on https://icon-sets.iconify.design/material-symbols-light/
//   2. Add an entry below: 'icon-name': 'icon-[material-symbols-light--icon-name]'
//      The full class string MUST be a static literal so Tailwind can detect it.
//   3. Also add the entry (label + value) to apps/cms/src/icons.ts

export const ICONS: Record<string, string> = {
  "map-search": "icon-[material-symbols-light--map-search]",
  group: "icon-[material-symbols-light--group]",
  route: "icon-[material-symbols-light--route]",
  clock: "icon-[material-symbols-light--nest-clock-farsight-analog-rounded]",
  "arrow-right": "icon-[material-symbols--arrow-right-alt-rounded]",
  "arrow-left": "icon-[material-symbols--arrow-left-alt-rounded]",
};
