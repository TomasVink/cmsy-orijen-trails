<script lang="ts">
  import { untrack } from 'svelte'
  import type { EventsBlock, SignUpLabelsData, UiLabelsData, Event, Influencer } from '$lib/payload'
  import type { SuperValidated, Infer } from 'sveltekit-superforms'
  import { page } from '$app/state'
  import type { EventsSignUpSchema } from '$lib/events-signup-schema'
  import { eventsSignUpSchema } from '$lib/events-signup-schema'
  import { superForm } from 'sveltekit-superforms'
  import { zod4 } from 'sveltekit-superforms/adapters'
  import Section from '../ui/Section.svelte'
  import FormInput from '$lib/components/ui/FormInput.svelte'
  import Button from '$lib/components/ui/Button.svelte'
  import CloseButton from '$lib/components/ui/CloseButton.svelte'
  import Icon from '$lib/components/ui/Icon.svelte'

  type Props = {
    block: EventsBlock
    events: Event[]
    signUpForm?: SuperValidated<Infer<EventsSignUpSchema>>
  }

  let { block, events, signUpForm }: Props = $props()

  let modalOpen = $state(false)
  let submitted = $state(false)
  let selectedSlotLabel = $state<string | null>(null)

  const { form, errors, enhance, submitting } = superForm(
    untrack(
      () => signUpForm ?? { name: '', email: '', phone: undefined, eventId: -1, slot: undefined }
    ),
    {
      id: 'events-signup',
      validators: zod4(eventsSignUpSchema),
      dataType: 'json',
      onResult({ result }) {
        if (result.type === 'success') submitted = true
      }
    }
  )

  function openModal(eventId: number, slot: string) {
    $form.eventId = eventId
    $form.slot = slot
    selectedSlotLabel = slot
    modalOpen = true
    submitted = false
  }

  function closeModal() {
    modalOpen = false
    submitted = false
  }

  const signUpLabels = $derived(page.data.signUpLabels as SignUpLabelsData | null)
  const uiLabels = $derived(page.data.uiLabels as UiLabelsData | null)
  const locale = $derived((page.data.locale as string) ?? 'nl')

  function formatEventDate(dateStr: string) {
    return new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(dateStr))
  }
</script>

<Section title={block.title} intro={block.intro ?? undefined} id={block.sectionId} backgroundImage={block.backgroundImage} backgroundColor={block.backgroundColor}>
  {#if events.length === 0}
    <p class="text-center font-sans text-orijen-gray">—</p>
  {:else}
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {#each events as event (event.id)}
        {@const trail = typeof event.trail === 'object' ? event.trail : null}
        {@const influencerList = (event.influencers ?? []).filter(
          (i): i is Influencer => typeof i === 'object'
        )}
        {@const fullyBooked =
          !event.start &&
          (event.slots ?? []).length > 0 &&
          event.slots?.filter((s) => s.available).length === 0}

        <div
          class="border border-orijen-gray/30 bg-white text-orijen-black p-6 flex flex-col gap-3"
        >
          {#if trail}
            <p class="font-display text-xl uppercase text-orijen-red leading-none">{trail.title}</p>
          {/if}

          <p class="font-sans text-sm font-bold">
            {formatEventDate(event.date)}
            {#if event.start}
              <span class="bg-orijen-red text-white p-1">
                {event.start}
              </span>
            {/if}
          </p>

          <p>
            {event.description}
          </p>

          {#if influencerList.length > 0}
            <p class="font-sans text-sm text-orijen-black/60">
              {influencerList.map((i) => i.name).join(', ')}
            </p>
          {/if}

          <div class="mt-auto pt-2">
            {#if !event.start}
              <h4 class="mb-4">{signUpLabels?.signupCta}</h4>
              <div class="flex flex-wrap gap-2">
                {#each event.slots as slot (slot.id)}
                  <Button
                    onclick={() => openModal(event.id, `${slot.start} – ${slot.end}`)}
                    disabled={!slot.available}
                  >
                    {slot.start} – {slot.end}
                  </Button>
                {/each}
              </div>
            {:else if fullyBooked}
              <span
                class="inline-block border-2 border-orijen-gray/40 text-orijen-gray/60 font-sans text-sm px-3 py-1"
              >
                {signUpLabels?.fullyBooked ?? 'Fully booked'}
              </span>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</Section>

{#if modalOpen}
  <div
    class="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
    role="dialog"
    aria-modal="true"
    aria-label={block.title}
  >
    <div class="relative bg-white text-black w-full max-w-lg max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center justify-between bg-orijen-black text-white px-6 py-4">
        <div>
          <h3 class="font-display text-3xl uppercase">{block.title}</h3>
          {#if selectedSlotLabel}
            <p class="font-sans text-sm mt-1 text-orijen-gray">{selectedSlotLabel}</p>
          {/if}
        </div>
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
            <h4 class="font-display text-2xl uppercase">
              {signUpLabels?.successTitle ?? 'Registration received!'}
            </h4>
            <p class="font-sans text-sm">{signUpLabels?.successMessage ?? ''}</p>
            <Button onclick={closeModal}>OK</Button>
          </div>
        {:else}
          <form method="POST" action="?/signUpEvent" use:enhance class="flex flex-col gap-5">
            <FormInput
              id="su-name"
              name="name"
              label={signUpLabels?.nameLabel ?? 'Your name'}
              bind:value={$form.name}
              error={$errors.name}
            />
            <FormInput
              id="su-email"
              type="email"
              name="email"
              label={signUpLabels?.emailLabel ?? 'Email address'}
              bind:value={$form.email}
              error={$errors.email}
            />
            <FormInput
              id="su-phone"
              name="phone"
              label={signUpLabels?.phoneLabel ?? 'Phone number'}
              bind:value={$form.phone}
              error={$errors.phone}
            />
            <Button type="submit" icon="send" disabled={$submitting}>
              {$submitting
                ? (uiLabels?.submitting ?? 'Submitting…')
                : (signUpLabels?.submitLabel ?? 'Sign up')}
            </Button>
          </form>
        {/if}
      </div>
    </div>
  </div>
{/if}
