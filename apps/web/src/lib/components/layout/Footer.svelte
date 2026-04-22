<script lang="ts">
  import { onMount } from 'svelte'

  onMount(() => {
    const script = document.createElement('script')
    script.src = 'https://footer.mars.com/js/footer.js.aspx?stage-orijen-trails-cmsy'
    document.body.appendChild(script)
  })
</script>

<footer class="">
  <div class="max-w-6xl mx-auto text-xs text-white/30 text-center mt-6">
    <!-- OneTrust Cookies Settings button start -->
    <button id="ot-sdk-btn" class="ot-sdk-show-settings hover:text-white/60 transition-colors"
      >Cookie-instellingen</button
    >
    <!-- OneTrust Cookies Settings button end -->
  </div>
</footer>
