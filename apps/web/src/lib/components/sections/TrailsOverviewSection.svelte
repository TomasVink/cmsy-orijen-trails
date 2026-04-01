<script lang="ts">
  import type { TrailsOverviewBlock, Trail } from '$lib/payload'
  import { getTrails } from '$lib/payload'
  import Section from '$lib/components/ui/Section.svelte'
  import TrailCard from '$lib/components/ui/TrailCard.svelte'

  type Props = { block: TrailsOverviewBlock }
  let { block }: Props = $props()

  // ── Filters ──────────────────────────────────────────────────────
  let filterDifficulty = $state<Trail['difficulty'] | ''>('')

  // ── Data fetching ─────────────────────────────────────────────────
  let trails = $state<Trail[]>([])
  let loading = $state(true)

  async function load() {
    loading = true
    trails = await getTrails({
      difficulty: filterDifficulty || undefined,
    })
    loading = false
  }

  $effect(() => {
    // Re-fetch whenever a filter changes. filterDifficulty is read here to
    // register the dependency.
    void filterDifficulty
    load()
  })

  const difficultyOptions: { label: string; value: Trail['difficulty'] | '' }[] = [
    { label: 'All difficulties', value: '' },
    { label: 'Easy', value: 'easy' },
    { label: 'Moderate', value: 'moderate' },
    { label: 'Challenging', value: 'challenging' },
  ]
</script>

<Section id="trails" class="py-20 bg-orijen-cream">
  <div class="mb-10">
    <h2 class="font-display text-5xl md:text-6xl uppercase leading-none">{block.title}</h2>
    {#if block.intro}
      <p class="font-sans text-orijen-gray mt-3 max-w-xl">{block.intro}</p>
    {/if}
  </div>

  <!-- Filters -->
  <div class="flex flex-wrap gap-3 mb-8">
    {#each difficultyOptions as opt}
      <button
        onclick={() => (filterDifficulty = opt.value)}
        class="px-4 py-2 text-sm font-sans font-bold uppercase tracking-widest border-2 transition-colors
          {filterDifficulty === opt.value
            ? 'bg-orijen-red border-orijen-red text-white'
            : 'border-orijen-gray/40 text-orijen-gray hover:border-orijen-red hover:text-orijen-red'}"
      >
        {opt.label}
      </button>
    {/each}
  </div>

  <!-- Trail grid -->
  {#if loading}
    <div class="flex justify-center py-20">
      <span class="text-orijen-gray font-sans text-sm uppercase tracking-widest animate-pulse">Loading trails…</span>
    </div>
  {:else if trails.length === 0}
    <p class="text-orijen-gray font-sans">No trails found for the selected filters.</p>
  {:else}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each trails as trail (trail.id)}
        <TrailCard {trail} />
      {/each}
    </div>
  {/if}
</Section>
