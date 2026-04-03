<script lang="ts">
  type Props = {
    name: string;
    label: string;
    checked?: boolean;
  };

  let { name, label, checked = $bindable(false) }: Props = $props();
</script>

<label class="flex items-center gap-3 cursor-pointer">
  <input
    type="checkbox"
    {name}
    bind:checked
    class="size-4 accent-orijen-red"
  />
  <span class="font-sans text-sm text-black">{label}</span>
</label>
