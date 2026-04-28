<script lang="ts">
  import '../app.css'
  import Footer from '$lib/components/layout/Footer.svelte'
  import Nav from '$lib/components/layout/Nav.svelte'

  let { children } = $props()
</script>

<Nav />
<div class="md:pt-32 pt-24 min-h-dvh">
  {@render children()}
</div>
<Footer />
