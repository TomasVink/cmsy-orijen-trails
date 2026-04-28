<script lang="ts">
  import { page } from '$app/state'
  import type { CTABlock, Media } from '$lib/payload'
  import { mediaUrl } from '$lib/payload'
  import { env } from '$env/dynamic/public'
  import Button from '$lib/components/ui/Button.svelte'
  import Section from '../ui/Section.svelte'

  type Props = { block: CTABlock }
  let { block }: Props = $props()

  const image = $derived(typeof block.image === 'object' ? (block.image as Media) : null)
  const imageSrc = $derived(mediaUrl(image, env.PUBLIC_PAYLOAD_URL))

  const isExternal = $derived(block.url?.startsWith('http'))
  const locale = $derived(page.params.locale ?? 'nl')
  const href = $derived(isExternal ? block.url : `/${locale}${block.url}`)
</script>

<Section>
  <div class={imageSrc ? 'grid grid-cols-1 md:grid-cols-2 gap-8 items-center' : 'flex flex-col items-center gap-6'}>
    {#if imageSrc}
      <div class="overflow-hidden w-full">
        <img src={imageSrc} alt={image?.alt ?? ''} class="w-full h-full object-cover" />
      </div>
    {/if}
    <div class="flex flex-col items-center justify-center gap-6">
      <p>{block.description}</p>
      <Button {href} target={isExternal ? '_blank' : undefined}>{block.cta}</Button>
    </div>
  </div>
</Section>
<hr class="divider" />
