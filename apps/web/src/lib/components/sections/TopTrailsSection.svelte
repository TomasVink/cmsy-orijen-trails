<script lang="ts">
  import type { TopTrailsBlock, Trail } from "$lib/payload";
  import Section from "$lib/components/ui/Section.svelte";
  import TrailCard from "$lib/components/ui/TrailCard.svelte";

  type Props = { block: TopTrailsBlock };
  let { block }: Props = $props();

  // Payload populates relations at depth ≥ 1; filter out any un-populated IDs
  const trails = $derived(
    (block.trails ?? []).filter(
      (t): t is Trail => typeof t === "object" && t.featured === true,
    ),
  );
</script>

<Section
  title={block.title}
  intro={block.intro ?? undefined}
  id={block.sectionId}
>
  <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
    {#each trails.slice(0, 5) as trail (trail.id)}
      <TrailCard {trail} />
    {/each}
  </div>
</Section>
