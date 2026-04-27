<script lang="ts">
  import type { TopTrailsBlock, Trail, TrailLabelsData } from '$lib/payload'
  import Section from '$lib/components/ui/Section.svelte'
  import TrailCard from '$lib/components/ui/TrailCard.svelte'
  import Icon from '$lib/components/ui/Icon.svelte'
  import Button from '$lib/components/ui/Button.svelte'
  import Carousel from '$lib/components/ui/Carousel.svelte'
  import { page } from '$app/state'

  type Props = { block: TopTrailsBlock; trails: Trail[] }
  let { block, trails }: Props = $props()

  const trailLabels = $derived(page.data.trailLabels as TrailLabelsData | null)
  const locale = $derived(page.params.locale ?? 'nl')
</script>

<Section
  title={block.title}
  intro={block.intro ?? undefined}
  id={block.sectionId}
  backgroundImage={block.backgroundImage}
  backgroundColor={block.backgroundColor}
>
  <Carousel items={trails} ariaLabel="Trail carousel">
    {#snippet children(trail)}
      <TrailCard {trail} />
    {/snippet}
  </Carousel>

  <div class="mt-8 text-center">
    <Button href="/{locale}/trails" variant="outline">
      {trailLabels?.viewAllTrails ?? 'View all trails'}
      <Icon name="arrow-right" />
    </Button>
  </div>
</Section>
