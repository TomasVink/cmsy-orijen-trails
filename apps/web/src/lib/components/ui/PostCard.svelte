<script lang="ts">
  import type { Post, Media, UiLabelsData } from '$lib/payload'
  import { page } from '$app/state'
  import Icon from './Icon.svelte'

  type Props = { post: Post }
  let { post }: Props = $props()

  const locale = $derived(page.params.locale ?? 'nl')
  const uiLabels = $derived(page.data.uiLabels as UiLabelsData | null)
  const header = $derived(typeof post.header === 'object' && post.header ? (post.header as Media) : null)
</script>

<a
  href="/{locale}/blog/{post.slug}"
  class="flex flex-col bg-orijen-gray/20 border border-orijen-gray/30 hover:border-orijen-red hover:bg-orijen-gray/30 transition-colors"
>
  {#if header?.url}
    <div class="aspect-video overflow-hidden">
      <img src={header.url} alt={header.alt ?? post.title} class="w-full h-full object-cover" />
    </div>
  {:else}
    <div class="aspect-video bg-orijen-gray/10"></div>
  {/if}

  <div class="p-4 flex flex-col gap-2">
    <h3 class="font-display text-2xl uppercase leading-none">{post.title}</h3>
    {#if post.excerpt}
      <p class="text-sm text-orijen-gray">{post.excerpt}</p>
    {/if}
    <span class="text-sm text-orijen-red flex items-center gap-1 mt-auto pt-2">
      {uiLabels?.continueReading ?? 'Continue reading'}
      <Icon name="arrow-right" class="size-4" />
    </span>
  </div>
</a>
