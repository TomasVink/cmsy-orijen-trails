<script lang="ts">
  import type { Trail } from '@repo/payload-types'

  type Props = { selected?: boolean; trail: Trail }
  let { selected = false, trail }: Props = $props()
</script>

<div
  class="rounded-full border-3 shadow cursor-pointer transition-all duration-150 hover:scale-110 size-8"
  class:border-orijen-gray={selected}
  class:bg-orijen-red={!trail.community}
  class:bg-orijen-gold={trail.community}
></div>
