<script lang="ts">
  import type { TrailsOverviewBlock, Trail, Locale, TrailLabelsData } from "$lib/payload";
  import { getTrails } from "$lib/payload";
  import { env } from "$env/dynamic/public";
  import { page } from "$app/stores";
  import Section from "$lib/components/ui/Section.svelte";
  import HereMap from "$lib/components/ui/HereMap.svelte";
  import TrailCard from "../ui/TrailCard.svelte";

  type Props = { block: TrailsOverviewBlock };
  let { block }: Props = $props();

  const locale = $derived(($page.params.locale ?? "nl") as Locale);
  const trailLabels = $derived($page.data.trailLabels as TrailLabelsData | null);

  // ── Filters ──────────────────────────────────────────────────────
  let filterDifficulty = $state<Trail["difficulty"] | "">("");

  // ── Data fetching ─────────────────────────────────────────────────
  let trails = $state<Trail[]>([]);

  async function load() {
    trails = await getTrails(
      { difficulty: filterDifficulty || undefined },
      fetch,
      env.PUBLIC_PAYLOAD_URL,
      locale,
    );
  }

  $effect(() => {
    void filterDifficulty;
    void locale;
    load();
  });

  const difficultyOptions = $derived<{ label: string; value: Trail["difficulty"] | "" }[]>([
    { label: trailLabels?.allDifficulties ?? "All difficulties", value: "" },
    { label: trailLabels?.difficulty?.easy ?? "Easy", value: "easy" },
    { label: trailLabels?.difficulty?.moderate ?? "Moderate", value: "moderate" },
    { label: trailLabels?.difficulty?.challenging ?? "Challenging", value: "challenging" },
  ]);

  // ── Selection ─────────────────────────────────────────────────────
  let selectedTrail = $state<Trail | null>(null);
</script>

<Section
  title={block.title}
  intro={block.intro ?? undefined}
  id={block.sectionId}
>
  <!-- Filters -->
  <div class="flex flex-wrap gap-3 mb-8">
    {#each difficultyOptions as opt}
      <button
        onclick={() => (filterDifficulty = opt.value)}
        class="px-4 py-2 cursor-pointer text-sm font-sans font-bold uppercase tracking-widest border-2 transition-colors
          {filterDifficulty === opt.value
          ? 'bg-orijen-red border-orijen-red text-white'
          : 'border-orijen-gray/40 text-orijen-gray hover:border-orijen-red hover:text-orijen-red'}"
      >
        {opt.label}
      </button>
    {/each}
  </div>

  <!-- Full-width map with detail card overlaid on the right -->
  <div class="relative h-125">
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
        <TrailCard
          trail={selectedTrail}
          onClose={() => (selectedTrail = null)}
        />
      </div>
    {/if}
  </div>
</Section>
