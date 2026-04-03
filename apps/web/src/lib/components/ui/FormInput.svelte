<script lang="ts">
  type Props = {
    id: string;
    name: string;
    label: string | null | undefined;
    type?: "text" | "email" | "number";
    value?: string | number | undefined;
    error?: string | string[] | undefined;
    labelSuffix?: string;
    rows?: never;
    [key: string]: unknown;
  };

  type TextareaProps = {
    id: string;
    name: string;
    label: string | null | undefined;
    type: "textarea";
    value?: string | undefined;
    error?: string | string[] | undefined;
    labelSuffix?: string;
    rows?: number;
    [key: string]: unknown;
  };

  let {
    id,
    name,
    label,
    type = "text",
    value = $bindable(undefined),
    error,
    labelSuffix,
    rows = 3,
    ...rest
  }: Props | TextareaProps = $props();

  const labelBase =
    "text-sm   font-bold uppercase tracking-widest text-orijen-black/80 mb-1";
  const fieldBase =
    "w-full border-2 border-orijen-gray/30 bg-white px-4 py-3 font-sans text-sm text-black focus:outline-none focus:border-orijen-red transition-colors";
  const errorClass = "mt-1 font-sans text-xs text-orijen-red";
</script>

<div>
  <label class={labelBase} for={id}>
    {label}
    {#if labelSuffix}<span class="normal-case font-normal">{labelSuffix}</span
      >{/if}
  </label>
  {#if type === "textarea"}
    <textarea
      {id}
      {name}
      {rows}
      bind:value={value as string}
      class="{fieldBase} resize-none"
      {...rest}
    ></textarea>
  {:else}
    <input {id} {type} {name} bind:value class={fieldBase} {...rest} />
  {/if}
  {#if error}<p class={errorClass}>{error}</p>{/if}
</div>
