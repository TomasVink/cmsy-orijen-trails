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

<section {id} class="section-bordered py-16 px-4 {className}">
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

<style>
  .section-bordered {
    position: relative;
  }

  .section-bordered::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, var(--color-orijen-red) 50%, transparent 100%);
  }
</style>
