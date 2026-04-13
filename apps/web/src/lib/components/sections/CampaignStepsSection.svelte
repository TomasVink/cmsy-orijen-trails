<script lang="ts">
  import type { CampaignStepsBlock } from '$lib/payload'
  import Section from '$lib/components/ui/Section.svelte'
  import Icon from '$lib/components/ui/Icon.svelte'

  type Props = { block: CampaignStepsBlock }
  let { block }: Props = $props()
</script>

<Section id={block.sectionId} title={block.title} intro={block.intro ?? ''}>
  {#if block.steps?.length}
    <ol class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {#each block.steps as step, i (step.id)}
        <li
          class="flex flex-col items-center text-center bg-orijen-gray/20 border border-orijen-gray/30 p-4 hover:border-orijen-red hover:bg-orijen-gray/30 transition hover:-translate-y-1 duration-300"
        >
          <div class="flex items-center justify-center text-orijen-red">
            {#if step.icon}
              <Icon name={step.icon} class="size-20" />
            {:else}
              <span class="font-display text-2xl">{i + 1}</span>
            {/if}
          </div>

          <h3 class="text-3xl uppercase leading-none">
            {step.title}
          </h3>

          {#if step.description}
            <p class="text-sm text-orijen-gray">
              {step.description}
            </p>
          {/if}
        </li>
      {/each}
    </ol>
  {/if}
</Section>
