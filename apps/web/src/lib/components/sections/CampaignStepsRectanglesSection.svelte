<script lang="ts">
  import type { CampaignStepsBlock } from '$lib/payload'
  import { mediaUrl } from '$lib/payload'
  import Section from '$lib/components/ui/Section.svelte'

  type Props = { block: CampaignStepsBlock }
  let { block }: Props = $props()
</script>

<Section
  id={block.sectionId}
  title={block.title}
  intro={block.intro ?? ''}
  backgroundImage={block.backgroundImage}
  backgroundColor={block.backgroundColor}
>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden">
    {#each block.steps ?? [] as step, i}
      {@const imgSrc = mediaUrl(step.image)}
      <div class="flex flex-col">
        <!-- Text block -->
        <div class="flex items-start p-4 pb-0 gap-3 bg-orijen-black">
          <div class="relative shrink-0 w-16 h-16">
            <img
              src="/number-bg.svg"
              alt=""
              class="absolute inset-0 w-full h-full"
              aria-hidden="true"
            />
            <span
              class="absolute inset-0 flex items-center justify-center font-display text-white text-4xl"
              style="text-shadow: 0 1px 4px rgba(0,0,0,0.4);"
            >
              {i + 1}.
            </span>
          </div>
          <div class="flex flex-col pt-3 min-w-0">
            <p class="font-display uppercase text-2xl">{step.title}</p>
            {#if step.description}
              <p class="text-sm uppercase tracking-widest mt-1 leading-snug">{step.description}</p>
            {/if}
          </div>
        </div>

        <!-- Image starts directly below text -->
        <div class="relative flex-1 min-h-40 overflow-hidden">
          {#if imgSrc}
            <img
              src={imgSrc}
              alt={step.title}
              class="absolute inset-0 w-full h-full object-cover"
            />
          {/if}
          <!-- Subtle gradient at top edge to blend with the text block -->
          <div
            class="absolute inset-x-0 top-0 h-10 bg-linear-to-b from-orijen-black to-transparent pointer-events-none"
          ></div>
        </div>
      </div>
    {/each}
  </div>
</Section>
