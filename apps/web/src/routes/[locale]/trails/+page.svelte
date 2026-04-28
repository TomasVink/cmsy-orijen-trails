<script lang="ts">
  import type { PageData } from './$types'
  import { page } from '$app/state'
  import TrailCard from '$lib/components/ui/TrailCard.svelte'
  import Pagination from '$lib/components/ui/Pagination.svelte'
  import PageHeader from '$lib/components/ui/PageHeader.svelte'
  import TrailsFilter from '$lib/components/ui/TrailsFilter.svelte'

  let { data }: { data: PageData } = $props()

  const locale = $derived(page.params.locale ?? 'nl')
  const uiLabels = $derived(page.data.uiLabels)

  function buildUrl(p: number) {
    const params = new URLSearchParams(page.url.searchParams)
    params.set('page', String(p))
    return `/${locale}/trails?${params}`
  }
</script>

<PageHeader title={uiLabels.trailsTitle} />

<section class="py-8 px-4">
  <div class="max-w-6xl mx-auto">
    <TrailsFilter trailLabels={data.trailLabels} />
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {#each data.trails as trail (trail.id)}
        <TrailCard {trail} />
      {/each}
    </div>

    <Pagination currentPage={data.page} totalPages={data.totalPages} {buildUrl} />
  </div>
</section>
