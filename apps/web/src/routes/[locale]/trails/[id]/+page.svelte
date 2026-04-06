<script lang="ts">
  import type { PageData } from './$types'
  import type { Media } from '$lib/payload'
  import { mediaUrl } from '$lib/payload'
  import { env } from '$env/dynamic/public'
  import Icon from '$lib/components/ui/Icon.svelte'
  import RichText from '$lib/components/ui/RichText.svelte'
  import PageHeader from '$lib/components/ui/PageHeader.svelte'
  import RelatedContent from '$lib/components/ui/RelatedContent.svelte'
  import ImageModal from '$lib/components/ui/ImageModal.svelte'

  let { data }: { data: PageData } = $props()

  const trail = $derived(data.trail)
  const labels = $derived(data.trailLabels)

  const galleryImages = $derived(
    (trail.photos ?? [])
      .filter((p) => typeof p.image === 'object' && p.image)
      .map((p) => {
        const media = p.image as Media
        const src = mediaUrl(media, env.PUBLIC_PAYLOAD_URL)
        return src ? { src, alt: media.alt ?? trail.title ?? '' } : null
      })
      .filter((x) => x !== null)
  )

  let modalOpen = $state(false)
  let modalIndex = $state(0)

  function openGallery(i: number) {
    modalIndex = i
    modalOpen = true
  }
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

<div class="container mx-auto max-w-6xl py-8">
  <!-- Properties bar -->
  <hr class="divider" />
  <div class="flex flex-wrap gap-6 text-orijen-red p-4">
    {#if trail.distance}
      <span class="flex items-center gap-2">
        <Icon name="route" />
        <span class="font-display text-xl text-white">{trail.distance} km</span>
      </span>
    {/if}
    {#if trail.duration}
      <span class="flex items-center gap-2">
        <Icon name="clock" />
        <span class="font-display text-xl text-white">{trail.duration} h</span>
      </span>
    {/if}
    {#if trail.difficulty}
      <span class="flex items-center gap-2">
        <Icon name="terrain" />
        <span class="font-display text-xl text-white">
          {labels?.difficulty?.[trail.difficulty] ?? trail.difficulty}
        </span>
      </span>
    {/if}
    {#if trail.offLeashArea}
      <span class="flex items-center gap-2">
        <Icon name="pets" />
        <span class="font-display text-xl text-white">
          {labels?.offLeash?.[trail.offLeashArea] ?? trail.offLeashArea}
        </span>
      </span>
    {/if}
    {#if trail.hospitality}
      <span class="flex items-center gap-2">
        <Icon name="restaurant" />
        <span class="font-display text-xl text-white">{labels?.hospitality ?? 'Hospitality'}</span>
      </span>
    {/if}
    {#if trail.water}
      <span class="flex items-center gap-2">
        <Icon name="water" />
        <span class="font-display text-xl text-white">{labels?.water ?? 'Water'}</span>
      </span>
    {/if}
  </div>
  <hr class="divider mb-8" />

  <div class="flex flex-col lg:flex-row gap-12">
    <!-- Main content -->
    <div class="lg:w-3/4 px-4">
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
      {#if galleryImages.length > 0}
        <div class="mt-12">
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            {#each galleryImages as img, i}
              <button
                class="aspect-square overflow-hidden cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-orijen-red"
                onclick={() => openGallery(i)}
                aria-label="View photo {i + 1}"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </button>
            {/each}
          </div>
        </div>
      {/if}
    </div>

    <!-- Sidebar -->
    <div class="lg:w-1/4 px-4">
      <RelatedContent related={trail.related} />
    </div>
  </div>
</div>

<ImageModal images={galleryImages} bind:open={modalOpen} bind:index={modalIndex} />
