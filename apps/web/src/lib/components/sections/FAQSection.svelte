<script lang="ts">
  import type { FAQBlock } from '$lib/payload'
  import RichText from '$lib/components/ui/RichText.svelte'
  import Section from '$lib/components/ui/Section.svelte'
  import Collapsible from '$lib/components/ui/Collapsible.svelte'

  type Props = { block: FAQBlock }
  let { block }: Props = $props()
</script>

<Section title={block.title} intro={block.intro ?? ''} id={block.sectionId} backgroundImage={block.backgroundImage} backgroundColor={block.backgroundColor}>
  {#each block.faq ?? [] as item (item.itemId)}
    <div id={item.itemId}>
      <Collapsible title={item.question}>
        <RichText content={item.answer} />
      </Collapsible>
    </div>
  {/each}
</Section>
