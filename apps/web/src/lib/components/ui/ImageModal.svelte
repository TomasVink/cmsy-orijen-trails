<script lang="ts">
  type ImageItem = { src: string; alt?: string }

  type Props = {
    images: ImageItem[]
    open?: boolean
    index?: number
  }

  let { images, open = $bindable(false), index = $bindable(0) }: Props = $props()

  function close() {
    open = false
  }

  function prev() {
    index = (index - 1 + images.length) % images.length
  }

  function next() {
    index = (index + 1) % images.length
  }

  function onkeydown(e: KeyboardEvent) {
    if (!open) return
    if (e.key === 'Escape') close()
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
  }

  const current = $derived(images[index])
  const hasMultiple = $derived(images.length > 1)
</script>

<svelte:window {onkeydown} />

{#if open && current}
  <!-- Overlay -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/85"
    onclick={(e) => {
      if (e.target === e.currentTarget) close()
    }}
    onkeydown={(e) => {
      if (e.key === 'Escape') close()
    }}
    role="dialog"
    tabindex="-1"
    aria-modal="true"
    aria-label="Image viewer"
  >
    <div class="relative flex items-center gap-4 max-w-[90vw] max-h-[90vh]">
      <!-- Prev button -->
      {#if hasMultiple}
        <button
          class="flex-none text-white/70 hover:text-white transition-colors p-2 cursor-pointer"
          onclick={prev}
          aria-label="Previous image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      {/if}

      <!-- Image -->
      <div class="relative">
        {#if hasMultiple}
          <button onclick={next} aria-label="Next image" class="block cursor-pointer">
            <img
              src={current.src}
              alt={current.alt ?? ''}
              class="max-w-[80vw] max-h-[85vh] object-contain rounded-sm shadow-2xl"
            />
          </button>
        {:else}
          <img
            src={current.src}
            alt={current.alt ?? ''}
            class="max-w-[80vw] max-h-[85vh] object-contain rounded-sm shadow-2xl"
          />
        {/if}

        <!-- Close button -->
        <button
          class="absolute top-2 right-2 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 rounded-full p-1 transition-colors"
          onclick={close}
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <!-- Counter -->
        {#if hasMultiple}
          <div
            class="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/80 text-sm bg-black/40 px-3 py-1 rounded-full"
          >
            {index + 1} / {images.length}
          </div>
        {/if}
      </div>

      <!-- Next button -->
      {#if hasMultiple}
        <button
          class="flex-none text-white/70 hover:text-white transition-colors p-2 cursor-pointer"
          onclick={next}
          aria-label="Next image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      {/if}
    </div>
  </div>
{/if}
