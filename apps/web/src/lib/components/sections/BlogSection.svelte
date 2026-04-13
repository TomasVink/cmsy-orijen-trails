<script lang="ts">
  import type { BlogBlock, Post, UiLabelsData } from '$lib/payload'
  import Section from '$lib/components/ui/Section.svelte'
  import Icon from '../ui/Icon.svelte'
  import { page } from '$app/state'

  type Props = { block: BlogBlock; posts: Post[] }
  let { block, posts }: Props = $props()

  const locale = $derived(page.params.locale ?? 'nl')
  const uiLabels = $derived(page.data.uiLabels as UiLabelsData | null)
</script>

<Section title={block.title} intro={block.intro ?? undefined} id={block.sectionId}>
  {#each posts as post}
    <a
      href="/{locale}/blog/{post.slug}"
      class="bg-orijen-gray/20 border border-orijen-gray/30 hover:border-orijen-red hover:bg-orijen-gray/30 grid grid-cols-3 p-8 gap-8"
    >
      {#if typeof post.header === 'object' && post.header?.url}
        <img src={post.header.url} alt={post.header.alt} class="w-full h-full object-cover" />
      {:else}
        <div class="bg-orijen-gray/40"></div>
      {/if}
      <div class="col-span-2 flex flex-col gap-2">
        <h3 class="text-3xl">{post.title}</h3>
        {#if post.excerpt}
          <p class="text-orijen-gray">{post.excerpt}</p>
        {/if}
        <span class="text-sm text-orijen-red hover:underline mt-auto self-end flex align-middle"
          >{uiLabels?.continueReading ?? 'Continue reading'}
          <Icon name="arrow-right" class="size-6" /></span
        >
      </div>
    </a>
  {/each}
</Section>
