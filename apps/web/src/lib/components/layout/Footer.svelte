<script lang="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    const script = document.createElement('script');
    script.src = 'https://footer.mars.com/js/footer.js.aspx?stage-orijen-trails-cmsy';
    document.body.appendChild(script);
  });
</script>

<footer class="bg-black text-white py-12 px-4 mt-16">
  <div class="max-w-6xl mx-auto">
    <div class="flex flex-col md:flex-row justify-between gap-8">
      <div>
        <p class="font-display text-2xl uppercase leading-none">
          ORIJEN <span class="text-orijen-red">Trails</span>
        </p>
        <p class="text-sm text-white/50 mt-2 font-sans">Biologically Appropriate™</p>
      </div>

      <nav class="flex flex-col gap-2">
        <p class="text-xs font-sans uppercase tracking-widest text-white/40 mb-1">Links</p>
        <a href="/#trails" class="text-sm text-white/70 hover:text-white transition-colors">Trails</a>
        <a href="/#submit" class="text-sm text-white/70 hover:text-white transition-colors">Submit a trail</a>
        <a href="/#blog" class="text-sm text-white/70 hover:text-white transition-colors">Blog</a>
      </nav>

      <nav class="flex flex-col gap-2">
        <p class="text-xs font-sans uppercase tracking-widest text-white/40 mb-1">ORIJEN</p>
        <a href="https://www.orijen.com" target="_blank" rel="noreferrer" class="text-sm text-white/70 hover:text-white transition-colors">orijen.com</a>
      </nav>
    </div>

    <div class="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between gap-2 text-xs text-white/30 font-sans">
      <p>© {new Date().getFullYear()} Champion Petfoods. All rights reserved.</p>
      <div class="flex gap-4">
        <a href="/privacy" class="hover:text-white/60 transition-colors">Privacy</a>
        <a href="/terms" class="hover:text-white/60 transition-colors">Terms</a>
        <!-- OneTrust Cookies Settings button start -->
        <button id="ot-sdk-btn" class="ot-sdk-show-settings hover:text-white/60 transition-colors">Cookie-instellingen</button>
        <!-- OneTrust Cookies Settings button end -->
      </div>
    </div>
  </div>
</footer>
