<script lang="ts">
  import { ICONS } from '$lib/icons'

  type Props = {
    name: string
    class?: string
  }

  let { name, class: className = 'w-8 h-8' }: Props = $props()

  const iconClass = $derived(ICONS[name] ?? '')
</script>

<span class="{iconClass} {className}" aria-hidden="true"></span>
