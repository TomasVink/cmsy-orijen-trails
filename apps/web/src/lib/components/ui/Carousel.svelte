<script lang="ts" generics="T">
  import type { Snippet } from 'svelte'
  import Icon from '$lib/components/ui/Icon.svelte'
  import Button from '$lib/components/ui/Button.svelte'

  type Props = {
    items: T[]
    children: Snippet<[T]>
    ariaLabel?: string
    fadeColor?: string
  }

  let { items, children, ariaLabel = 'Carousel', fadeColor = '#000000' }: Props = $props()

  let currentIndex = $state(0)
  let containerWidth = $state(480)
  let isDragging = $state(false)
  let hasDragged = $state(false)
  let dragStartX = 0
  let dragDelta = $state(0)

  const GAP = 16
  const isMobile = $derived(containerWidth < 640)
  const visibleCards = $derived(isMobile ? 1.3 : 2.5)
  const cardWidth = $derived((containerWidth - 1.5 * GAP) / visibleCards)
  const step = $derived(cardWidth + GAP)

  const gradientWidth = $derived(containerWidth - Math.floor(visibleCards) * (cardWidth + GAP))

  const maxIndex = $derived(Math.max(0, items.length - (isMobile ? 1 : 2)))
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
    hasDragged = false
    dragStartX = e.clientX
    dragDelta = 0
  }

  function onPointerMove(e: PointerEvent) {
    if (!isDragging) return
    dragDelta = e.clientX - dragStartX
    if (!hasDragged && Math.abs(dragDelta) > 5) {
      hasDragged = true
      ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    }
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

  function onClickCapture(e: MouseEvent) {
    if (hasDragged) {
      e.preventDefault()
      e.stopPropagation()
    }
  }
</script>

<div class="relative w-full select-none" bind:clientWidth={containerWidth}>
  <div
    class="overflow-hidden cursor-grab active:cursor-grabbing"
    role="region"
    aria-label={ariaLabel}
    onpointerdown={onPointerDown}
    onpointermove={onPointerMove}
    onpointerup={onPointerUp}
    onpointercancel={onPointerUp}
    onclickcapture={onClickCapture}
  >
    <div
      class="flex"
      style="gap: {GAP}px; transform: translateX({translateX}px); transition: {isDragging
        ? 'none'
        : 'transform 0.35s ease'};"
    >
      {#each items as item}
        <div class="shrink-0" style="width: {cardWidth}px;">
          {@render children(item)}
        </div>
      {/each}
    </div>
  </div>

  <div
    class="absolute inset-y-0 right-0 pointer-events-none"
    style="width: {gradientWidth}px; background: linear-gradient(to right, transparent, {fadeColor} 80%);"
  ></div>

  {#if canGoNext}
    <Button
      onclick={goNext}
      class="absolute right-3 top-1/2 -translate-y-1/2 z-10 !px-2 !py-2 hover:-translate-y-1/2 border border-orijen-red"
    >
      <Icon name="chevron-right" />
    </Button>
  {/if}

  {#if canGoPrev}
    <Button
      onclick={goPrev}
      class="absolute left-0 top-1/2 -translate-y-1/2 z-10 !px-2 !py-2 hover:-translate-y-1/2"
    >
      <Icon name="chevron-left" />
    </Button>
  {/if}
</div>
