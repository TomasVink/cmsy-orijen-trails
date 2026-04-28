<script lang="ts">
  import type { Store, Media } from '$lib/payload'
  import { mediaUrl } from '$lib/payload'
  import { env } from '$env/dynamic/public'
  import Icon from './Icon.svelte'

  type Props = { store: Store }
  let { store }: Props = $props()

  const logo = $derived(typeof store.logo === 'object' ? (store.logo as Media) : null)
  const logoSrc = $derived(mediaUrl(logo, env.PUBLIC_PAYLOAD_URL))
</script>

<a
  href={store.url}
  target="_blank"
  rel="noreferrer"
  class="p-4 bg-orijen-gray/20 border border-orijen-gray/30 hover:border-orijen-red hover:bg-orijen-gray/30 transition-colors"
>
  <div class="flex items-center gap-4">
    {#if logoSrc}
      <img src={logoSrc} alt={store.name} class="size-12 object-contain shrink-0" />
    {:else}
      <div class="size-12 bg-orijen-gray/20 shrink-0"></div>
    {/if}

    <div class="flex flex-col gap-0.5 min-w-0">
      <span class="font-bold leading-tight">{store.name}</span>
      <span class="text-sm text-orijen-gray"
        >{store.address}<br />{store.postcode} {store.city}</span
      >
    </div>

    <Icon name="arrow-right" class="size-5 shrink-0 ml-auto text-orijen-red" />
  </div>
  <p class="font-bold mt-2">{store.storeMessage}</p>
</a>
