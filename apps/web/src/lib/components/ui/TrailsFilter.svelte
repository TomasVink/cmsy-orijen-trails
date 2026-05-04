<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/state'
  import { slide } from 'svelte/transition'
  import type { TrailFilters, TrailLabelsData, UiLabelsData } from '$lib/payload'
  import FilterButton from './FilterButton.svelte'
  import Icon from './Icon.svelte'

  type Props = {
    trailLabels: TrailLabelsData | null
    // Controlled mode — if provided, skips URL params and calls onchange instead
    value?: TrailFilters
    onchange?: (filters: TrailFilters) => void
  }

  let { trailLabels, value, onchange }: Props = $props()

  const controlled = $derived(onchange !== undefined)

  const uiLabels = $derived(page.data.uiLabels as UiLabelsData | null)
  const f = $derived(uiLabels?.trailFilters)

  const searchParams = $derived(page.url.searchParams)

  // Active filters — read from prop in controlled mode, URL params otherwise
  const active = $derived<TrailFilters>(
    controlled && value
      ? value
      : {
          difficulty: (searchParams.get('difficulty') as TrailFilters['difficulty']) ?? undefined,
          offLeashArea:
            (searchParams.get('offLeashArea') as TrailFilters['offLeashArea']) ?? undefined,
          hospitality: searchParams.get('hospitality') === '1' ? true : undefined,
          water: searchParams.get('water') === '1' ? true : undefined,
          community: searchParams.get('community') === '1' ? true : undefined,
          distanceMin: searchParams.get('distanceMin')
            ? Number(searchParams.get('distanceMin'))
            : undefined,
          distanceMax: searchParams.get('distanceMax')
            ? Number(searchParams.get('distanceMax'))
            : undefined
        }
  )

  const activeCount = $derived(
    [
      active.difficulty,
      active.offLeashArea,
      active.hospitality,
      active.water,
      active.community,
      active.distanceMin !== undefined || active.distanceMax !== undefined ? true : undefined
    ].filter((v) => v !== undefined).length
  )

  function applyFilter(patch: Partial<TrailFilters>) {
    if (controlled) {
      onchange!({ ...active, ...patch })
      return
    }

    const next = new URLSearchParams(page.url.searchParams)
    next.delete('page')

    for (const [key, value] of Object.entries(patch)) {
      if (value === undefined || value === null) {
        next.delete(key)
      } else if (typeof value === 'boolean') {
        if (value) next.set(key, '1')
        else next.delete(key)
      } else {
        next.set(key, String(value))
      }
    }

    goto(`?${next}`, { replaceState: true, keepFocus: true })
  }

  function toggleDifficulty(val: TrailFilters['difficulty']) {
    applyFilter({ difficulty: active.difficulty === val ? undefined : val })
  }

  function toggleOffLeash(val: TrailFilters['offLeashArea']) {
    applyFilter({ offLeashArea: active.offLeashArea === val ? undefined : val })
  }

  function toggleBoolean(key: 'hospitality' | 'water' | 'community') {
    applyFilter({ [key]: active[key] ? undefined : true })
  }

  function toggleDistanceRange(min: number, max?: number) {
    const isActive = active.distanceMin === min && active.distanceMax === max
    applyFilter({
      distanceMin: isActive ? undefined : min,
      distanceMax: isActive ? undefined : max
    })
  }

  function clearAll() {
    if (controlled) {
      onchange!({})
      return
    }
    const next = new URLSearchParams(page.url.searchParams)
    ;[
      'difficulty',
      'offLeashArea',
      'hospitality',
      'water',
      'community',
      'distanceMin',
      'distanceMax',
      'page'
    ].forEach((k) => next.delete(k))
    goto(`?${next}`, { replaceState: true, keepFocus: true })
  }

  const difficultyOptions = $derived([
    { value: 'easy' as const, label: trailLabels?.difficulty?.easy ?? 'Easy' },
    { value: 'moderate' as const, label: trailLabels?.difficulty?.moderate ?? 'Moderate' },
    { value: 'challenging' as const, label: trailLabels?.difficulty?.challenging ?? 'Challenging' }
  ])

  const offLeashOptions = $derived([
    { value: 'fully' as const, label: trailLabels?.offLeash?.fully ?? 'Fully' },
    { value: 'partial' as const, label: trailLabels?.offLeash?.partial ?? 'Partial' },
    { value: 'none' as const, label: trailLabels?.offLeash?.none ?? 'None' }
  ])

  const distanceRanges = $derived([
    { label: f?.distanceRange0to5 ?? '0-5 km', min: 0, max: 5 },
    { label: f?.distanceRange5to10 ?? '5-10 km', min: 5, max: 10 },
    { label: f?.distanceRange10to15 ?? '10-15 km', min: 10, max: 15 },
    { label: f?.distanceRange15plus ?? '15+ km', min: 15, max: undefined }
  ])

  // ── Collapse ──────────────────────────────────────────────────────
  let open = $state(false)
</script>

<div class="border border-orijen-red bg-[#222] px-4 py-2">
  <!-- Toggle bar -->
  <button
    onclick={() => (open = !open)}
    class="flex items-center gap-2 py-2 text-sm font-bold uppercase tracking-widest text-orijen-cream hover:text-orijen-red transition-colors cursor-pointer w-full"
  >
    <span>Filters</span>
    {#if activeCount > 0}
      <span class="bg-orijen-red text-white text-[10px] font-bold px-1.5 py-0.5 leading-none">
        {activeCount}
      </span>
    {/if}
    <Icon
      name="chevron-down"
      class="size-5 transition-transform duration-200 {open ? 'rotate-180' : ''}"
    />
  </button>

  <!-- Collapsible filter row -->
  {#if open}
    <div transition:slide={{ duration: 200 }} class="my-2 border-t border-white pt-4">
      <div class="flex flex-wrap gap-6 items-end">
        <!-- Difficulty -->
        <div>
          <p class="text-xs font-bold uppercase tracking-widest text-orijen-gray mb-2">
            {f?.difficulty ?? 'Difficulty'}
          </p>
          <div class="flex flex-wrap gap-1">
            {#each difficultyOptions as opt}
              <FilterButton
                active={active.difficulty === opt.value}
                onclick={() => toggleDifficulty(opt.value)}>{opt.label}</FilterButton
              >
            {/each}
          </div>
        </div>

        <!-- Off-leash -->
        <div>
          <p class="text-xs font-bold uppercase tracking-widest text-orijen-gray mb-2">
            {f?.offLeash ?? 'Off-leash'}
          </p>
          <div class="flex flex-wrap gap-1">
            {#each offLeashOptions as opt}
              <FilterButton
                active={active.offLeashArea === opt.value}
                onclick={() => toggleOffLeash(opt.value)}>{opt.label}</FilterButton
              >
            {/each}
          </div>
        </div>

        <!-- Distance -->
        <div>
          <p class="text-xs font-bold uppercase tracking-widest text-orijen-gray mb-2">
            {f?.distance ?? 'Distance'}
          </p>
          <div class="flex flex-wrap gap-1">
            {#each distanceRanges as range}
              <FilterButton
                active={active.distanceMin === range.min && active.distanceMax === range.max}
                onclick={() => toggleDistanceRange(range.min, range.max)}
                >{range.label}</FilterButton
              >
            {/each}
          </div>
        </div>

        <!-- Features -->
        <div>
          <p class="text-xs font-bold uppercase tracking-widest text-orijen-gray mb-2">
            {f?.features ?? 'Features'}
          </p>
          <div class="flex flex-wrap gap-1">
            <FilterButton
              active={!!active.hospitality}
              onclick={() => toggleBoolean('hospitality')}
            >
              {trailLabels?.hospitality ?? 'Hospitality'}
            </FilterButton>
            <FilterButton active={!!active.water} onclick={() => toggleBoolean('water')}>
              {trailLabels?.water ?? 'Water'}
            </FilterButton>
            <FilterButton active={!!active.community} onclick={() => toggleBoolean('community')}>
              {f?.community ?? 'Community'}
            </FilterButton>
          </div>
        </div>

        <!-- Clear -->
        {#if activeCount > 0}
          <button
            onclick={clearAll}
            class="px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-orijen-red hover:underline self-end cursor-pointer"
          >
            {f?.clear ?? 'Clear filters'} ({activeCount})
          </button>
        {/if}
      </div>
    </div>
  {/if}
</div>
