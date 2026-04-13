<script lang="ts">
  import type { Page, Post, Trail, Event } from '$lib/payload'
  import type { SuperValidated, Infer } from 'sveltekit-superforms'
  import type { TrailSubmitSchema } from '$lib/trail-submit-schema'
  import type { EventsSignUpSchema } from '$lib/events-signup-schema'

  import HeroSection from './sections/HeroSection.svelte'
  import CampaignStepsSection from './sections/CampaignStepsSection.svelte'
  import TopTrailsSection from './sections/TopTrailsSection.svelte'
  import TrailsOverviewSection from './sections/TrailsOverviewSection.svelte'
  import SubmitTrailSection from './sections/SubmitTrailSection.svelte'
  import BlogSection from './sections/BlogSection.svelte'
  import InfluencerCarouselSection from './sections/InfluencerCarouselSection.svelte'
  import EventsSection from './sections/EventsSection.svelte'
  import CTASection from './sections/CTASection.svelte'

  type Props = {
    blocks: Page['layout']
    form?: SuperValidated<Infer<TrailSubmitSchema>>
    signUpForm?: SuperValidated<Infer<EventsSignUpSchema>>
    events?: Event[]
  }

  let { blocks, form, signUpForm, events = [] }: Props = $props()
</script>

{#if blocks?.length}
  {#each blocks as block (block.id ?? block.blockType)}
    {#if block.blockType === 'hero'}
      <HeroSection {block} />
    {:else if block.blockType === 'campaign-steps'}
      <CampaignStepsSection {block} />
    {:else if block.blockType === 'top-trails'}
      <TopTrailsSection
        {block}
        trails={(block.trails ?? []).filter((t): t is Trail => typeof t === 'object')}
      />
    {:else if block.blockType === 'trails-overview'}
      <TrailsOverviewSection {block} />
    {:else if block.blockType === 'submit-trail'}
      <SubmitTrailSection {block} {form} />
    {:else if block.blockType === 'blog'}
      <BlogSection
        {block}
        posts={(block.featuredPosts ?? []).filter((t): t is Post => typeof t === 'object')}
      />
    {:else if block.blockType === 'influencer-carousel'}
      <InfluencerCarouselSection {block} />
    {:else if block.blockType === 'events'}
      <EventsSection {block} {events} {signUpForm} />
    {:else if block.blockType === 'cta-block'}
      <CTASection {block} />
    {/if}
  {/each}
{/if}
