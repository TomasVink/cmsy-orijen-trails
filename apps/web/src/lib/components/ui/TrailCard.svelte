<script lang="ts">
  import type { Trail, Media, TrailLabelsData } from '$lib/payload'
  import { mediaUrl } from '$lib/payload'
  import { env } from '$env/dynamic/public'
  import { page } from '$app/state'
  import Icon from './Icon.svelte'
  import Button from './Button.svelte'
  import TrailProperties from './TrailProperties.svelte'

  type Props = {
    trail: Trail
    highlighted?: boolean
    onClose?: () => void
  }

  let { trail, highlighted = false, onClose }: Props = $props()

  const image = $derived(typeof trail.header === 'object' ? (trail.header as Media) : null)
  const imageSrc = $derived(mediaUrl(image, env.PUBLIC_PAYLOAD_URL))
  const trailLabels = $derived(page.data.trailLabels as TrailLabelsData | null)
</script>

<div
  class="flex flex-col h-full border border-orijen-gray/30 px-4 pt-2 pb-4 hover:border-orijen-red transition-colors duration-300 {highlighted
    ? 'bg-orijen-gray/50 hover:bg-orijen-gray/60'
    : 'bg-orijen-gray/20 hover:bg-orijen-gray/30'}"
  class:border-orijen-red={highlighted}
>
  {#if onClose}
    <button
      onclick={onClose}
      class="flex justify-end
    text-lg font-sans font-black cursor-pointer text-white hover:text-orijen-red transition-colors mb-2"
    >
      ╳
    </button>
  {/if}

  <!-- Image -->
  <div class="relative aspect-video bg-orijen-gray/10 overflow-hidden mb-5 shrink-0">
    {#if imageSrc}
      <img src={imageSrc} alt={image?.alt ?? trail.title} class="w-full h-full object-cover" />
    {:else}
      <div class="w-full h-full flex items-center justify-center">
        <span class="text-orijen-gray text-xs uppercase tracking-widest">No image</span>
      </div>
    {/if}

    <span
      class="absolute rounded-full top-2 left-2 w-fit max-w-[calc(100%-1rem)] text-sm font-bold uppercase tracking-widest px-4 py-2 {trail.community
        ? 'bg-orijen-gold'
        : 'bg-orijen-red text-white'}"
    >
      {trail.community ? trailLabels?.communityTrail : trailLabels?.approvedTrail}
    </span>
  </div>

  <h2 class="font-display text-3xl uppercase leading-none mb-2">
    {trail.title}
  </h2>

  <div class="flex flex-wrap align-middle text-orijen-red gap-2 bg-orijen-cream/10 p-2">
    <TrailProperties {trail} />
  </div>

  {#if trail.description}
    <p>{trail.description}</p>
  {/if}

  <div class="mt-auto pt-4">
    <Button href="/{page.params.locale}/trails/{trail.id}"
      >{trailLabels?.viewTrail ?? 'View trail'} <Icon name="arrow-right" /></Button
    >
  </div>
</div>
