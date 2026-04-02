<script lang="ts">
  import type { PageData } from "./$types";
  import type { Media } from "$lib/payload";
  import { mediaUrl } from "$lib/payload";
  import { env } from "$env/dynamic/public";
  import Icon from "$lib/components/ui/Icon.svelte";
  import RichText from "$lib/components/ui/RichText.svelte";

  let { data }: { data: PageData } = $props();

  const trail = $derived(data.trail);

  const headerImage = $derived(
    typeof trail.header === "object" ? (trail.header as Media) : null,
  );
  const headerSrc = $derived(mediaUrl(headerImage, env.PUBLIC_PAYLOAD_URL));

  const difficultyLabel: Record<string, string> = {
    easy: "Easy",
    moderate: "Moderate",
    challenging: "Challenging",
  };
</script>

<svelte:head>
  <title>{trail.seo?.title ?? trail.title ?? "Trail"}</title>
  {#if trail.seo?.description}
    <meta name="description" content={trail.seo.description} />
  {:else if trail.description}
    <meta name="description" content={trail.description} />
  {/if}
</svelte:head>

<!-- Hero image -->
{#if headerSrc}
  <div class="relative w-full h-[50vh] overflow-hidden">
    <img
      src={headerSrc}
      alt={headerImage?.alt ?? trail.title}
      class="w-full h-full object-cover"
    />
    <div
      class="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"
    ></div>

    {#if trail.difficulty}
      <span
        class="absolute top-6 left-6 bg-orijen-red text-white text-xs font-bold uppercase tracking-widest px-2 py-1"
      >
        {difficultyLabel[trail.difficulty] ?? trail.difficulty}
      </span>
    {/if}

    <div class="absolute bottom-6 left-6 right-6">
      <h1 class="font-display text-5xl uppercase leading-none text-white">
        {trail.title}
      </h1>
    </div>
  </div>
{:else}
  <div class="pt-16 pb-8 px-6 container mx-auto max-w-4xl">
    {#if trail.difficulty}
      <span
        class="inline-block bg-orijen-red text-white text-xs font-bold uppercase tracking-widest px-2 py-1 mb-4"
      >
        {difficultyLabel[trail.difficulty] ?? trail.difficulty}
      </span>
    {/if}
    <h1 class="font-display text-5xl uppercase leading-none">{trail.title}</h1>
  </div>
{/if}

<div class="container mx-auto max-w-4xl px-6 py-12">
  <a
    href="/{data.locale}"
    class="text-sm text-orijen-gray hover:text-white transition-colors mb-8 inline-block uppercase tracking-widest"
  >
    ← Back
  </a>

  <!-- Stats bar -->
  <div
    class="flex flex-wrap gap-6 text-orijen-gray border-y border-orijen-gray/30 py-5 my-8"
  >
    {#if trail.distance}
      <span class="flex items-center gap-2">
        <Icon name="route" class="size-5" />
        <span class="font-display text-xl text-white">{trail.distance} km</span>
      </span>
    {/if}
    {#if trail.duration}
      <span class="flex items-center gap-2">
        <Icon name="clock" class="size-5" />
        <span class="font-display text-xl text-white">{trail.duration} h</span>
      </span>
    {/if}
  </div>

  {#if trail.description}
    <p class="text-lg text-orijen-gray mb-8">{trail.description}</p>
  {/if}

  {#if trail.content}
    <RichText
      content={trail.content}
      class="prose-invert prose-headings:font-display prose-headings:uppercase"
    />
  {/if}

  <!-- Photo gallery -->
  {#if trail.photos && trail.photos.length > 0}
    <div class="mt-12">
      <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
        {#each trail.photos as photo}
          {#if typeof photo.image === "object" && photo.image}
            {@const src = mediaUrl(
              photo.image as Media,
              env.PUBLIC_PAYLOAD_URL,
            )}
            {#if src}
              <div class="aspect-square overflow-hidden">
                <img
                  {src}
                  alt={(photo.image as Media).alt ?? trail.title}
                  class="w-full h-full object-cover"
                />
              </div>
            {/if}
          {/if}
        {/each}
      </div>
    </div>
  {/if}
</div>
