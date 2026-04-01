<script lang="ts">
  import type { HeroBlock, Media } from "$lib/payload";
  import { mediaUrl } from "$lib/payload";
  import Button from "$lib/components/ui/Button.svelte";
  import { env } from "$env/dynamic/public";

  type Props = { block: HeroBlock };
  let { block }: Props = $props();

  const video = $derived(
    typeof block.video === "object" ? (block.video as Media) : null,
  );
  const videoSrc = $derived(mediaUrl(video, env.PUBLIC_PAYLOAD_URL));
</script>

<div
  class="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
>
  <!-- Background video -->
  {#if videoSrc}
    <video
      class="absolute inset-0 w-full h-full object-cover opacity-50"
      src={videoSrc}
      autoplay
      muted
      loop
      playsinline
    ></video>
  {/if}

  <!-- Overlay gradient -->
  <div
    class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"
  ></div>

  <!-- Content -->
  <div class="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
    <h1
      class="font-display text-6xl md:text-8xl lg:text-9xl uppercase leading-none tracking-tight mb-6"
    >
      {block.headline}
    </h1>

    {#if block.subheadline}
      <p
        class="font-display text-5xl text-orijen-gold max-w-xl mx-auto mb-10 uppercase tracking-widest"
      >
        {block.subheadline}
      </p>
    {/if}

    {#if block.cta?.length}
      <div class="flex flex-wrap gap-4 justify-center">
        {#each block.cta as cta (cta.id)}
          {#if cta.ctaUrl && cta.ctaLabel}
            <Button
              href={cta.ctaUrl}
              variant={cta.outline ? "outline" : "primary"}
            >
              {cta.ctaLabel}
            </Button>
          {/if}
        {/each}
      </div>
    {/if}
  </div>

  <!-- Scroll indicator -->
  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
    <svg
      class="w-12 h-12 text-white/90"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </div>
</div>
