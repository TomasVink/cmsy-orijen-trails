<script lang="ts">
  import type { InfluencerCarouselBlock, Influencer, Media } from '$lib/payload'
  import { mediaUrl } from '$lib/payload'
  import Section from '$lib/components/ui/Section.svelte'
  import { env } from '$env/dynamic/public'

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

<Section id="influencers" class="py-20 bg-white">
  <h2 class="font-display text-5xl md:text-6xl uppercase leading-none mb-10">{block.title}</h2>

  <!-- Horizontally scrollable carousel -->
  <div class="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory">
    {#each influencers as influencer (influencer.id)}
      {@const src = getImageSrc(influencer)}
      <a
        href={influencer.profileUrl}
        target="_blank"
        rel="noreferrer"
        class="group shrink-0 w-56 snap-start flex flex-col gap-3"
      >
        <!-- Avatar -->
        <div class="aspect-square overflow-hidden bg-orijen-gray/10">
          {#if src}
            <img
              {src}
              alt={influencer.name}
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          {:else}
            <div class="w-full h-full flex items-center justify-center">
              <span class="font-display text-4xl text-orijen-gray/40 uppercase">{influencer.name[0]}</span>
            </div>
          {/if}
        </div>

        <!-- Info -->
        <div>
          <p class="font-display text-lg uppercase leading-none">{influencer.name}</p>
          <p class="font-sans text-sm text-orijen-gray">@{influencer.handle}</p>
        </div>
      </a>
    {/each}
  </div>
</Section>
