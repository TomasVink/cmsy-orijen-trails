<script lang="ts">
  import type { PromoBannerBlock, Media } from '$lib/payload'
  import { mediaUrl } from '$lib/payload'

  type Props = { block: PromoBannerBlock }
  let { block }: Props = $props()

  const bgImage = $derived(
    typeof block.backgroundImage === 'object' ? (block.backgroundImage as Media) : null
  )
  const bgSrc = $derived(mediaUrl(bgImage, 'hero'))

  const logos = $derived(
    (block.logos ?? []).map((l) => ({
      src: mediaUrl(typeof l.logo === 'object' ? (l.logo as Media) : null),
      alt: l.alt ?? ''
    }))
  )

  // true = dark bg → white text; false = light bg → black text
  // Default true to match the black fallback background
  let isDark = $state(true)

  function onBgLoad(e: Event) {
    const img = e.currentTarget as HTMLImageElement
    try {
      const canvas = document.createElement('canvas')
      const size = 50
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.drawImage(img, 0, 0, size, size)
      const { data } = ctx.getImageData(0, 0, size, size)
      let total = 0
      for (let i = 0; i < data.length; i += 4) {
        total += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
      }
      isDark = total / (data.length / 4) < 128
    } catch {
      // CORS-tainted canvas — keep default
    }
  }
</script>

<div class="relative w-full overflow-hidden bg-orijen-black mt-16 md:mt-20 min-h-100 md:min-h-180">
  <!-- Background image -->
  {#if bgSrc}
    <img
      src={bgSrc}
      alt=""
      aria-hidden="true"
      crossorigin="anonymous"
      onload={onBgLoad}
      class="absolute inset-0 w-full h-full object-cover object-center"
    />
  {/if}

  <!-- Content -->
  <div
    class="relative z-10 w-full max-w-6xl mx-auto px-4 py-20 flex flex-col justify-between"
    style="min-height: inherit"
  >
    <!-- Logos row -->
    {#if logos.length}
      <div class="flex items-center gap-4 flex-wrap mb-6">
        {#each logos as logo, i}
          {#if logo.src}
            {#if i > 0}
              <span class={`w-px h-12 ${isDark ? 'bg-white/80' : 'bg-orijen-black/80'}`}></span>
            {/if}
            <img src={logo.src} alt={logo.alt} class="h-10 md:h-16 object-contain" />
          {/if}
        {/each}
      </div>
    {/if}

    <!-- Title + subtitle -->
    <div
      class={`flex-1 flex flex-col justify-center gap-2 mb-6 ${isDark ? 'text-white/90' : 'text-orijen-black/90'}`}
    >
      <h2 class="text-7xl lg:text-8xl uppercase">
        {block.title}
      </h2>
      {#if block.subtitle}
        <p class="text-lg md:text-xl font-sans">
          {@html block.subtitle}
        </p>
      {/if}
    </div>

    <!-- Badge -->
    {#if block.badge?.primaryText}
      <div class="inline-flex items-stretch self-start">
        <!-- Gift icon — blue, all four corners rounded, sits on top -->
        <span
          class="relative z-10 bg-orijen-blue rounded-lg flex items-center justify-center px-6 py-2 text-white shrink-0"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-7 h-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M20 12v10H4V12M22 7H2v5h20V7zM12 22V7M12 7a3 3 0 000-6 3 3 0 000 6zM12 7a3 3 0 000-6 3 3 0 000 6z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"
            />
          </svg>
        </span>
        <!-- Text — cream, slightly transparent, tucked behind the blue box on the left -->
        <div
          class="flex flex-col leading-tight -ml-3 pl-8 pr-3 py-2 rounded-r-lg bg-orijen-cream/80 text-orijen-black"
        >
          <span class="font-bold text-sm md:text-base">{block.badge.primaryText}</span>
          {#if block.badge.secondaryText}
            <span class="text-xs md:text-sm opacity-70">{block.badge.secondaryText}</span>
          {/if}
        </div>
      </div>
    {/if}
  </div>
</div>
<hr class="divider" />
