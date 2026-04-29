<script lang="ts">
  import { onMount } from 'svelte'
  import { page } from '$app/state'
  import Icon from '$lib/components/ui/Icon.svelte'
  import type { NavItemsData } from '$lib/payload'

  onMount(() => {
    const script = document.createElement('script')
    script.src = 'https://footer.mars.com/js/footer.js.aspx?stage-orijen-trails-cmsy'
    document.body.appendChild(script)
  })

  const navItems = $derived(page.data.navItems as NavItemsData | null)
  const socials = $derived(navItems?.socials ?? [])
</script>

<footer class="">
  {#if socials.length > 0}
    <div class="max-w-6xl mx-auto flex justify-center gap-8 pt-6">
      {#each socials as social}
        <a
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.platform}
          class="text-white hover:text-orijen-red transition-colors"
        >
          <Icon name={social.platform} class="size-10" />
        </a>
      {/each}
    </div>
  {/if}
  <div class="max-w-6xl mx-auto text-xs text-white/30 text-center">
    <!-- OneTrust Cookies Settings button start -->
    <button id="ot-sdk-btn" class="ot-sdk-show-settings hover:text-white/60 transition-colors my-4"
      >Cookie-instellingen</button
    >
    <!-- OneTrust Cookies Settings button end -->
  </div>
</footer>
