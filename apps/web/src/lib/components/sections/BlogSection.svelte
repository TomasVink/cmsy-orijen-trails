<script lang="ts">
  import type { BlogBlock, Post, UiLabelsData } from '$lib/payload'
  import Section from '$lib/components/ui/Section.svelte'
  import Icon from '../ui/Icon.svelte'
  import { page } from '$app/state'
  import Button from '../ui/Button.svelte'
  import PostCard from '../ui/PostCard.svelte'

  type Props = { block: BlogBlock; posts: Post[] }
  let { block, posts }: Props = $props()

  const locale = $derived(page.params.locale ?? 'nl')
</script>

<Section
  title={block.title}
  intro={block.intro ?? undefined}
  id={block.sectionId}
  backgroundImage={block.backgroundImage}
  backgroundColor={block.backgroundColor}
>
  {#each posts as post}
    <PostCard {post} />
  {/each}

  <div class="mt-8 text-center">
    <Button href="/{locale}/blog" variant="outline">
      {block.viewAllLabel}
      <Icon name="arrow-right" />
    </Button>
  </div>
</Section>
