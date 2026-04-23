<script lang="ts">
  import { untrack } from 'svelte'
  import type { SuperValidated, Infer } from 'sveltekit-superforms'
  import { page } from '$app/state'
  import type { UiLabelsData } from '$lib/payload'
  import type { PatchRequestSchema } from '$lib/patch-request-schema'
  import { superForm } from 'sveltekit-superforms'
  import { zod4 } from 'sveltekit-superforms/adapters'
  import { patchRequestSchema } from '$lib/patch-request-schema'
  import { env } from '$env/dynamic/public'
  import Button from '$lib/components/ui/Button.svelte'
  import FormInput from '$lib/components/ui/FormInput.svelte'
  import FormSelect from '$lib/components/ui/FormSelect.svelte'
  import FormFileInput from '$lib/components/ui/FormFileInput.svelte'

  type Props = {
    formData: SuperValidated<Infer<PatchRequestSchema>>
    ctaLabel?: string | null
    onSuccess: () => void
  }

  let { formData, ctaLabel, onSuccess }: Props = $props()

  const { form, errors, enhance, submitting } = superForm(untrack(() => formData), {
    id: 'submit-patch-request',
    validators: zod4(patchRequestSchema),
    dataType: 'json',
    onResult({ result }) {
      if (result.type === 'success') onSuccess()
    },
  })

  let uploadedId = $state<string | undefined>(undefined)

  $effect(() => {
    $form.imageId = uploadedId ?? ''
  })

  // Address autocomplete
  type AddressSuggestion = {
    label: string
    streetAddress: string
    postcode: string
    city: string
    country: string
  }

  let addressQuery = $state($form.streetAddress ?? '')
  let suggestions = $state<AddressSuggestion[]>([])
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
      items?: {
        title: string
        address: {
          street?: string
          houseNumber?: string
          postalCode?: string
          city?: string
          countryName?: string
        }
      }[]
    }
    suggestions = (data.items ?? []).map((i) => {
      const street = [i.address.street, i.address.houseNumber].filter(Boolean).join(' ')
      return {
        label: i.title,
        streetAddress: street,
        postcode: i.address.postalCode ?? '',
        city: i.address.city ?? '',
        country: i.address.countryName ?? '',
      }
    })
  }

  function onAddressInput(e: Event) {
    addressQuery = (e.target as HTMLInputElement).value
    $form.streetAddress = addressQuery
    showSuggestions = true
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => fetchSuggestions(addressQuery), 300)
  }

  function selectSuggestion(s: AddressSuggestion) {
    addressQuery = s.streetAddress || s.label
    $form.streetAddress = addressQuery
    $form.postcode = s.postcode
    $form.city = s.city
    $form.country = s.country
    suggestions = []
    showSuggestions = false
  }

  // Fetch available patches
  type PatchOption = { id: string; patch: string }
  let patches = $state<PatchOption[]>([])

  $effect(() => {
    fetch(`${env.PUBLIC_PAYLOAD_URL}/api/patches?limit=100&depth=0`)
      .then((r) => r.json())
      .then((data: { docs?: PatchOption[] }) => { patches = data.docs ?? [] })
      .catch(() => {})
  })

  const uiLabels = $derived(page.data.uiLabels as UiLabelsData | null)
  const f = $derived(uiLabels?.patchRequestForm)

  const fieldBase =
    'w-full border-2 border-orijen-gray/30 bg-white px-4 py-3 font-sans text-sm text-black focus:outline-none focus:border-orijen-red transition-colors'
  const labelBase = 'text-sm font-bold uppercase tracking-widest text-orijen-black/80 mb-1'
  const errorClass = 'mt-1 font-sans text-xs text-orijen-red'
</script>

<form method="POST" action="?/submitPatchRequest" use:enhance class="flex flex-col gap-5">
  <FormInput
    id="pr-name"
    name="name"
    label={f?.nameLabel ?? 'Name'}
    bind:value={$form.name}
    error={$errors.name}
    required
  />
  <FormInput
    id="pr-email"
    type="email"
    name="email"
    label={f?.emailLabel ?? 'Email address'}
    bind:value={$form.email}
    error={$errors.email}
    required
  />

  <hr class="border-orijen-gray/20" />

  <!-- Street address with autocomplete -->
  <div>
    <label class={labelBase} for="pr-street">{f?.streetAddressLabel ?? 'Street address'}<span class="text-orijen-red ml-0.5" aria-hidden="true">*</span></label>
    <div class="relative">
      <input
        id="pr-street"
        type="text"
        name="streetAddress"
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
    {#if $errors.streetAddress}<p class={errorClass}>{$errors.streetAddress}</p>{/if}
  </div>

  <div class="grid grid-cols-2 gap-4">
    <FormInput
      id="pr-postcode"
      name="postcode"
      label={f?.postcodeLabel ?? 'Postcode'}
      bind:value={$form.postcode}
      error={$errors.postcode}
      required
    />
    <FormInput
      id="pr-city"
      name="city"
      label={f?.cityLabel ?? 'City'}
      bind:value={$form.city}
      error={$errors.city}
      required
    />
  </div>
  <FormInput
    id="pr-country"
    name="country"
    label={f?.countryLabel ?? 'Country'}
    bind:value={$form.country}
    error={$errors.country}
    required
  />

  <hr class="border-orijen-gray/20" />

  <FormSelect
    id="pr-patch"
    name="patchId"
    label={f?.patchLabel ?? 'Patch'}
    bind:value={$form.patchId}
    error={$errors.patchId}
    required
  >
    <option value="">— select —</option>
    {#each patches as p}
      <option value={String(p.id)}>{p.patch}</option>
    {/each}
  </FormSelect>

  <FormFileInput
    id="pr-image"
    label={f?.imageLabel ?? 'Photo'}
    bind:uploadedId
    error={$errors.imageId}
    required
  />
  <input type="hidden" name="imageId" value={$form.imageId} />

  <Button type="submit" icon="send" disabled={$submitting}>
    {$submitting
      ? (uiLabels?.submitting ?? 'Submitting…')
      : (f?.submitLabel ?? ctaLabel ?? 'Submit request')}
  </Button>
</form>
