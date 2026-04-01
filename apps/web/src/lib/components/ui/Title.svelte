<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    children: Snippet;
  };

  let { children }: Props = $props();
</script>

<div class="flex items-center flex-col">
  <h2 class="font-display text-5xl md:text-6xl uppercase leading-none">
    {@render children()}
  </h2>
  <hr class="border-2 border-orijen-red w-32 my-3" />
</div>
