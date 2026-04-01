<script lang="ts">
  import type { Trail, Media } from "$lib/payload";
  import { mediaUrl } from "$lib/payload";
  import { env } from "$env/dynamic/public";

  type Props = {
    trail: Trail;
    onClose: () => void;
  };

  let { trail, onClose }: Props = $props();

  const image = $derived(
    typeof trail.header === "object" ? (trail.header as Media) : null,
  );
  const imageSrc = $derived(mediaUrl(image, env.PUBLIC_PAYLOAD_URL));

  const difficultyLabel: Record<string, string> = {
    easy: "Easy",
    moderate: "Moderate",
    challenging: "Challenging",
  };
</script>

<div class="flex flex-col h-full overflow-y-auto">
  <button
    onclick={onClose}
    class="flex justify-end
    text-lg font-sans font-black cursor-pointer text-black hover:text-orijen-red transition-colors mb-5"
  >
    ╳
  </button>

  <!-- Image -->
  <div
    class="relative aspect-video bg-orijen-gray/10 overflow-hidden mb-5 shrink-0"
  >
    {#if imageSrc}
      <img
        src={imageSrc}
        alt={image?.alt ?? trail.title}
        class="w-full h-full object-cover"
      />
    {:else}
      <div class="w-full h-full flex items-center justify-center">
        <span class="text-orijen-gray text-xs uppercase tracking-widest"
          >No image</span
        >
      </div>
    {/if}

    {#if trail.difficulty}
      <span
        class="absolute top-3 left-3 bg-orijen-red text-white text-xs font-bold uppercase tracking-widest px-2 py-1"
      >
        {difficultyLabel[trail.difficulty] ?? trail.difficulty}
      </span>
    {/if}
  </div>

  <!-- Content -->
  <h2 class="font-display text-3xl uppercase leading-none mb-2">
    {trail.title}
  </h2>

  {#if trail.distance}
    <p class="text-sm text-orijen-gray font-sans mb-4">{trail.distance} km</p>
  {/if}

  {#if trail.description}
    <p class="text-sm text-black/70 leading-relaxed">{trail.description}</p>
  {/if}
</div>
