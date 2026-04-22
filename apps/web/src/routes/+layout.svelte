<script lang="ts">
  import '../app.css'
  import Footer from '$lib/components/layout/Footer.svelte'
  import Nav from '$lib/components/layout/Nav.svelte'

  let { children } = $props()
</script>

<Nav />
{@render children()}
<Footer />
