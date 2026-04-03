<script lang="ts">
  import type { PageData } from './$types'
  import type { Media } from '$lib/payload'
  import { mediaUrl } from '$lib/payload'
  import { env } from '$env/dynamic/public'
  import Icon from '$lib/components/ui/Icon.svelte'
  import RichText from '$lib/components/ui/RichText.svelte'
  import PageHeader from '$lib/components/ui/PageHeader.svelte'

  let { data }: { data: PageData } = $props()

  const post = $derived(data.post)
</script>

<PageHeader image={post.header as Media} title={post.title} />

<div class="container mx-auto max-w-4xl py-12">
  <RichText
    content={post.content}
    class="prose-invert prose-headings:font-display prose-headings:uppercase"
  />
</div>
