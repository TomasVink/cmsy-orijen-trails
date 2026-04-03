<script lang="ts">
  import { env } from '$env/dynamic/public'
  import { mediaUrl } from '$lib/payload'
  import type { Media } from '@repo/payload-types'

  type Props = {
    image?: Media
    title: string
  }

  let { image, title }: Props = $props()
  const src = $derived(mediaUrl(image, env.PUBLIC_PAYLOAD_URL))
</script>

{#if image}
  <div class="relative w-full h-[40vh] overflow-hidden">
    <img {src} alt={image?.alt ?? title} class="w-full h-full object-cover" />
    <div class="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>

    <div class="absolute bottom-6 left-6 right-6 mx-auto max-w-4xl">
      <h1 class="font-display text-5xl uppercase leading-none text-white">
        {title}
      </h1>
    </div>
  </div>
{:else}
  <div class="pt-16 pb-8 px-6 container mx-auto max-w-4xl">
    <h1 class="font-display text-5xl uppercase leading-none">{title}</h1>
  </div>
{/if}
