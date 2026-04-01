<script lang="ts">
  import type { Trail, Media } from '$lib/payload'
  import { mediaUrl } from '$lib/payload'
  import { env } from '$env/dynamic/public'

  type Props = {
    trail: Trail
  }

  let { trail }: Props = $props()

  const image = $derived(
    typeof trail.header === 'object' ? (trail.header as Media) : null
  )
  const imageSrc = $derived(mediaUrl(image, env.PUBLIC_PAYLOAD_URL))

  const difficultyLabel: Record<string, string> = {
    easy: 'Easy',
    moderate: 'Moderate',
    challenging: 'Challenging',
  }
</script>

<article class="group flex flex-col bg-white border border-orijen-gray/30 overflow-hidden">
  <!-- Image -->
  <div class="relative aspect-[3/2] bg-orijen-gray/10 overflow-hidden">
    {#if imageSrc}
      <img
        src={imageSrc}
        alt={image?.alt ?? trail.title}
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    {:else}
      <div class="w-full h-full flex items-center justify-center">
        <span class="text-orijen-gray text-xs uppercase tracking-widest">No image</span>
      </div>
    {/if}

    {#if trail.difficulty}
      <span class="absolute top-3 left-3 bg-orijen-red text-white text-xs font-bold uppercase tracking-widest px-2 py-1">
        {difficultyLabel[trail.difficulty] ?? trail.difficulty}
      </span>
    {/if}
  </div>

  <!-- Content -->
  <div class="flex flex-col gap-2 p-4">
    <h3 class="font-display text-xl uppercase leading-none">{trail.title}</h3>

    <div class="flex items-center gap-3 text-sm text-orijen-gray">
      {#if trail.distance}
        <span>{trail.distance} km</span>
      {/if}
    </div>

    {#if trail.description}
      <p class="text-sm text-black/70 line-clamp-2">{trail.description}</p>
    {/if}
  </div>
</article>
