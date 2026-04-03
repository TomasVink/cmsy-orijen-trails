<script lang="ts">
  import Icon from "./Icon.svelte";

  type Props = {
    onclick: () => void;
    label?: string;
    class?: string;
  };

  let { onclick, label = "Close", class: className = "" }: Props = $props();
</script>

<button
  {onclick}
  class="text-white hover:text-orijen-red transition-colors cursor-pointer {className}"
  aria-label={label}
>
  <Icon name="close" />
</button>
