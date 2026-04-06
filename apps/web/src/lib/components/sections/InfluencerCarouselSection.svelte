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

  function getImageSrc(influencer: Influencer): string | null {
    const img = typeof influencer.image === 'object' ? (influencer.image as Media) : null
    return mediaUrl(img, env.PUBLIC_PAYLOAD_URL)
  }
</script>

<Section title={block.title} intro={block.intro ?? undefined} id={block.sectionId}>
  <!-- Horizontally scrollable carousel -->
  <div class="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory">
    {#each influencers as influencer (influencer.id)}
      <div class="w-56">
        <InfluencerCard {influencer} />
      </div>
    {/each}
  </div>
</Section>
