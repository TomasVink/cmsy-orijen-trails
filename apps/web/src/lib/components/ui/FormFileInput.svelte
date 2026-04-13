<script lang="ts">
  import { env } from '$env/dynamic/public'

  type Props = {
    id: string
    label: string | null | undefined
    error?: string | string[] | undefined
    accept?: string
    uploadedId?: string
  }

  let {
    id,
    label,
    error,
    accept = 'image/*',
    uploadedId = $bindable(undefined),
  }: Props = $props()

  let uploading = $state(false)
  let uploadError = $state<string | null>(null)
  let fileName = $state<string | null>(null)
  let previewUrl = $state<string | null>(null)

  const labelBase = 'text-sm font-bold uppercase tracking-widest text-orijen-black/80 mb-1'
  const fieldBase =
    'w-full border-2 border-orijen-gray/30 bg-white px-4 py-3 font-sans text-sm text-black focus:outline-none focus:border-orijen-red transition-colors file:mr-4 file:border-0 file:bg-orijen-red file:text-white file:px-3 file:py-1 file:font-sans file:text-xs file:uppercase file:tracking-widest file:cursor-pointer'
  const errorClass = 'mt-1 font-sans text-xs text-orijen-red'

  async function handleChange(e: Event) {
    const input = e.target as HTMLInputElement
    const file = input.files?.[0]
    if (!file) {
      uploadedId = undefined
      fileName = null
      return
    }

    uploading = true
    uploadError = null
    fileName = file.name
    uploadedId = undefined
    previewUrl = URL.createObjectURL(file)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch(`${env.PUBLIC_PAYLOAD_URL}/api/user-media`, {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        uploadError = 'Upload failed. Please try again.'
        previewUrl = null
        return
      }

      const data = (await res.json()) as { doc?: { id?: number | string } }
      uploadedId = String(data.doc?.id ?? '')
    } catch {
      uploadError = 'Upload failed. Please try again.'
    } finally {
      uploading = false
    }
  }
</script>

<div>
  <label class={labelBase} for={id}>{label}</label>
  <input
    {id}
    type="file"
    {accept}
    onchange={handleChange}
    disabled={uploading}
    class={fieldBase}
  />
  {#if uploading}
    <div class="mt-2 flex items-center gap-3">
      {#if previewUrl}
        <img src={previewUrl} alt="" class="size-16 object-cover border border-orijen-gray/30 opacity-50" />
      {/if}
      <p class="font-sans text-xs text-orijen-black/60">Uploading…</p>
    </div>
  {:else if previewUrl && uploadedId}
    <div class="mt-2 flex items-center gap-3">
      <img src={previewUrl} alt={fileName ?? ''} class="size-16 object-cover border border-orijen-gray/30" />
      <p class="font-sans text-xs text-orijen-black/60">{fileName}</p>
    </div>
  {/if}
  {#if uploadError}
    <p class={errorClass}>{uploadError}</p>
  {:else if error}
    <p class={errorClass}>{error}</p>
  {/if}
</div>
