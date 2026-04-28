<script lang="ts">
  import { env } from '$env/dynamic/public'
  import { mediaUrl } from '$lib/payload'
  import type { Media } from '@repo/payload-types'

  type Props = {
    image?: Media
    title: string
    patchImage?: Media
  }

  let { image, title, patchImage }: Props = $props()
  const src = $derived(mediaUrl(image, env.PUBLIC_PAYLOAD_URL))
  const patchSrc = $derived(mediaUrl(patchImage, env.PUBLIC_PAYLOAD_URL))
</script>

{#if image}
  <div class="relative">
    <div class="relative w-full h-[40vh] overflow-hidden">
      <img {src} alt={image?.alt ?? title} class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>

      <div
        class="absolute bottom-6 left-6 right-6 mx-auto max-w-6xl flex items-end justify-between"
      >
        <h1 class="font-display text-5xl uppercase leading-none text-white">
          {title}
        </h1>

        <!-- {#if patchSrc}
          <img
            src={patchSrc}
            alt="Trail patch"
            class="w-20 shrink-0 rotate-6 drop-shadow-lg md:hidden"
          />
        {/if} -->
      </div>
    </div>

    {#if patchSrc}
      <div
        class="flex absolute bottom-0 left-6 right-0 mx-auto max-w-6xl justify-end md:translate-y-1/4 lg:translate-y-1/3 z-10 pointer-events-none"
      >
        <img
          src={patchSrc}
          alt="Trail patch"
          class="w-32 sm:w-64 md:w-84 rotate-4 drop-shadow-lg pointer-events-auto"
        />
      </div>
    {/if}
  </div>
{:else}
  <div class="pt-16 pb-8 px-6 container mx-auto max-w-6xl">
    <h1 class="font-display text-5xl uppercase leading-none">{title}</h1>
  </div>
{/if}
