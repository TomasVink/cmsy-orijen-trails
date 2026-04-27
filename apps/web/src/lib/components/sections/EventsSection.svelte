<script lang="ts">
  import { untrack } from 'svelte'
  import type { EventsBlock, SignUpLabelsData, UiLabelsData, Event } from '$lib/payload'
  import type { SuperValidated, Infer } from 'sveltekit-superforms'
  import { page } from '$app/state'
  import type { EventsSignUpSchema } from '$lib/events-signup-schema'
  import { eventsSignUpSchema } from '$lib/events-signup-schema'
  import { superForm } from 'sveltekit-superforms'
  import { zod4 } from 'sveltekit-superforms/adapters'
  import Section from '../ui/Section.svelte'
  import EventCard from '$lib/components/ui/EventCard.svelte'
  import Carousel from '$lib/components/ui/Carousel.svelte'
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
      () =>
        signUpForm ?? {
          name: '',
          email: '',
          phone: undefined,
          eventId: -1,
          slot: undefined,
          people: 1,
          dogs: 0,
          other: 0
        }
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
    $form.people = 1
    $form.dogs = 0
    $form.other = 0
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
</script>

<Section
  title={block.title}
  intro={block.intro ?? undefined}
  id={block.sectionId}
  backgroundImage={block.backgroundImage}
  backgroundColor={block.backgroundColor}
>
  {#if events.length === 0}
    <p class="text-center font-sans text-orijen-gray">—</p>
  {:else}
    <Carousel items={events} ariaLabel="Events carousel">
      {#snippet children(event)}
        <EventCard {event} {signUpLabels} {locale} onSignUp={openModal} />
      {/snippet}
    </Carousel>
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
              required
            />
            <FormInput
              id="su-email"
              type="email"
              name="email"
              label={signUpLabels?.emailLabel ?? 'Email address'}
              bind:value={$form.email}
              error={$errors.email}
              required
            />
            <FormInput
              id="su-phone"
              name="phone"
              label={signUpLabels?.phoneLabel ?? 'Phone number'}
              bind:value={$form.phone}
              error={$errors.phone}
            />
            <FormInput
              id="su-people"
              type="number"
              name="people"
              label={signUpLabels?.peopleLabel ?? 'Number of people'}
              bind:value={$form.people}
              error={$errors.people}
              min={0}
              max={6}
            />
            <FormInput
              id="su-dogs"
              type="number"
              name="dogs"
              label={signUpLabels?.dogsLabel ?? 'Number of dogs'}
              bind:value={$form.dogs}
              error={$errors.dogs}
              min={0}
              max={6}
            />
            <FormInput
              id="su-other"
              type="number"
              name="other"
              label={signUpLabels?.otherLabel ?? 'Other'}
              bind:value={$form.other}
              error={$errors.other}
              min={0}
              max={6}
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
