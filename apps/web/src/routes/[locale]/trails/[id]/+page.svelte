<script lang="ts">
  import type { PageData } from './$types'
  import type { Media } from '$lib/payload'
  import { mediaUrl } from '$lib/payload'
  import { env } from '$env/dynamic/public'
  import Icon from '$lib/components/ui/Icon.svelte'
  import RichText from '$lib/components/ui/RichText.svelte'
  import PageHeader from '$lib/components/ui/PageHeader.svelte'

  let { data }: { data: PageData } = $props()

  const trail = $derived(data.trail)
</script>

<svelte:head>
  <title>{trail.seo?.title ?? trail.title ?? 'Trail'}</title>
  {#if trail.seo?.description}
    <meta name="description" content={trail.seo.description} />
  {:else if trail.description}
    <meta name="description" content={trail.description} />
  {/if}
</svelte:head>

<PageHeader image={trail.header as Media} title={trail.title} />

<div class="container mx-auto max-w-4xl py-12">
  <a
    href="/{data.locale}"
    class="text-sm text-orijen-gray hover:text-white transition-colors mb-8 inline-block uppercase tracking-widest"
  >
    ← Back
  </a>

  <!-- Stats bar -->
  <div class="flex flex-wrap gap-6 text-orijen-gray border-y border-orijen-gray/30 py-5 my-8">
    {#if trail.distance}
      <span class="flex items-center gap-2">
        <Icon name="route" class="size-5" />
        <span class="font-display text-xl text-white">{trail.distance} km</span>
      </span>
    {/if}
    {#if trail.duration}
      <span class="flex items-center gap-2">
        <Icon name="clock" class="size-5" />
        <span class="font-display text-xl text-white">{trail.duration} h</span>
      </span>
    {/if}
  </div>

  {#if trail.description}
    <p class="text-lg text-orijen-gray mb-8">{trail.description}</p>
  {/if}

  {#if trail.content}
    <RichText
      content={trail.content}
      class="prose-invert prose-headings:font-display prose-headings:uppercase"
    />
  {/if}

  <!-- Photo gallery -->
  {#if trail.photos && trail.photos.length > 0}
    <div class="mt-12">
      <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
        {#each trail.photos as photo}
          {#if typeof photo.image === 'object' && photo.image}
            {@const src = mediaUrl(photo.image as Media, env.PUBLIC_PAYLOAD_URL)}
            {#if src}
              <div class="aspect-square overflow-hidden">
                <img
                  {src}
                  alt={(photo.image as Media).alt ?? trail.title}
                  class="w-full h-full object-cover"
                />
              </div>
            {/if}
          {/if}
        {/each}
      </div>
    </div>
  {/if}
</div>
