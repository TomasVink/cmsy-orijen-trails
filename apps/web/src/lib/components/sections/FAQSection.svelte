<script lang="ts">
  import type { FAQBlock } from '$lib/payload'
  import RichText from '$lib/components/ui/RichText.svelte'
  import Icon from '$lib/components/ui/Icon.svelte'
  import Section from '$lib/components/ui/Section.svelte'
  import { tick } from 'svelte'

  type Props = { block: FAQBlock }
  let { block }: Props = $props()

  let openId = $state<string | null>(null)

  function toggle(id: string) {
    openId = openId === id ? null : id
  }
</script>

<Section title={block.title} intro={block.intro ?? ''} id={block.sectionId}>
  {#each block.faq ?? [] as item (item.itemId)}
    <div id={item.itemId}>
      <button
        type="button"
        onclick={() => toggle(item.itemId)}
        class="w-full flex items-center justify-between gap-4 py-4 px-6 text-left bg-orijen-gray/10 hover:bg-orijen-gray/20 transition-colors cursor-pointer"
        aria-expanded={openId === item.itemId}
      >
        <span class="text-lg font-medium">{item.question}</span>
        <Icon
          name="chevron-down"
          class="size-6 shrink-0 transition-transform duration-200 {openId === item.itemId
            ? 'rotate-180'
            : ''}"
        />
      </button>
      {#if openId === item.itemId}
        <div class="px-6 py-4">
          <RichText content={item.answer} />
        </div>
      {/if}
    </div>
  {/each}
</Section>
