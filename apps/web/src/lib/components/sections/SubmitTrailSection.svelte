<script lang="ts">
  import { untrack } from 'svelte'
  import type { SubmitTrailBlock } from '$lib/payload'
  import type { SuperValidated, Infer } from 'sveltekit-superforms'
  import type { TrailSubmitSchema } from '$lib/trail-submit-schema'
  import { superForm } from 'sveltekit-superforms'
  import { zod4 } from 'sveltekit-superforms/adapters'
  import { trailSubmitSchema } from '$lib/trail-submit-schema'
  import { env } from '$env/dynamic/public'
  import Button from '$lib/components/ui/Button.svelte'
  import CloseButton from '$lib/components/ui/CloseButton.svelte'
  import Icon from '$lib/components/ui/Icon.svelte'
  import Section from '../ui/Section.svelte'
  import FormInput from '$lib/components/ui/FormInput.svelte'
  import FormSelect from '$lib/components/ui/FormSelect.svelte'
  import FormCheckbox from '$lib/components/ui/FormCheckbox.svelte'

  type Props = {
    block: SubmitTrailBlock
    form?: SuperValidated<Infer<TrailSubmitSchema>>
  }

  let { block, form: formData }: Props = $props()

  let modalOpen = $state(false)
  let submitted = $state(false)

  const { form, errors, enhance, submitting, message } = superForm(
    untrack(() => formData!),
    {
      id: 'submit-trail',
      validators: zod4(trailSubmitSchema),
      dataType: 'json',
      onResult({ result }) {
        if (result.type === 'success') submitted = true
      },
    },
  )

  // Address autocomplete
  type Suggestion = { label: string; lat: number; lng: number }
  let addressQuery = $state('')
  let suggestions = $state<Suggestion[]>([])
  let showSuggestions = $state(false)
  let debounceTimer: ReturnType<typeof setTimeout>

  async function fetchSuggestions(q: string) {
    if (q.length < 3) {
      suggestions = []
      return
    }
    const key = env.PUBLIC_HERE_API_KEY
    const res = await fetch(
      `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(q)}&limit=5&apiKey=${key}`,
    )
    if (!res.ok) return
    const data = (await res.json()) as {
      items?: { title: string; position: { lat: number; lng: number } }[]
    }
    suggestions = (data.items ?? []).map((i) => ({
      label: i.title,
      lat: i.position.lat,
      lng: i.position.lng,
    }))
  }

  function onAddressInput(e: Event) {
    addressQuery = (e.target as HTMLInputElement).value
    $form.address = addressQuery
    $form.lat = undefined
    $form.lng = undefined
    showSuggestions = true
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => fetchSuggestions(addressQuery), 300)
  }

  function selectSuggestion(s: Suggestion) {
    addressQuery = s.label
    $form.address = s.label
    $form.lat = s.lat
    $form.lng = s.lng
    suggestions = []
    showSuggestions = false
  }

  function openModal() {
    modalOpen = true
  }
  function closeModal() {
    modalOpen = false
    submitted = false
  }

  const fieldBase =
    'w-full border-2 border-orijen-gray/30 bg-white px-4 py-3 font-sans text-sm text-black focus:outline-none focus:border-orijen-red transition-colors'
  const labelBase = 'text-sm font-bold uppercase tracking-widest text-orijen-black/80 mb-1'
  const errorClass = 'mt-1 font-sans text-xs text-orijen-red'
</script>

<!-- Section -->
<Section>
  <div
    class="border-l-4 border-l-orijen-red p-12 flex items-center gap-8 border border-orijen-gray/30 bg-orijen-gray/20"
  >
    <div
      class="shrink-0 flex items-center justify-center size-20 rounded-full bg-orijen-red text-white"
    >
      <Icon name="add" class="size-10" />
    </div>
    <div class="flex-1">
      <h2 class="font-display text-4xl md:text-5xl uppercase leading-none text-white mb-3">
        {block.title}
      </h2>
      {#if block.intro}
        <p class="text-orijen-gray font-sans text-base mb-6">{block.intro}</p>
      {/if}
      <Button onclick={openModal} icon="send">
        {block.ctaLabel ?? 'Submit trail'}
      </Button>
    </div>
  </div>
</Section>

<!-- Modal -->
{#if modalOpen}
  <div
    class="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
    role="dialog"
    aria-modal="true"
    aria-label="Submit trail"
  >
    <div class="relative bg-white text-black w-full max-w-lg max-h-[90vh] overflow-y-auto">
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
            <p>
              {block.successMessage}
            </p>
            <Button onclick={closeModal}>OK</Button>
          </div>
        {:else}
          <form method="POST" action="?/submitTrail" use:enhance class="flex flex-col gap-5">
            <!-- Submitter info -->
            <FormInput
              id="st-name"
              name="name"
              label={block.nameLabel}
              bind:value={$form.name}
              error={$errors.name}
            />
            <FormInput
              id="st-email"
              type="email"
              name="email"
              label={block.emailLabel}
              bind:value={$form.email}
              error={$errors.email}
            />

            <hr class="border-orijen-gray/20" />

            <!-- Trail details -->
            <FormInput
              id="st-title"
              name="title"
              label={block.trailNameLabel}
              bind:value={$form.title}
              error={$errors.title}
            />
            <FormInput
              id="st-description"
              type="textarea"
              name="description"
              label={block.descriptionLabel}
              labelSuffix="(max 120 chars)"
              bind:value={$form.description}
              error={$errors.description}
            />
            <div>
              <label class={labelBase} for="st-address">{block.addressLabel}</label>
              <div class="relative">
                <input
                  id="st-address"
                  type="text"
                  name="address"
                  autocomplete="off"
                  value={addressQuery}
                  oninput={onAddressInput}
                  onblur={() =>
                    setTimeout(() => {
                      showSuggestions = false
                    }, 150)}
                  class={fieldBase}
                />
                {#if showSuggestions && suggestions.length > 0}
                  <ul
                    class="absolute z-10 w-full border-2 border-orijen-gray/30 border-t-0 bg-white text-black"
                  >
                    {#each suggestions as s}
                      <li>
                        <button
                          type="button"
                          onmousedown={() => selectSuggestion(s)}
                          class="w-full text-left px-4 py-2 font-sans text-sm hover:bg-orijen-red hover:text-white transition-colors"
                          >{s.label}</button
                        >
                      </li>
                    {/each}
                  </ul>
                {/if}
              </div>
              {#if $errors.address}<p class={errorClass}>
                  {$errors.address}
                </p>{/if}
            </div>
            <FormInput
              id="st-distance"
              type="number"
              name="distance"
              label={block.distanceLabel}
              bind:value={$form.distance}
              error={$errors.distance}
              step="0.1"
              min="0"
            />
            <FormSelect
              id="st-offleash"
              name="offLeashArea"
              label={block.offLeashAreaLabel ?? ''}
              bind:value={$form.offLeashArea}
              error={$errors.offLeashArea}
            >
              <option value={undefined}>{block.offLeashAreaPlaceholder}</option>
              <option value="fully">{block.offLeashAreaFullyLabel}</option>
              <option value="partial">{block.offLeashAreaPartialLabel}</option>
              <option value="none">{block.offLeashAreaNoneLabel}</option>
            </FormSelect>

            <!-- Checkboxes -->
            <div class="flex flex-col gap-3">
              <FormCheckbox
                name="hospitality"
                label={block.hospitalityLabel ?? ''}
                bind:checked={$form.hospitality}
              />
              <FormCheckbox
                name="water"
                label={block.waterLabel ?? ''}
                bind:checked={$form.water}
              />
            </div>

            {#if $message}
              <p class="text-orijen-red font-sans text-sm">{$message}</p>
            {/if}

            <Button type="submit" icon="send" disabled={$submitting}>
              {$submitting ? 'Submitting…' : (block.ctaLabel ?? 'Submit trail')}
            </Button>
          </form>
        {/if}
      </div>
    </div>
  </div>
{/if}
