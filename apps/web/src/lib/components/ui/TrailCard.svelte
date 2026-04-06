<script lang="ts">
  import type { Trail, Media, TrailLabelsData } from "$lib/payload";
  import { mediaUrl } from "$lib/payload";
  import { env } from "$env/dynamic/public";
  import { page } from "$app/state";
  import Icon from "./Icon.svelte";
  import Button from "./Button.svelte";

  type Props = {
    trail: Trail;
    onClose?: () => void;
  };

  let { trail, onClose }: Props = $props();

  const image = $derived(
    typeof trail.header === "object" ? (trail.header as Media) : null,
  );
  const imageSrc = $derived(mediaUrl(image, env.PUBLIC_PAYLOAD_URL));
  const trailLabels = $derived(page.data.trailLabels as TrailLabelsData | null);
</script>

<div
  class="flex flex-col h-full bg-orijen-gray/20 border border-orijen-gray/30 p-4 hover:border-orijen-red hover:bg-orijen-gray/30"
>
  {#if onClose}
    <button
      onclick={onClose}
      class="flex justify-end
    text-lg font-sans font-black cursor-pointer text-white hover:text-orijen-red transition-colors mb-5"
    >
      ╳
    </button>
  {/if}

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
        {trailLabels?.difficulty?.[trail.difficulty] ?? trail.difficulty}
      </span>
    {/if}
  </div>

  <h2 class="font-display text-3xl uppercase leading-none mb-2">
    {trail.title}
  </h2>

  <div class="flex align-middle text-orijen-gray">
    <span class="flex align-middle mr-4">
      <Icon name="route" class="size-6" />
      {trail.distance} km
    </span>
    <span class="flex align-middle mr-4">
      <Icon name="clock" class="size-6" />
      {trail.duration} h
    </span>
  </div>

  {#if trail.description}
    <p>{trail.description}</p>
  {/if}

  <div class="mt-auto pt-4">
    <Button href="/{page.params.locale}/trails/{trail.id}"
      >{trailLabels?.viewTrail ?? 'View trail'} <Icon name="arrow-right" /></Button
    >
  </div>
</div>
