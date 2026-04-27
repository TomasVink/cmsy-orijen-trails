<script lang="ts">
  import type { UserFormBlock } from '$lib/payload'
  import type { SuperValidated, Infer } from 'sveltekit-superforms'
  import type { TrailSubmitSchema } from '$lib/trail-submit-schema'
  import type { PatchRequestSchema } from '$lib/patch-request-schema'
  import Button from '$lib/components/ui/Button.svelte'
  import CloseButton from '$lib/components/ui/CloseButton.svelte'
  import Icon from '$lib/components/ui/Icon.svelte'
  import Section from '../ui/Section.svelte'
  import SubmitTrailForm from '$lib/components/forms/SubmitTrailForm.svelte'
  import PatchRequestForm from '$lib/components/forms/PatchRequestForm.svelte'
  import { ICONS } from '$lib/icons'

  type Props = {
    block: UserFormBlock
    trailForm?: SuperValidated<Infer<TrailSubmitSchema>>
    patchRequestForm?: SuperValidated<Infer<PatchRequestSchema>>
  }

  let { block, trailForm, patchRequestForm }: Props = $props()

  let modalOpen = $state(false)
  let submitted = $state(false)

  const isPatchRequest = $derived(block.requestType === 'patch-request')

  function openModal() {
    modalOpen = true
  }
  function closeModal() {
    modalOpen = false
    submitted = false
  }
  function onSuccess() {
    submitted = true
  }
</script>

<!-- Section -->
<Section id={block.sectionId} backgroundColor={block.backgroundColor}>
  <div
    class="border-l-4 border-l-orijen-red md:p-12 p-4 flex flex-wrap sm:flex-nowrap items-center gap-x-8 gap-y-4 border border-orijen-gray/30 bg-orijen-gray/20"
  >
    <div
      class="shrink-0 flex items-center justify-center size-20 rounded-full bg-orijen-red text-white"
    >
      <Icon name={block.icon as keyof typeof ICONS} class="size-10" />
    </div>
    <div class="flex-1 min-w-0">
      <h2 class="font-display text-4xl md:text-5xl uppercase leading-none text-white mb-3">
        {block.title}
      </h2>
      {#if block.intro}
        <p class="text-orijen-gray font-sans text-base">{block.intro}</p>
      {/if}
    </div>
    <Button onclick={openModal} icon="send" class="w-full sm:w-auto">
      {block.ctaLabel}
    </Button>
  </div>
</Section>

<!-- Modal -->
{#if modalOpen}
  <div
    class="fixed inset-0 z-50"
    role="dialog"
    aria-modal="true"
    aria-label={block.title ?? undefined}
    tabindex="-1"
    onkeydown={(e) => {
      if (e.key === 'Escape') closeModal()
    }}
  >
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div
      role="presentation"
      class="relative overflow-y-auto min-h-screen flex items-start sm:items-center justify-center p-4 sm:py-12 bg-black/70"
      onclick={closeModal}
    >
      <div
        role="presentation"
        class="relative bg-white text-black w-full max-w-lg"
        onclick={(e) => e.stopPropagation()}
        onkeydown={(e) => e.stopPropagation()}
      >
        <!-- Header -->
        <div class="flex items-center justify-between bg-orijen-black text-white px-6 py-4">
          <h3 class="font-display text-3xl uppercase">{block.title}</h3>
          <CloseButton onclick={closeModal} />
        </div>

        <!-- Body -->
        <div class="px-6 py-6">
          {#if submitted}
            <div class="flex flex-col items-center gap-4 py-8 text-center">
              <div
                class="flex items-center justify-center size-16 rounded-full bg-orijen-red text-white"
              >
                <Icon name="check" class="size-8" />
              </div>
              <p>{block.successMessage}</p>
              <Button onclick={closeModal}>OK</Button>
            </div>
          {:else if isPatchRequest}
            <PatchRequestForm formData={patchRequestForm!} ctaLabel={block.ctaLabel} {onSuccess} />
          {:else}
            <SubmitTrailForm formData={trailForm!} ctaLabel={block.ctaLabel} {onSuccess} />
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}
