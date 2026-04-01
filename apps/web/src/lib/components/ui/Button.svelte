<script lang="ts">
  import type { Snippet } from 'svelte'

  type Props = {
    href?: string
    onclick?: () => void
    variant?: 'primary' | 'outline' | 'ghost'
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    class?: string
    children: Snippet
  }

  let {
    href,
    onclick,
    variant = 'primary',
    type = 'button',
    disabled = false,
    class: className = '',
    children,
  }: Props = $props()

  const base =
    'inline-flex items-center justify-center gap-2 font-sans font-bold uppercase tracking-widest text-sm px-6 py-3 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

  const variants = {
    primary: 'bg-orijen-red text-white hover:bg-black focus-visible:ring-orijen-red',
    outline: 'border-2 border-orijen-red text-orijen-red hover:bg-orijen-red hover:text-white focus-visible:ring-orijen-red',
    ghost: 'text-orijen-red hover:underline underline-offset-4',
  }

  const classes = `${base} ${variants[variant]} ${className}`
</script>

{#if href}
  <a {href} class={classes}>
    {@render children()}
  </a>
{:else}
  <button {type} {onclick} {disabled} class={classes}>
    {@render children()}
  </button>
{/if}
