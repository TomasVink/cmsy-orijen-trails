<script lang="ts">
  import type { Snippet } from 'svelte'

  type Props = {
    id?: string
    class?: string
    children: Snippet
  }

  let { id, class: className = '', children }: Props = $props()
</script>

<section {id} class="py-16 px-4 {className}">
  <div class="max-w-6xl mx-auto">
    {@render children()}
  </div>
</section>
