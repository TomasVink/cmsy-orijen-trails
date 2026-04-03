<script lang="ts">
  import { page } from '$app/stores'
  import Icon from '$lib/components/ui/Icon.svelte'

  const LOCALES = ['nl', 'en']

  const locale = $derived($page.params.locale ?? 'nl')

  const isRoot = $derived(
    $page.url.pathname === `/${locale}` || $page.url.pathname === `/${locale}/`,
  )

  const backHref = $derived(`/${locale}`)

  function localeSwitchHref(target: string): string {
    const { pathname } = $page.url
    const segments = pathname.split('/')
    if (LOCALES.includes(segments[1])) {
      segments[1] = target
    }
    return segments.join('/')
  }
</script>

<nav
  class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 pointer-events-none"
>
  {#if !isRoot}
    <div class="pointer-events-auto bg-orijen-black/60 px-4 py-2">
      <a
        href={backHref}
        class="flex items-center gap-1 text-white uppercase tracking-widest text-sm font-bold"
      >
        <Icon name="arrow-left" class="size-6" />
        <span>Back</span>
      </a>
    </div>
  {:else}
    <span></span>
  {/if}

  <div class="pointer-events-auto bg-orijen-black/60 px-4 py-2">
    <div class="flex items-center gap-3 text-white uppercase tracking-widest text-sm">
      {#each LOCALES as loc}
        {#if loc === locale}
          <span class="opacity-100 font-bold">{loc}</span>
        {:else}
          <a href={localeSwitchHref(loc)} class="opacity-50 hover:opacity-100 transition-opacity"
            >{loc}</a
          >
        {/if}
      {/each}
    </div>
  </div>
</nav>
