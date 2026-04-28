<script lang="ts">
  import { page } from '$app/stores'
  import Icon from '$lib/components/ui/Icon.svelte'
  import type { UiLabelsData } from '$lib/payload'
  import { LOCALES } from '$lib/locales'

  const locale = $derived($page.params.locale ?? 'nl')

  const isRoot = $derived(
    $page.url.pathname === `/${locale}` || $page.url.pathname === `/${locale}/`
  )

  const backHref = $derived(`/${locale}`)
  const uiLabels = $derived($page.data.uiLabels as UiLabelsData | null)

  function localeSwitchHref(target: string): string {
    const { pathname } = $page.url
    const segments = pathname.split('/')
    if (LOCALES.includes(segments[1])) {
      segments[1] = target
    }
    return segments.join('/')
  }

  let scrolled = $state(false)

  $effect(() => {
    function onScroll() {
      scrolled = window.scrollY > 0
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  })
</script>

<nav class="fixed top-0 left-0 right-0 z-50 pointer-events-none">
  <!-- Desktop: square left-aligned within max-w-6xl, controls on the right -->

  <div class="hidden xl:flex items-start">
    <div
      class="pointer-events-auto bg-orijen-black/60 m-4 px-4 py-2 {isRoot ? 'invisible' : ''}"
    >
      <a
        href={backHref}
        class="flex items-center gap-1 text-white uppercase tracking-widest text-sm font-bold"
      >
        <Icon name="arrow-left" class="size-6" />
        <span>{uiLabels?.back ?? 'Back'}</span>
      </a>
    </div>
    <div class="hidden md:flex max-w-6xl w-full mx-auto items-start">
      <a
        href="/{locale}"
        class="pointer-events-auto bg-orijen-red w-30 h-30 flex items-center justify-center p-4"
      >
        <img src="/logo.svg" alt="Orijen" class="invert w-full h-full object-contain" />
      </a>
    </div>
    {#if LOCALES.length > 1}
      <div class="pointer-events-auto bg-orijen-black/60 m-4 px-4 py-2">
        <div class="flex items-center gap-3 text-white uppercase tracking-widest text-sm">
          {#each LOCALES as loc}
            {#if loc === locale}
              <span class="opacity-100 font-bold">{loc}</span>
            {:else}
              <a
                href={localeSwitchHref(loc)}
                class="opacity-50 hover:opacity-100 transition-opacity">{loc}</a
              >
            {/if}
          {/each}
        </div>
      </div>
    {/if}
  </div>

  <!-- Mobile: logo centered via flex, back/lang absolutely pinned to edges -->
  <div class="xl:hidden relative flex justify-center">
    <a
      href="/{locale}"
      class="pointer-events-auto bg-orijen-red flex items-center justify-center transition-all duration-300 ease-in-out {scrolled
        ? 'w-15 h-15 p-2'
        : 'w-30 h-30 p-4'}"
    >
      <img src="/logo.svg" alt="Orijen" class="invert w-full h-full object-contain" />
    </a>

    <div class="absolute left-0 top-0 p-2 pointer-events-auto">
      <div class="bg-orijen-black/60 px-4 py-2 {isRoot ? 'invisible' : ''}">
        <a
          href={backHref}
          class="flex items-center gap-1 text-white uppercase tracking-widest text-sm font-bold"
        >
          <Icon name="arrow-left" class="size-6" />
          <span>{uiLabels?.back ?? 'Back'}</span>
        </a>
      </div>
    </div>

    {#if LOCALES.length > 1}
      <div class="absolute right-0 top-0 p-2 pointer-events-auto">
        <div class="bg-orijen-black/60 px-4 py-2">
          <div class="flex items-center gap-3 text-white uppercase tracking-widest text-sm">
            {#each LOCALES as loc}
              {#if loc === locale}
                <span class="opacity-100 font-bold">{loc}</span>
              {:else}
                <a
                  href={localeSwitchHref(loc)}
                  class="opacity-50 hover:opacity-100 transition-opacity">{loc}</a
                >
              {/if}
            {/each}
          </div>
        </div>
      </div>
    {/if}
  </div>
</nav>
