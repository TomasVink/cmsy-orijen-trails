<script lang="ts">
  import type { CampaignStepsBlock, Media } from '$lib/payload'
  import { mediaUrl } from '$lib/payload'
  import Section from '$lib/components/ui/Section.svelte'
  import { env } from '$env/dynamic/public'

  type Props = { block: CampaignStepsBlock }
  let { block }: Props = $props()

  function stepIconSrc(icon: number | Media | null | undefined): string | null {
    return mediaUrl(typeof icon === 'object' ? icon : null, env.PUBLIC_PAYLOAD_URL)
  }
</script>

<Section id="campaign-steps" class="py-20 bg-white">
  <div class="text-center mb-12">
    <h2 class="font-display text-5xl md:text-6xl uppercase leading-none">{block.title}</h2>
    {#if block.intro}
      <p class="font-sans text-orijen-gray mt-4 max-w-xl mx-auto">{block.intro}</p>
    {/if}
  </div>

  {#if block.steps?.length}
    <ol class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {#each block.steps as step, i (step.id)}
        <li class="flex flex-col items-center text-center gap-4">
          <!-- Step number / icon -->
          <div class="w-16 h-16 flex items-center justify-center bg-orijen-red text-white">
            {#if step.icon}
              {@const src = stepIconSrc(step.icon)}
              {#if src}
                <img src={src} alt={step.title} class="w-8 h-8 object-contain invert" />
              {:else}
                <span class="font-display text-2xl">{i + 1}</span>
              {/if}
            {:else}
              <span class="font-display text-2xl">{i + 1}</span>
            {/if}
          </div>

          <h3 class="font-display text-xl uppercase leading-none">{step.title}</h3>

          {#if step.description}
            <p class="font-sans text-sm text-orijen-gray leading-relaxed">{step.description}</p>
          {/if}
        </li>
      {/each}
    </ol>
  {/if}
</Section>
