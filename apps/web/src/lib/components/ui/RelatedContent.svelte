<script lang="ts">
  import type { Trail, Post, Influencer, Store } from '$lib/payload'
  import InfluencerCard from './InfluencerCard.svelte'
  import TrailCard from './TrailCard.svelte'
  import PostCard from './PostCard.svelte'
  import StoreCard from './StoreCard.svelte'

  type Related = {
    influencers?: (number | Influencer)[] | null
    trails?: (number | Trail)[] | null
    posts?: (number | Post)[] | null
    stores?: (number | Store)[] | null
  }

  type Props = { related?: Related | null }
  let { related }: Props = $props()

  const influencers = $derived(
    (related?.influencers ?? []).filter((i): i is Influencer => typeof i === 'object')
  )
  const trails = $derived((related?.trails ?? []).filter((t): t is Trail => typeof t === 'object'))
  const posts = $derived((related?.posts ?? []).filter((p): p is Post => typeof p === 'object'))
  const stores = $derived((related?.stores ?? []).filter((s): s is Store => typeof s === 'object'))

  const hasContent = $derived(
    influencers.length > 0 || trails.length > 0 || posts.length > 0 || stores.length > 0
  )
</script>

{#if hasContent}
  <aside class="flex flex-col gap-6">
    {#if influencers.length > 0}
      <div class="flex flex-col gap-2">
        {#each influencers as influencer (influencer.id)}
          <InfluencerCard {influencer} />
        {/each}
      </div>
    {/if}

    {#if stores.length > 0}
      <div class="flex flex-col gap-2">
        {#each stores as store (store.id)}
          <StoreCard {store} />
        {/each}
      </div>
    {/if}

    {#if trails.length > 0}
      <div class="flex flex-col gap-4">
        {#each trails as trail (trail.id)}
          <TrailCard {trail} />
        {/each}
      </div>
    {/if}

    {#if posts.length > 0}
      <div class="flex flex-col gap-4">
        {#each posts as post (post.id)}
          <PostCard {post} />
        {/each}
      </div>
    {/if}
  </aside>
{/if}
