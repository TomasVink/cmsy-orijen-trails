<script lang="ts">
  import type { PageData } from './$types'
  import type { Trail } from '$lib/payload'
  import { page } from '$app/state'
  import TrailCard from '$lib/components/ui/TrailCard.svelte'
  import Pagination from '$lib/components/ui/Pagination.svelte'
  import TrailsFilter from '$lib/components/ui/TrailsFilter.svelte'
  import Section from '$lib/components/ui/Section.svelte'
  import HereMap from '$lib/components/ui/HereMap.svelte'

  let { data }: { data: PageData } = $props()

  const locale = $derived(page.params.locale ?? 'nl')
  const uiLabels = $derived(page.data.uiLabels)

  let selectedTrail = $state<Trail | null>(null)
  let cardHoveredId = $state<number | null>(null)
  let mapHoveredId = $state<number | null>(null)

  $effect(() => console.log(mapHoveredId))

  function buildUrl(p: number) {
    const params = new URLSearchParams(page.url.searchParams)
    params.set('page', String(p))
    return `/${locale}/trails?${params}`
  }

  function onSelectTrail(trail: Trail) {
    selectedTrail = trail
    const el = document.getElementById(`trail-card-${trail.id}`)
    if (el) {
      const rect = el.getBoundingClientRect()
      const visible = rect.top >= 0 && rect.bottom <= window.innerHeight
      if (!visible) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }
</script>

<div class="pt-24 md:pt-32"></div>

<Section title={uiLabels.trailsTitle}>
  <div class="my-6">
    <TrailsFilter trailLabels={data.trailLabels} />
  </div>
  <HereMap
    trails={data.trails}
    selectedTrailId={selectedTrail?.id ?? null}
    hoveredTrailId={cardHoveredId}
    {onSelectTrail}
    onHoverTrail={(t) => (mapHoveredId = t?.id ?? null)}
    onDeselect={() => (selectedTrail = null)}
  />
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
    {#each data.trails as trail (trail.id)}
      <div
        id="trail-card-{trail.id}"
        role="group"
        onmouseenter={() => (cardHoveredId = trail.id)}
        onmouseleave={() => (cardHoveredId = null)}
      >
        <TrailCard
          {trail}
          highlighted={mapHoveredId === trail.id || selectedTrail?.id === trail.id}
        />
      </div>
    {/each}
  </div>

  <Pagination currentPage={data.page} totalPages={data.totalPages} {buildUrl} />
</Section>
