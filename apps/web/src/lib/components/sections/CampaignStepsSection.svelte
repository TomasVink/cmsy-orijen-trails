<script lang="ts">
  import type { CampaignStepsBlock } from '$lib/payload'
  import Section from '$lib/components/ui/Section.svelte'
  import Icon from '$lib/components/ui/Icon.svelte'

  type Props = { block: CampaignStepsBlock }
  let { block }: Props = $props()
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
              <Icon name={step.icon} size="2rem" />
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
