<script lang="ts">
  import type { PageData } from './$types'
  import type { Media } from '$lib/payload'
  import RichText from '$lib/components/ui/RichText.svelte'
  import PageHeader from '$lib/components/ui/PageHeader.svelte'
  import RelatedContent from '$lib/components/ui/RelatedContent.svelte'

  let { data }: { data: PageData } = $props()

  const post = $derived(data.post)
</script>

<PageHeader image={post.header as Media} title={post.title} />

<div class="container mx-auto max-w-6xl py-12">
  <div class="flex flex-col lg:flex-row gap-12">
    <!-- Main content-->
    <div class="lg:w-3/4 px-4">
      <RichText
        content={post.content}
        class="prose-invert prose-headings:font-display prose-headings:uppercase"
      />
    </div>

    <!-- Sidebar -->
    <div class="lg:w-1/4 px-4">
      <RelatedContent related={post.related} />
    </div>
  </div>
</div>
