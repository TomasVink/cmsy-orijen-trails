<script lang="ts">
  import type { SubmitTrailBlock } from '$lib/payload'
  import Section from '$lib/components/ui/Section.svelte'
  import RichText from '$lib/components/ui/RichText.svelte'
  import Button from '$lib/components/ui/Button.svelte'
  import { env } from '$env/dynamic/public'

  type Props = { block: SubmitTrailBlock }
  let { block }: Props = $props()

  let name = $state('')
  let email = $state('')
  let trailName = $state('')
  let description = $state('')
  let status = $state<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault()
    status = 'submitting'

    try {
      const res = await fetch(`${env.PUBLIC_PAYLOAD_URL}/api/trails`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: trailName,
          description,
          published: false,
          // Store submitter info in the description for editor review
          // (a dedicated submitter collection can be added later)
        }),
      })

      if (!res.ok) throw new Error('Submission failed')

      status = 'success'
      name = ''
      email = ''
      trailName = ''
      description = ''
    } catch {
      status = 'error'
    }
  }

  const fieldBase =
    'w-full border-2 border-orijen-gray/30 bg-white px-4 py-3 font-sans text-sm focus:outline-none focus:border-orijen-red transition-colors'
  const labelBase = 'block font-sans text-xs font-bold uppercase tracking-widest text-orijen-gray mb-1'
</script>

<Section id="submit" class="py-20 bg-white">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
    <!-- Text column -->
    <div>
      <h2 class="font-display text-5xl md:text-6xl uppercase leading-none mb-6">{block.title}</h2>
      {#if block.body}
        <RichText content={block.body} class="text-orijen-gray" />
      {/if}
    </div>

    <!-- Form column -->
    <div>
      {#if status === 'success'}
        <div class="bg-orijen-red text-white p-8">
          <p class="font-display text-3xl uppercase">Trail submitted!</p>
          <p class="font-sans text-sm mt-2 text-white/80">We'll review your trail and get back to you soon.</p>
        </div>
      {:else}
        <form onsubmit={handleSubmit} class="flex flex-col gap-5">
          <div>
            <label class={labelBase} for="submit-name">{block.nameLabel ?? 'Your name'}</label>
            <input id="submit-name" type="text" required bind:value={name} class={fieldBase} />
          </div>
          <div>
            <label class={labelBase} for="submit-email">{block.emailLabel ?? 'Email address'}</label>
            <input id="submit-email" type="email" required bind:value={email} class={fieldBase} />
          </div>
          <div>
            <label class={labelBase} for="submit-trail-name">{block.trailNameLabel ?? 'Trail name'}</label>
            <input id="submit-trail-name" type="text" required bind:value={trailName} class={fieldBase} />
          </div>
          <div>
            <label class={labelBase} for="submit-description">{block.descriptionLabel ?? 'Trail description'}</label>
            <textarea
              id="submit-description"
              rows="4"
              required
              bind:value={description}
              class="{fieldBase} resize-none"
            ></textarea>
          </div>

          {#if status === 'error'}
            <p class="text-orijen-red font-sans text-sm">Something went wrong. Please try again.</p>
          {/if}

          <Button type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Submitting…' : (block.ctaLabel ?? 'Submit trail')}
          </Button>
        </form>
      {/if}
    </div>
  </div>
</Section>
