<script lang="ts">
  import type { PageData } from './$types'
  import { page } from '$app/state'
  import Pagination from '$lib/components/ui/Pagination.svelte'
  import PageHeader from '$lib/components/ui/PageHeader.svelte'
  import PostCard from '$lib/components/ui/PostCard.svelte'

  let { data }: { data: PageData } = $props()

  const locale = $derived(page.params.locale ?? 'nl')
  const uiLabels = $derived(page.data.uiLabels)

  function buildUrl(p: number) {
    return `/${locale}/blog?page=${p}`
  }
</script>

<PageHeader title={uiLabels.blogTitle} />

<section class="py-8 px-4">
  <div class="max-w-6xl mx-auto">
    {#each data.posts as post (post.id)}
      <PostCard {post} />
    {/each}

    <Pagination currentPage={data.page} totalPages={data.totalPages} {buildUrl} />
  </div>
</section>
