<script lang="ts">
  import type { BlogBlock, Media } from '$lib/payload'
  import { mediaUrl } from '$lib/payload'
  import Section from '$lib/components/ui/Section.svelte'
  import RichText from '$lib/components/ui/RichText.svelte'
  import { env } from '$env/dynamic/public'

  type Props = { block: BlogBlock }
  let { block }: Props = $props()

  const image = $derived(typeof block.image === 'object' ? (block.image as Media) : null)
  const imageSrc = $derived(mediaUrl(image, env.PUBLIC_PAYLOAD_URL))
</script>

<Section id="blog" class="py-20 bg-orijen-cream">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <!-- Image -->
    {#if imageSrc}
      <div class="aspect-4/3 overflow-hidden bg-orijen-gray/10">
        <img
          src={imageSrc}
          alt={image?.alt ?? block.title}
          class="w-full h-full object-cover"
        />
      </div>
    {/if}

    <!-- Text -->
    <div class="flex flex-col gap-6">
      <h2 class="font-display text-5xl md:text-6xl uppercase leading-none">{block.title}</h2>
      <RichText content={block.body} class="text-orijen-gray" />

    </div>
  </div>
</Section>
