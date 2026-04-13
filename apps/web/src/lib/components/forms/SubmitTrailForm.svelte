<script lang="ts">
  import { untrack } from 'svelte'
  import type { SuperValidated, Infer } from 'sveltekit-superforms'
  import { page } from '$app/state'
  import type { TrailLabelsData, UiLabelsData } from '$lib/payload'
  import type { TrailSubmitSchema } from '$lib/trail-submit-schema'
  import { superForm } from 'sveltekit-superforms'
  import { zod4 } from 'sveltekit-superforms/adapters'
  import { trailSubmitSchema } from '$lib/trail-submit-schema'
  import { env } from '$env/dynamic/public'
  import Button from '$lib/components/ui/Button.svelte'
  import FormInput from '$lib/components/ui/FormInput.svelte'
  import FormSelect from '$lib/components/ui/FormSelect.svelte'
  import FormCheckbox from '$lib/components/ui/FormCheckbox.svelte'

  type Props = {
    formData: SuperValidated<Infer<TrailSubmitSchema>>
    ctaLabel?: string | null
    onSuccess: () => void
  }

  let { formData, ctaLabel, onSuccess }: Props = $props()

  const { form, errors, enhance, submitting } = superForm(untrack(() => formData), {
    id: 'submit-trail',
    validators: zod4(trailSubmitSchema),
    dataType: 'json',
    onResult({ result }) {
      if (result.type === 'success') onSuccess()
    },
  })

  type Suggestion = { label: string; lat: number; lng: number }
  let addressQuery = $state('')
  let suggestions = $state<Suggestion[]>([])
  let showSuggestions = $state(false)
  let debounceTimer: ReturnType<typeof setTimeout>

  async function fetchSuggestions(q: string) {
    if (q.length < 3) { suggestions = []; return }
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

  const trailLabels = $derived(page.data.trailLabels as TrailLabelsData | null)
  const uiLabels = $derived(page.data.uiLabels as UiLabelsData | null)
  const f = $derived(trailLabels?.form)

  const fieldBase =
    'w-full border-2 border-orijen-gray/30 bg-white px-4 py-3 font-sans text-sm text-black focus:outline-none focus:border-orijen-red transition-colors'
  const labelBase = 'text-sm font-bold uppercase tracking-widest text-orijen-black/80 mb-1'
  const errorClass = 'mt-1 font-sans text-xs text-orijen-red'
</script>

<form method="POST" action="?/submitTrail" use:enhance class="flex flex-col gap-5">
  <FormInput
    id="st-name"
    name="name"
    label={f?.nameLabel ?? 'Your name'}
    bind:value={$form.name}
    error={$errors.name}
  />
  <FormInput
    id="st-email"
    type="email"
    name="email"
    label={f?.emailLabel ?? 'Email address'}
    bind:value={$form.email}
    error={$errors.email}
  />

  <hr class="border-orijen-gray/20" />

  <FormInput
    id="st-title"
    name="title"
    label={f?.trailNameLabel ?? 'Trail name'}
    bind:value={$form.title}
    error={$errors.title}
  />
  <FormInput
    id="st-description"
    type="textarea"
    name="description"
    label={f?.descriptionLabel ?? 'Trail description'}
    labelSuffix={f?.descriptionHint ?? '(max 120 chars)'}
    bind:value={$form.description}
    error={$errors.description}
  />
  <div>
    <label class={labelBase} for="st-address">{f?.addressLabel ?? 'Address / start point'}</label>
    <div class="relative">
      <input
        id="st-address"
        type="text"
        name="address"
        autocomplete="off"
        value={addressQuery}
        oninput={onAddressInput}
        onblur={() => setTimeout(() => { showSuggestions = false }, 150)}
        class={fieldBase}
      />
      {#if showSuggestions && suggestions.length > 0}
        <ul class="absolute z-10 w-full border-2 border-orijen-gray/30 border-t-0 bg-white text-black">
          {#each suggestions as s}
            <li>
              <button
                type="button"
                onmousedown={() => selectSuggestion(s)}
                class="w-full text-left px-4 py-2 font-sans text-sm hover:bg-orijen-red hover:text-white transition-colors"
              >{s.label}</button>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
    {#if $errors.address}<p class={errorClass}>{$errors.address}</p>{/if}
  </div>
  <FormInput
    id="st-distance"
    type="number"
    name="distance"
    label={f?.distanceLabel ?? 'Distance (km)'}
    bind:value={$form.distance}
    error={$errors.distance}
    step="0.1"
    min="0"
  />
  <FormSelect
    id="st-offleash"
    name="offLeashArea"
    label={f?.offLeashAreaLabel ?? 'Off-leash area'}
    bind:value={$form.offLeashArea}
    error={$errors.offLeashArea}
  >
    <option value={undefined}>{f?.offLeashAreaPlaceholder ?? '— select —'}</option>
    <option value="fully">{trailLabels?.offLeash?.fully ?? 'Fully'}</option>
    <option value="partial">{trailLabels?.offLeash?.partial ?? 'Partial'}</option>
    <option value="none">{trailLabels?.offLeash?.none ?? 'None'}</option>
  </FormSelect>
  <div class="flex flex-col gap-3">
    <FormCheckbox
      name="hospitality"
      label={f?.hospitalityLabel ?? 'Hospitality nearby (café, restaurant, etc.)'}
      bind:checked={$form.hospitality}
    />
    <FormCheckbox
      name="water"
      label={f?.waterLabel ?? 'Natural water on route (river, lake, sea)'}
      bind:checked={$form.water}
    />
  </div>

  <Button type="submit" icon="send" disabled={$submitting}>
    {$submitting ? (uiLabels?.submitting ?? 'Submitting…') : (ctaLabel ?? 'Submit trail')}
  </Button>
</form>
