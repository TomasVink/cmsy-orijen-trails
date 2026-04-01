<script lang="ts">
  import type { Snippet } from "svelte";
  import Title from "./Title.svelte";

  type Props = {
    id?: string;
    class?: string;
    children: Snippet;
    title?: string;
    intro?: string;
  };

  let { id, class: className = "", children, title, intro }: Props = $props();
</script>

<section {id} class="py-16 px-4 {className}">
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-12 max-w-2xl mx-auto">
      {#if title}
        <Title>{title}</Title>
      {/if}
      {#if intro}
        <p>{intro}</p>
      {/if}
    </div>
    {@render children()}
  </div>
</section>
