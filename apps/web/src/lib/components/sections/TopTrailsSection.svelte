<script lang="ts">
  import type { TopTrailsBlock, Trail } from '$lib/payload'
  import Section from '$lib/components/ui/Section.svelte'
  import RichText from '$lib/components/ui/RichText.svelte'
  import TrailCard from '$lib/components/ui/TrailCard.svelte'
  import Button from '$lib/components/ui/Button.svelte'

  type Props = { block: TopTrailsBlock }
  let { block }: Props = $props()

  // Payload populates relations at depth ≥ 1; filter out any un-populated IDs
  const trails = $derived(
    (block.trails ?? []).filter((t): t is Trail => typeof t === 'object')
  )
</script>

<Section id="top-trails" class="py-20 bg-black text-white">
  <div class="flex flex-col lg:flex-row gap-12 items-start">
    <!-- Campaign text column -->
    <div class="lg:w-1/3 shrink-0">
      <h2 class="font-display text-5xl md:text-6xl uppercase leading-none mb-6">{block.title}</h2>
      {#if block.campaignText}
        <RichText content={block.campaignText} class="text-white/70 [&_a]:text-orijen-red" />
      {/if}
      <div class="mt-8">
        <Button href="/#trails" variant="outline">View all trails</Button>
      </div>
    </div>

    <!-- Trail cards column -->
    <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {#each trails.slice(0, 5) as trail (trail.id)}
        <TrailCard {trail} />
      {/each}
    </div>
  </div>
</Section>
