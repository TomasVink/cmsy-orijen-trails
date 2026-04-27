<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { Media } from '$lib/payload'
  import { mediaUrl } from '$lib/payload'
  import Title from './Title.svelte'

  type Props = {
    id?: string
    class?: string
    children: Snippet
    title?: string
    intro?: string
    backgroundImage?: Media | number | null
    backgroundColor?: 'black' | 'white' | 'texture' | null
  }

  let {
    id,
    class: className = '',
    children,
    title,
    intro,
    backgroundImage,
    backgroundColor
  }: Props = $props()

  const imgSrc = $derived(mediaUrl(backgroundImage))
  const isLight = $derived(backgroundColor === 'white')

  const bgClass = $derived(
    backgroundColor === 'white'
      ? 'bg-orijen-cream text-orijen-black'
      : backgroundColor === 'black'
        ? 'bg-orijen-black'
        : ''
  )

  const bgStyle = $derived(
    backgroundColor === 'texture'
      ? "background-image: url('/gray-leather-texture-backg.jpg'); background-repeat: repeat; background-size: auto; background-color: var(--color-orijen-black);"
      : undefined
  )
</script>

<section {id} class="{bgClass} {className}" style={bgStyle}>
  {#if imgSrc}
    <div class="relative w-full lg:aspect-4/1 sm:aspect-3/1 aspect-2/1 overflow-hidden">
      <img src={imgSrc} alt="" class="absolute inset-0 w-full h-full object-cover" />
      <div
        class="absolute inset-0 {isLight
          ? 'bg-linear-to-t from-orijen-cream to-transparent'
          : 'bg-linear-to-t from-black to-transparent'}"
      ></div>
      {#if title}
        <div class="absolute bottom-0 inset-x-0">
          <div class="max-w-6xl mx-auto px-4 text-center">
            <Title>{title}</Title>
          </div>
        </div>
      {/if}
    </div>
  {/if}
  <div class={imgSrc ? 'pb-16 px-4' : 'py-16 px-4'}>
    <div class="max-w-6xl mx-auto">
      {#if !imgSrc && title}
        <div class="text-center mb-12 max-w-2xl mx-auto">
          {#if title}
            <Title>{title}</Title>
          {/if}
          {#if intro}
            <p>{intro}</p>
          {/if}
        </div>
      {:else if intro}
        <div class="text-center mb-12 max-w-2xl mx-auto">
          <p>{intro}</p>
        </div>
      {/if}
      {@render children()}
    </div>
  </div>
</section>
<hr class="divider" />
