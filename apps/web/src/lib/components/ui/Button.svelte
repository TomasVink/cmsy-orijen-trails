<script lang="ts">
  import type { Snippet } from "svelte";
  import Icon from "./Icon.svelte";

  type Props = {
    href?: string;
    target?: string;
    onclick?: () => void;
    variant?: "primary" | "outline" | "ghost";
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    class?: string;
    icon?: string;
    children: Snippet;
  };

  let {
    href,
    target,
    onclick,
    variant = "primary",
    type = "button",
    disabled = false,
    class: className = "",
    icon,
    children,
  }: Props = $props();

  const base =
    "inline-flex items-center justify-center gap-2 font-display font-bold uppercase tracking-widest text-xl px-6 py-3 transition duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const variants = {
    primary:
      "bg-orijen-red text-white hover:bg-black focus-visible:ring-orijen-red",
    outline: "border-3 border-white text-white hover:bg-white hover:text-black",
    ghost: "text-orijen-red hover:underline underline-offset-4",
  };

  const classes = `${base} ${variants[variant]} ${className}`;
</script>

{#if href}
  <a {href} {target} class={classes}>
    {#if icon}<Icon name={icon} />{/if}
    {@render children()}
  </a>
{:else}
  <button {type} {onclick} {disabled} class={classes}>
    {#if icon}<Icon name={icon} />{/if}
    {@render children()}
  </button>
{/if}
