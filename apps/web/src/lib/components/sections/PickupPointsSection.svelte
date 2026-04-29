<script lang="ts">
  import type { PickupPointsBlock, Trail, Store } from '$lib/payload'
  import Section from '$lib/components/ui/Section.svelte'
  import StoreCard from '$lib/components/ui/StoreCard.svelte'
  import Collapsible from '$lib/components/ui/Collapsible.svelte'

  type Props = { block: PickupPointsBlock; trails: Trail[] }
  let { block, trails }: Props = $props()

  const trailsWithStores = $derived(
    trails.filter((trail) => (trail.related?.stores ?? []).some((s) => typeof s === 'object'))
  )

  function getStores(trail: Trail): Store[] {
    return (trail.related?.stores ?? []).filter((s): s is Store => typeof s === 'object')
  }
</script>

<Section
  title={block.title}
  intro={block.intro ?? ''}
  id={block.sectionId}
  backgroundImage={block.backgroundImage}
  backgroundColor={block.backgroundColor}
>
  <div class="flex flex-col gap-2">
    {#each trailsWithStores as trail (trail.id)}
      <Collapsible title={trail.title} class="text-2xl font-bold" defaultCollapsed={false}>
        <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {#each getStores(trail) as store (store.id)}
            <StoreCard {store} showCTA={false} />
          {/each}
        </div>
      </Collapsible>
    {/each}
  </div>
</Section>
