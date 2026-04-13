<script lang="ts">
  import type { PageData } from "./$types";
  import { useLivePreview } from "$lib/stores/live-preview.svelte.ts";
  import { env } from "$env/dynamic/public";
  import type { Page } from "@repo/payload-types";
  import BlockRenderer from "$lib/components/BlockRenderer.svelte";

  let { data }: { data: PageData } = $props();

  const preview = useLivePreview<Page>({
    get initialData() { return data.page as Page },
    serverURL: env.PUBLIC_PAYLOAD_URL,
  });
</script>

<svelte:head>
  <title
    >{preview.data?.seo?.title ?? preview.data?.title ?? "ORIJEN Trails"}</title
  >
  {#if preview.data?.seo?.description}
    <meta name="description" content={preview.data.seo.description} />
  {/if}
</svelte:head>

{#if preview.isLoading}
  <div class="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
    <span
      class="font-sans text-sm text-orijen-gray uppercase tracking-widest animate-pulse"
    >
      Connecting to live preview…
    </span>
  </div>
{/if}

{#if preview.data?.layout?.length}
  <BlockRenderer blocks={preview.data.layout} form={data.form} signUpForm={data.signUpForm} patchRequestForm={data.patchRequestForm} events={data.events} />
{:else if !data.page}
  <div class="min-h-screen flex items-center justify-center">
    <p class="font-sans text-orijen-gray">
      No home page found — create a page with slug <code
        class="font-mono text-sm bg-black/5 px-1">home</code
      > in the CMS.
    </p>
  </div>
{/if}
