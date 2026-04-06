<script lang="ts">
  import type { Snippet } from 'svelte'

  type Props = {
    active?: boolean
    onclick: () => void
    children: Snippet
  }

  let { active = false, onclick, children }: Props = $props()
</script>

<button
  {onclick}
  class="px-3 cursor-pointer py-1.5 text-xs font-bold uppercase tracking-widest border transition-colors text-orijen-white {active
    ? 'bg-orijen-red border-orijen-red'
    : 'border-orijen-gray/30  hover:border-orijen-red hover:text-orijen-red'}"
>
  {@render children()}
</button>
