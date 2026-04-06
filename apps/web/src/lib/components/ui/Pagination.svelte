<script lang="ts">
  type Props = {
    currentPage: number
    totalPages: number
    buildUrl: (page: number) => string
  }

  let { currentPage, totalPages, buildUrl }: Props = $props()

  const pages = $derived(
    Array.from({ length: totalPages }, (_, i) => i + 1).filter(
      (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2,
    ),
  )

  function pagesWithEllipsis(pages: number[]): (number | '...')[] {
    const result: (number | '...')[] = []
    for (let i = 0; i < pages.length; i++) {
      if (i > 0 && pages[i] - pages[i - 1] > 1) result.push('...')
      result.push(pages[i])
    }
    return result
  }
</script>

{#if totalPages > 1}
  <nav class="flex items-center justify-center gap-1 mt-12" aria-label="Pagination">
    {#if currentPage > 1}
      <a
        href={buildUrl(currentPage - 1)}
        class="px-3 py-2 border border-orijen-gray/30 text-sm hover:border-orijen-red hover:text-orijen-red transition-colors"
        aria-label="Previous page"
      >
        ←
      </a>
    {/if}

    {#each pagesWithEllipsis(pages) as item}
      {#if item === '...'}
        <span class="px-3 py-2 text-orijen-gray text-sm">…</span>
      {:else}
        <a
          href={buildUrl(item)}
          class="px-3 py-2 border text-sm transition-colors {item === currentPage
            ? 'border-orijen-red bg-orijen-red text-white'
            : 'border-orijen-gray/30 hover:border-orijen-red hover:text-orijen-red'}"
          aria-current={item === currentPage ? 'page' : undefined}
        >
          {item}
        </a>
      {/if}
    {/each}

    {#if currentPage < totalPages}
      <a
        href={buildUrl(currentPage + 1)}
        class="px-3 py-2 border border-orijen-gray/30 text-sm hover:border-orijen-red hover:text-orijen-red transition-colors"
        aria-label="Next page"
      >
        →
      </a>
    {/if}
  </nav>
{/if}
