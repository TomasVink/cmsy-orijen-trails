<script lang="ts">
  import type { TrailsOverviewBlock, Trail, Locale, TrailLabelsData, TrailFilters } from '$lib/payload'
  import { getTrails } from '$lib/payload'
  import { env } from '$env/dynamic/public'
  import { page } from '$app/stores'
  import Section from '$lib/components/ui/Section.svelte'
  import HereMap from '$lib/components/ui/HereMap.svelte'
  import TrailCard from '../ui/TrailCard.svelte'
  import TrailsFilter from '../ui/TrailsFilter.svelte'

  type Props = { block: TrailsOverviewBlock }
  let { block }: Props = $props()

  const locale = $derived(($page.params.locale ?? 'nl') as Locale)
  const trailLabels = $derived($page.data.trailLabels as TrailLabelsData | null)

  // ── Filters ───────────────────────────────────────────────────────
  let filters = $state<TrailFilters>({})

  // ── Data fetching ─────────────────────────────────────────────────
  let trails = $state<Trail[]>([])

  async function load() {
    trails = await getTrails(filters, fetch, env.PUBLIC_PAYLOAD_URL, locale)
  }

  $effect(() => {
    void filters
    void locale
    load()
  })

  // ── Selection ─────────────────────────────────────────────────────
  let selectedTrail = $state<Trail | null>(null)
</script>

<Section title={block.title} intro={block.intro ?? undefined} id={block.sectionId}>
  <TrailsFilter {trailLabels} value={filters} onchange={(f) => (filters = f)} />

  <!-- Full-width map with detail card overlaid on the right -->
  <div class="relative h-125 mt-6">
    <HereMap
      {trails}
      selectedTrailId={selectedTrail?.id ?? null}
      onSelectTrail={(t) => (selectedTrail = t)}
      onDeselect={() => (selectedTrail = null)}
    />

    {#if selectedTrail}
      <div
        class="absolute top-4 right-4 bottom-4 w-80 xl:w-96 bg-black overflow-y-auto z-10 shadow-2xl"
      >
        <TrailCard trail={selectedTrail} onClose={() => (selectedTrail = null)} />
      </div>
    {/if}
  </div>
</Section>
