<script lang="ts">
  import type { Event, Influencer, Media, SignUpLabelsData } from '$lib/payload'
  import { mediaUrl } from '$lib/payload'
  import { env } from '$env/dynamic/public'
  import Button from '$lib/components/ui/Button.svelte'

  type Props = {
    event: Event
    signUpLabels: SignUpLabelsData | null
    locale: string
    onSignUp: (eventId: number, slot: string) => void
  }

  let { event, signUpLabels, locale, onSignUp }: Props = $props()

  const trail = $derived(typeof event.trail === 'object' ? event.trail : null)
  const influencerList = $derived(
    (event.influencers ?? []).filter((i): i is Influencer => typeof i === 'object')
  )
  const fullyBooked = $derived(
    !event.start &&
      (event.slots ?? []).length > 0 &&
      event.slots?.filter((s) => s.available).length === 0
  )

  const eventImage = $derived(
    typeof event.header === 'object' && event.header !== null ? (event.header as Media) : null
  )
  const trailImage = $derived(
    trail && typeof trail.header === 'object' && trail.header !== null
      ? (trail.header as Media)
      : null
  )
  const cardImage = $derived(eventImage ?? trailImage)
  const cardImageSrc = $derived(mediaUrl(cardImage, env.PUBLIC_PAYLOAD_URL))

  function formatEventDate(dateStr: string) {
    return new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(dateStr))
  }
</script>

<div class="border border-orijen-gray/30 bg-white text-orijen-black flex flex-col gap-3">
  <!-- Image -->
  <div class="relative aspect-video bg-orijen-gray/10 overflow-hidden shrink-0">
    {#if cardImageSrc}
      <img
        src={cardImageSrc}
        alt={cardImage?.alt ?? event.title ?? trail?.title}
        class="w-full h-full object-cover"
      />
    {:else}
      <div class="w-full h-full flex items-center justify-center">
        <span class="text-orijen-gray text-xs uppercase tracking-widest">No image</span>
      </div>
    {/if}
    <span
      class="absolute top-3 left-3 bg-orijen-red text-white text-sm font-bold uppercase tracking-widest px-2 py-1"
    >
      {formatEventDate(event.date)}
      {#if event.start}
        <span class="bg-orijen-red text-white p-1">
          {event.start}
        </span>
      {/if}
    </span>
  </div>

  <div class="p-6 pt-3 flex flex-col gap-3 flex-1">
    {#if trail}
      <p class="font-display text-xl uppercase text-orijen-red leading-none">
        {trail.title}
      </p>
    {/if}

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
              onclick={() => onSignUp(event.id, `${slot.start} – ${slot.end}`)}
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
</div>
