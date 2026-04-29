<script lang="ts">
  import type { Page, Post, Trail, Event } from '$lib/payload'
  import type { SuperValidated, Infer } from 'sveltekit-superforms'
  import type { TrailSubmitSchema } from '$lib/trail-submit-schema'
  import type { EventsSignUpSchema } from '$lib/events-signup-schema'
  import type { PatchRequestSchema } from '$lib/patch-request-schema'

  import HeroSection from './sections/HeroSection.svelte'
  import CampaignStepsSection from './sections/CampaignStepsSection.svelte'
  import CampaignStepsRectanglesSection from './sections/CampaignStepsRectanglesSection.svelte'
  import TopTrailsSection from './sections/TopTrailsSection.svelte'
  import TrailsOverviewSection from './sections/TrailsOverviewSection.svelte'
  import UserFormSection from './sections/UserFormSection.svelte'
  import BlogSection from './sections/BlogSection.svelte'
  import InfluencerCarouselSection from './sections/InfluencerCarouselSection.svelte'
  import EventsSection from './sections/EventsSection.svelte'
  import CTASection from './sections/CTASection.svelte'
  import FAQSection from './sections/FAQSection.svelte'
  import TextSection from './sections/TextSection.svelte'
  import PickupPointsSection from './sections/PickupPointsSection.svelte'

  type Props = {
    blocks: Page['layout']
    form?: SuperValidated<Infer<TrailSubmitSchema>>
    signUpForm?: SuperValidated<Infer<EventsSignUpSchema>>
    patchRequestForm?: SuperValidated<Infer<PatchRequestSchema>>
    events?: Event[]
    trailsWithStores?: Trail[]
  }

  let { blocks, form, signUpForm, patchRequestForm, events = [], trailsWithStores = [] }: Props = $props()
</script>

{#if blocks?.length}
  {#if blocks[0]?.blockType !== 'hero'}
    <div class="pt-24 md:pt-32"></div>
  {/if}
  {#each blocks as block (block.id ?? block.blockType)}
    {#if block.blockType === 'hero'}
      <HeroSection {block} />
    {:else if block.blockType === 'campaign-steps'}
      {#if block.version === 'rectangles'}
        <CampaignStepsRectanglesSection {block} />
      {:else}
        <CampaignStepsSection {block} />
      {/if}
    {:else if block.blockType === 'top-trails'}
      <TopTrailsSection
        {block}
        trails={(block.trails ?? []).filter((t): t is Trail => typeof t === 'object')}
      />
    {:else if block.blockType === 'trails-overview'}
      <TrailsOverviewSection {block} />
    {:else if block.blockType === 'user-form'}
      <UserFormSection {block} trailForm={form} {patchRequestForm} />
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
    {:else if block.blockType === 'faq'}
      <FAQSection {block} />
    {:else if block.blockType === 'text'}
      <TextSection {block} />
    {:else if block.blockType === 'pickup-points'}
      <PickupPointsSection {block} trails={trailsWithStores} />
    {/if}
  {/each}
{/if}
