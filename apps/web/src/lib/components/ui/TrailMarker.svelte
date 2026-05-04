<script lang="ts">
  import type { Trail } from '@repo/payload-types'

  type Props = { selected?: boolean; hovered?: boolean; trail: Trail }
  let { selected = false, hovered = false, trail }: Props = $props()
</script>

<div
  class="rounded-full border-3 shadow cursor-pointer transition-all duration-150 hover:scale-110 size-8"
  class:border-orijen-gray={selected && !hovered}
  class:bg-orijen-cream={hovered}
  class:bg-orijen-red={!trail.community && !hovered}
  class:bg-orijen-gold={trail.community && !hovered}
></div>
