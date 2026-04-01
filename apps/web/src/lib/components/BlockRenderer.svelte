<script lang="ts">
  import type { Page } from '$lib/payload'

  import HeroSection from './sections/HeroSection.svelte'
  import CampaignStepsSection from './sections/CampaignStepsSection.svelte'
  import TopTrailsSection from './sections/TopTrailsSection.svelte'
  import TrailsOverviewSection from './sections/TrailsOverviewSection.svelte'
  import SubmitTrailSection from './sections/SubmitTrailSection.svelte'
  import BlogSection from './sections/BlogSection.svelte'
  import SocialButtonSection from './sections/SocialButtonSection.svelte'
  import InfluencerCarouselSection from './sections/InfluencerCarouselSection.svelte'

  type Props = {
    blocks: Page['layout']
  }

  let { blocks }: Props = $props()
</script>

{#if blocks?.length}
  {#each blocks as block (block.id ?? block.blockType)}
    {#if block.blockType === 'hero'}
      <HeroSection {block} />
    {:else if block.blockType === 'campaign-steps'}
      <CampaignStepsSection {block} />
    {:else if block.blockType === 'top-trails'}
      <TopTrailsSection {block} />
    {:else if block.blockType === 'trails-overview'}
      <TrailsOverviewSection {block} />
    {:else if block.blockType === 'submit-trail'}
      <SubmitTrailSection {block} />
    {:else if block.blockType === 'blog'}
      <BlogSection {block} />
    {:else if block.blockType === 'social-button'}
      <SocialButtonSection {block} />
    {:else if block.blockType === 'influencer-carousel'}
      <InfluencerCarouselSection {block} />
    {/if}
  {/each}
{/if}
