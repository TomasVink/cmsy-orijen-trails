<script lang="ts">
  import type { PageData } from './$types'
  import type { Media, Trail, TrailLabelsData } from '$lib/payload'
  import { mediaUrl } from '$lib/payload'
  import { env } from '$env/dynamic/public'
  import Icon from '$lib/components/ui/Icon.svelte'
  import type { ICONS } from '$lib/icons'
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
      .filter((x): x is { src: string; alt: string } => x !== null)
  )

  let modalOpen = $state(false)
  let modalIndex = $state(0)

  function openGallery(i: number) {
    modalIndex = i
    modalOpen = true
  }

  const properties: Array<{
    name: keyof Trail
    icon: keyof typeof ICONS
    label?: string
    labelsKey?: keyof TrailLabelsData
  }> = [
    { name: 'distance', icon: 'route', label: '%s km' },
    { name: 'duration', icon: 'clock', label: '%s h' },
    { name: 'difficulty', icon: 'terrain' },
    { name: 'offLeashArea', icon: 'pets', labelsKey: 'offLeash' },
    { name: 'hospitality', icon: 'restaurant' },
    { name: 'water', icon: 'water' }
  ]
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
  <div class="flex flex-wrap gap-6 text-orijen-red p-4 justify-center">
    {#each properties as property}
      {#if trail[property.name]}
        {@const value = trail[property.name]}
        {@const labelEntry = (labels as Record<string, unknown> | null)?.[
          property.labelsKey ?? property.name
        ]}
        {@const labelText = property.label
          ? property.label.replace('%s', String(value))
          : typeof labelEntry === 'object' && labelEntry !== null
            ? ((labelEntry as Record<string, string>)[String(value)] ?? String(value))
            : String(labelEntry ?? value)}
        <span class="flex items-center gap-2">
          <Icon name={property.icon} />
          <span class="font-display text-xl text-white">{labelText}</span>
        </span>
      {/if}
    {/each}
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
      {#if trail.links && trail.links.length > 0}
        <div class="mb-8">
          <div class="flex flex-col gap-3">
            {#each trail.links as link}
              {@const icon =
                link.type === 'komoot'
                  ? 'komoot'
                  : link.type === 'allTrails'
                    ? 'allTrails'
                    : 'website'}
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 text-orijen-gray hover:text-orijen-red transition-colors"
              >
                <Icon name={icon} />
                <span class="font-display text-xl">
                  {link.type === 'allTrails'
                    ? 'AllTrails'
                    : link.type === 'komoot'
                      ? 'Komoot'
                      : link.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
                </span>
              </a>
            {/each}
          </div>
        </div>
      {/if}
      <RelatedContent related={trail.related} />
    </div>
  </div>
</div>

<ImageModal images={galleryImages} bind:open={modalOpen} bind:index={modalIndex} />
