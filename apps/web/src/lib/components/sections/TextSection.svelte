<script lang="ts">
  import type { TextBlock } from '$lib/payload'
  import Section from '$lib/components/ui/Section.svelte'
  import RichText from '$lib/components/ui/RichText.svelte'

  type Props = { block: TextBlock }
  let { block }: Props = $props()
</script>

<Section
  title={block.title}
  intro={block.intro ?? undefined}
  id={block.sectionId}
  backgroundImage={block.backgroundImage}
  backgroundColor={block.backgroundColor}
>
  <RichText content={block.content} />
</Section>
