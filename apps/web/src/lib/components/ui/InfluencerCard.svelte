<script lang="ts">
  import type { Influencer, Media } from '$lib/payload'
  import { mediaUrl } from '$lib/payload'
  import { env } from '$env/dynamic/public'
  import Icon from './Icon.svelte'

  type Props = { influencer: Influencer }
  let { influencer }: Props = $props()

  const image = $derived(typeof influencer.image === 'object' ? (influencer.image as Media) : null)
  const imageSrc = $derived(mediaUrl(image, env.PUBLIC_PAYLOAD_URL))
  const primaryAccount = $derived(influencer.accounts[0])
</script>

<a
  href={primaryAccount.url}
  target="_blank"
  rel="noreferrer"
  class="group relative w-full snap-start aspect-square overflow-hidden bg-orijen-gray/10 block border border-orijen-gray/30 hover:border-orijen-red transition-shadow"
>
  <img
    src={(influencer.image as Media).url}
    alt={influencer.name}
    class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
  />

  <!-- Gradient overlay -->
  <div
    class="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/80 group-hover:from-orijen-red/40 to-transparent pointer-events-none transition-colors duration-300"
  ></div>

  <!-- Handle overlay -->
  <div class="absolute inset-x-0 bottom-0 p-3 flex items-center gap-2 text-white">
    <Icon name={primaryAccount.platform} class="size-4 shrink-0" />
    {#if primaryAccount.handle}
      <span class="font-sans text-sm leading-none">@{primaryAccount.handle}</span>
    {/if}
  </div>
</a>
