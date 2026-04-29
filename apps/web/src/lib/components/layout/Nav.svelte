<script lang="ts">
  import { page } from '$app/stores'
  import { slide } from 'svelte/transition'
  import Icon from '$lib/components/ui/Icon.svelte'
  import type { UiLabelsData, NavItemsData } from '$lib/payload'
  import { LOCALES } from '$lib/locales'

  const locale = $derived($page.params.locale ?? 'nl')

  const isRoot = $derived(
    $page.url.pathname === `/${locale}` || $page.url.pathname === `/${locale}/`
  )

  const backHref = $derived(`/${locale}`)
  const uiLabels = $derived($page.data.uiLabels as UiLabelsData | null)
  const navItems = $derived($page.data.navItems as NavItemsData | null)

  const items = $derived(navItems?.items ?? [])
  const highlightedLink = $derived(navItems?.highlightedLink ?? null)
  const logoLink = $derived(navItems?.logoLink ?? 'https://emea.orijenpetfoods.com')

  function resolveHref(url: string | null | undefined): string {
    if (!url) return '#'
    return url.startsWith('/') ? `/${locale}${url}` : url
  }

  function localeSwitchHref(target: string): string {
    const { pathname } = $page.url
    const segments = pathname.split('/')
    if (LOCALES.includes(segments[1])) {
      segments[1] = target
    }
    return segments.join('/')
  }

  let menuOpen = $state(false)
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
  <!-- Desktop: bar is h-15 (half the logo), logo overflows below -->
  <div class="hidden xl:flex items-start h-15 overflow-visible bg-orijen-black pointer-events-auto">
    <!-- Back button — left, outside container -->
    <div class="h-full flex items-center px-4 {isRoot ? 'invisible' : ''}">
      <a
        href={backHref}
        class="flex items-center gap-1 text-white uppercase tracking-widest text-sm font-bold whitespace-nowrap"
      >
        <Icon name="arrow-left" class="size-6" />
        <span>{uiLabels?.back ?? 'Back'}</span>
      </a>
    </div>

    <!-- Container: logo | links | highlighted -->
    <div class="max-w-6xl w-full mx-auto flex items-start">
      <!-- Logo is h-30, bar is h-15 — bottom half hangs below the bar -->
      <a
        href={logoLink}
        class="bg-orijen-red w-30 h-30 flex shrink-0 items-center justify-center p-1"
      >
        <img src="/logo.svg" alt="Orijen" class="invert w-full h-full object-contain" />
      </a>

      <div class="h-15 flex items-center gap-4 px-6">
        {#each items as item}
          <a
            href={resolveHref(item.url)}
            target={item.openInNewTab ? '_blank' : undefined}
            rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
            class="text-white tracking-widest uppercase font-bold text-2xl font-display hover:text-white/70 transition-colors whitespace-nowrap"
          >
            {item.label}
          </a>
        {/each}
      </div>

      {#if highlightedLink}
        <div class="ml-auto h-15 flex items-stretch">
          <a
            href={resolveHref(highlightedLink.url)}
            target={highlightedLink.openInNewTab ? '_blank' : undefined}
            rel={highlightedLink.openInNewTab ? 'noopener noreferrer' : undefined}
            class="bg-orijen-red px-8 flex items-center text-white uppercase text-2xl font-display font-bold hover:brightness-110 transition-all whitespace-nowrap"
          >
            {highlightedLink.label}
          </a>
        </div>
      {/if}
    </div>

    <!-- Language switch — right, outside container -->
    {#if LOCALES.length > 1}
      <div class="h-full flex items-center px-4">
        <div class="flex items-center gap-3 text-white uppercase tracking-widest text-sm">
          {#each LOCALES as loc}
            {#if loc === locale}
              <span class="font-bold">{loc}</span>
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

  <!-- Mobile -->
  <div class="xl:hidden">
    <div class="relative h-15 overflow-visible flex items-start justify-center bg-orijen-black">
      <!-- Logo is h-30, bar is h-15 — bottom half hangs below the bar -->
      <a
        href="/{locale}"
        class="pointer-events-auto relative z-10 bg-orijen-red flex shrink-0 items-center justify-center p-1 transition-all duration-300 ease-in-out {scrolled ||
        menuOpen
          ? 'w-15 h-15'
          : 'w-30 h-30'}"
      >
        <img src="/logo.svg" alt="Orijen" class="invert w-full h-full object-contain" />
      </a>

      <!-- Back button — absolute left -->
      <div
        class="absolute left-0 top-0 h-15 flex items-center px-2 pointer-events-auto {isRoot
          ? 'invisible'
          : ''}"
      >
        <a
          href={backHref}
          class="flex items-center gap-1 text-white uppercase tracking-widest text-sm font-bold"
        >
          <Icon name="arrow-left" class="size-6" />
          <span>{uiLabels?.back ?? 'Back'}</span>
        </a>
      </div>

      <!-- Hamburger — absolute right -->
      <div class="absolute right-0 top-0 h-15 flex items-center px-2 pointer-events-auto">
        <button
          onclick={() => (menuOpen = !menuOpen)}
          class="text-white p-2 size-12"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <Icon name={menuOpen ? 'close' : 'menu'} class="size-8" />
        </button>
      </div>
    </div>

    <!-- Mobile dropdown menu -->
    {#if menuOpen}
      <div transition:slide={{ duration: 300 }} class="pointer-events-auto bg-orijen-black">
        {#if LOCALES.length > 1}
          <div
            class="flex items-center gap-4 px-6 py-4 border-b border-white/10 text-white uppercase tracking-widest text-sm"
          >
            {#each LOCALES as loc}
              {#if loc === locale}
                <span class="font-bold">{loc}</span>
              {:else}
                <a
                  href={localeSwitchHref(loc)}
                  class="opacity-50 hover:opacity-100 transition-opacity">{loc}</a
                >
              {/if}
            {/each}
          </div>
        {/if}
        {#each items as item}
          <a
            href={resolveHref(item.url)}
            target={item.openInNewTab ? '_blank' : undefined}
            rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
            onclick={() => (menuOpen = false)}
            class="block px-6 py-4 text-white uppercase tracking-widest text-sm font-bold border-b border-white/10 hover:bg-white/10 transition-colors"
          >
            {item.label}
          </a>
        {/each}
        {#if highlightedLink}
          <a
            href={resolveHref(highlightedLink.url)}
            target={highlightedLink.openInNewTab ? '_blank' : undefined}
            rel={highlightedLink.openInNewTab ? 'noopener noreferrer' : undefined}
            onclick={() => (menuOpen = false)}
            class="block px-6 py-4 text-white uppercase tracking-widest text-sm font-bold bg-orijen-red hover:brightness-110 transition-all"
          >
            {highlightedLink.label}
          </a>
        {/if}
      </div>
    {/if}
  </div>
</nav>
