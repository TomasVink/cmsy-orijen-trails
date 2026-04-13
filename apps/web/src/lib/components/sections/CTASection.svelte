<script lang="ts">
  import { page } from '$app/state'
  import type { CTABlock, Media } from '$lib/payload'
  import { mediaUrl } from '$lib/payload'
  import { env } from '$env/dynamic/public'
  import Button from '$lib/components/ui/Button.svelte'

  type Props = { block: CTABlock }
  let { block }: Props = $props()

  const image = $derived(typeof block.image === 'object' ? (block.image as Media) : null)
  const imageSrc = $derived(mediaUrl(image, env.PUBLIC_PAYLOAD_URL))
</script>

<section class="py-16 px-4">
  <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    <div class="overflow-hidden">
      {#if imageSrc}
        <img src={imageSrc} alt={image?.alt ?? ''} class="w-full h-full object-cover" />
      {/if}
    </div>
    <div class="flex flex-col items-center justify-center gap-6">
      <p>{block.description}</p>
      <Button href={block.url}>{block.cta}</Button>
    </div>
  </div>
</section>
<hr class="divider" />
