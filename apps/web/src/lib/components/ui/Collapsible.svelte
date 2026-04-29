<script lang="ts">
  import type { Snippet } from 'svelte'
  import Icon from './Icon.svelte'

  type Props = {
    title: string
    defaultCollapsed?: boolean
    class?: string
    children: Snippet
  }

  let { title, defaultCollapsed = true, class: titleClass = 'text-lg font-medium', children }: Props = $props()

  let collapsed = $state(defaultCollapsed)
</script>

<div>
  <button
    type="button"
    onclick={() => (collapsed = !collapsed)}
    class="w-full flex items-center justify-between gap-4 py-4 px-6 text-left bg-orijen-gray/10 hover:bg-orijen-gray/20 transition-colors cursor-pointer"
    aria-expanded={!collapsed}
  >
    <span class={titleClass}>{title}</span>
    <Icon
      name="chevron-down"
      class="size-6 shrink-0 transition-transform duration-200 {collapsed ? '' : 'rotate-180'}"
    />
  </button>
  {#if !collapsed}
    <div class="px-6 py-4">
      {@render children()}
    </div>
  {/if}
</div>
