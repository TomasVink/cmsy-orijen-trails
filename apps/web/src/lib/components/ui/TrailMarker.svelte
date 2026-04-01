<script lang="ts">
  type Props = { selected?: boolean };
  let { selected = false }: Props = $props();
</script>

<div
  class="rounded-full border-[2.5px] border-white shadow cursor-pointer transition-all duration-150 hover:scale-110 size-8"
  class:bg-orijen-black={!selected}
  class:bg-orijen-red={selected}
></div>
