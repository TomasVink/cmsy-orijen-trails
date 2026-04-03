<script lang="ts" generics="T extends string | undefined = string | undefined">
  import type { Snippet } from "svelte";

  type Props = {
    id: string;
    name: string;
    label: string | null | undefined;
    value?: T;
    error?: string | string[] | undefined;
    children: Snippet;
  };

  let {
    id,
    name,
    label,
    value = $bindable(undefined as unknown as T),
    error,
    children,
  }: Props = $props();

  const labelBase =
    "text-sm   font-bold uppercase tracking-widest text-orijen-black/80 mb-1";
  const fieldBase =
    "w-full border-2 border-orijen-gray/30 bg-white px-4 py-3 font-sans text-sm text-black focus:outline-none focus:border-orijen-red transition-colors";
  const errorClass = "mt-1 font-sans text-xs text-orijen-red";
</script>

<div>
  <label class={labelBase} for={id}>{label}</label>
  <select {id} {name} bind:value class="{fieldBase} appearance-none">
    {@render children()}
  </select>
  {#if error}<p class={errorClass}>{error}</p>{/if}
</div>
