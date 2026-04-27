<script lang="ts">
  import type { InfluencerCarouselBlock, Influencer, Media } from '$lib/payload'
  import { mediaUrl } from '$lib/payload'
  import Section from '$lib/components/ui/Section.svelte'
  import { env } from '$env/dynamic/public'
  import InfluencerCard from '../ui/InfluencerCard.svelte'

  type Props = { block: InfluencerCarouselBlock }
  let { block }: Props = $props()

  const influencers = $derived(
    (block.influencers ?? []).filter((i): i is Influencer => typeof i === 'object')
  )
</script>

<Section
  title={block.title}
  intro={block.intro ?? undefined}
  id={block.sectionId}
  backgroundImage={block.backgroundImage}
  backgroundColor={block.backgroundColor}
>
  <div class="flex flex-wrap justify-center gap-4">
    {#each influencers as influencer (influencer.id)}
      <div class="w-[calc(50%-0.5rem)] sm:w-56">
        <InfluencerCard {influencer} />
      </div>
    {/each}
  </div>
</Section>
