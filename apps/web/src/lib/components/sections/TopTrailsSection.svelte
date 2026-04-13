<script lang="ts">
  import type { TopTrailsBlock, Trail, TrailLabelsData } from '$lib/payload'
  import Section from '$lib/components/ui/Section.svelte'
  import TrailCard from '$lib/components/ui/TrailCard.svelte'
  import Icon from '$lib/components/ui/Icon.svelte'
  import Button from '$lib/components/ui/Button.svelte'
  import { page } from '$app/state'

  type Props = { block: TopTrailsBlock; trails: Trail[] }
  let { block, trails }: Props = $props()

  const trailLabels = $derived(page.data.trailLabels as TrailLabelsData | null)
  const locale = $derived(page.params.locale ?? 'nl')

  let currentIndex = $state(0)
  let containerWidth = $state(0)
  let isDragging = $state(false)
  let dragStartX = 0
  let dragDelta = $state(0)

  const GAP = 16
  const cardWidth = $derived((containerWidth - 1.5 * GAP) / 2.5)
  const step = $derived(cardWidth + GAP)

  const maxIndex = $derived(Math.max(0, trails.length - 2))
  const canGoNext = $derived(currentIndex < maxIndex)
  const canGoPrev = $derived(currentIndex > 0)

  const translateX = $derived(-(currentIndex * step) + (isDragging ? dragDelta : 0))

  function goNext() {
    if (canGoNext) currentIndex = Math.min(currentIndex + 1, maxIndex)
  }

  function goPrev() {
    if (canGoPrev) currentIndex = Math.max(currentIndex - 1, 0)
  }

  function onPointerDown(e: PointerEvent) {
    isDragging = true
    dragStartX = e.clientX
    dragDelta = 0
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }

  function onPointerMove(e: PointerEvent) {
    if (!isDragging) return
    dragDelta = e.clientX - dragStartX
  }

  function onPointerUp() {
    if (!isDragging) return
    isDragging = false
    const threshold = step * 0.25
    if (dragDelta < -threshold && canGoNext) {
      currentIndex = Math.min(currentIndex + 1, maxIndex)
    } else if (dragDelta > threshold && canGoPrev) {
      currentIndex = Math.max(currentIndex - 1, 0)
    }
    dragDelta = 0
  }
</script>

<Section title={block.title} intro={block.intro ?? undefined} id={block.sectionId}>
  <div class="relative w-full select-none" bind:clientWidth={containerWidth}>
    <!-- Carousel track -->
    <div
      class="overflow-hidden cursor-grab active:cursor-grabbing"
      role="region"
      aria-label="Trail carousel"
      onpointerdown={onPointerDown}
      onpointermove={onPointerMove}
      onpointerup={onPointerUp}
      onpointercancel={onPointerUp}
    >
      <div
        class="flex"
        style="gap: {GAP}px; transform: translateX({translateX}px); transition: {isDragging
          ? 'none'
          : 'transform 0.35s ease'};"
      >
        {#each trails as trail (trail.id)}
          <div class="shrink-0" style="width: {cardWidth}px;">
            <TrailCard {trail} />
          </div>
        {/each}
      </div>
    </div>

    <!-- Right fade gradient (always visible, covers the half-card) -->
    <div
      class="absolute inset-y-0 right-0 pointer-events-none"
      style="width: {cardWidth *
        0.6}px; background: linear-gradient(to right, transparent, #000000 80%);"
    ></div>

    <!-- Chevron next -->
    {#if canGoNext}
      <Button
        onclick={goNext}
        class="absolute right-3 top-1/2 -translate-y-1/2 z-10 !px-2 !py-2 hover:-translate-y-1/2 border border-orijen-red"
      >
        <Icon name="chevron-right" />
      </Button>
    {/if}

    <!-- Chevron prev -->
    {#if canGoPrev}
      <Button
        onclick={goPrev}
        class="absolute left-0 top-1/2 -translate-y-1/2 z-10 !px-2 !py-2 hover:-translate-y-1/2"
      >
        <Icon name="chevron-left" />
      </Button>
    {/if}
  </div>

  <div class="mt-8 text-center">
    <Button href="/{locale}/trails" variant="outline">
      {trailLabels?.viewAllTrails ?? 'View all trails'} <Icon name="arrow-right" />
    </Button>
  </div>
</Section>
