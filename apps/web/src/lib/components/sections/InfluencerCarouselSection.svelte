<script lang="ts">
  import type { InfluencerCarouselBlock, Influencer, Media } from '$lib/payload'
  import { mediaUrl } from '$lib/payload'
  import Section from '$lib/components/ui/Section.svelte'
  import Icon from '$lib/components/ui/Icon.svelte'
  import { env } from '$env/dynamic/public'

  type Props = { block: InfluencerCarouselBlock }
  let { block }: Props = $props()

  const influencers = $derived(
    (block.influencers ?? []).filter((i): i is Influencer => typeof i === 'object'),
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
      {@const primaryAccount = influencer.accounts[0]}
      <a
        href={primaryAccount.url}
        target="_blank"
        rel="noreferrer"
        class="group relative shrink-0 w-56 snap-start aspect-square overflow-hidden bg-orijen-gray/10 block border border-orijen-gray/30 hover:border-orijen-red transition-shadow"
      >
        <img
          src={(influencer.image as Media).url}
          alt={influencer.name}
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <!-- Gradient overlay -->
        <div
          class="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/80 group-hover:from-orijen-red/40 to-transparent pointer-events-none transition-colors duration-300"
        ></div>

        <!-- Handle overlay -->
        <div class="absolute inset-x-0 bottom-0 p-3 flex items-center gap-2 text-white">
          <Icon name={primaryAccount.platform} class="size-4 shrink-0" />
          {#if primaryAccount.handle}
            <span class="font-sans text-sm leading-none">@{primaryAccount.handle}</span>
          {/if}
        </div>
      </a>
    {/each}
  </div>
</Section>
