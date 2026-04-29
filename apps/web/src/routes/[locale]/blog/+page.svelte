<script lang="ts">
  import type { PageData } from './$types'
  import { page } from '$app/state'
  import Pagination from '$lib/components/ui/Pagination.svelte'
  import PostCard from '$lib/components/ui/PostCard.svelte'
  import Section from '$lib/components/ui/Section.svelte'

  let { data }: { data: PageData } = $props()

  const locale = $derived(page.params.locale ?? 'nl')
  const uiLabels = $derived(page.data.uiLabels)

  function buildUrl(p: number) {
    return `/${locale}/blog?page=${p}`
  }
</script>

<div class="pt-24 md:pt-32"></div>

<Section title={uiLabels.blogTitle}>
  {#each data.posts as post (post.id)}
    <PostCard {post} />
  {/each}

  <Pagination currentPage={data.page} totalPages={data.totalPages} {buildUrl} />
</Section>
