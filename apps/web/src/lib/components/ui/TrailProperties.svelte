<script lang="ts">
  import type { Trail } from '@repo/payload-types'
  import Icon from './Icon.svelte'
  import { ICONS } from '$lib/icons'
  import type { TrailLabelsData, Locale } from '$lib/payload'
  import { getTrailLabels } from '$lib/payload'
  import { page } from '$app/state'

  type Props = {
    trail: Trail
  }

  let { trail }: Props = $props()

  const labelsFromPage = $derived(page.data.trailLabels as TrailLabelsData | null)

  let fetchedLabels = $state<TrailLabelsData | null>(null)

  $effect(() => {
    if (!labelsFromPage) {
      const locale = (page.params.locale as Locale) ?? 'nl'
      getTrailLabels(fetch, undefined, locale).then((result) => {
        fetchedLabels = result
      })
    }
  })

  const labels = $derived(labelsFromPage ?? fetchedLabels)

  const properties: Array<{
    name: keyof Trail
    icon: keyof typeof ICONS
    label?: string
    labelsKey?: keyof TrailLabelsData
  }> = [
    { name: 'distance', icon: 'route', label: '%s km' },
    { name: 'difficulty', icon: 'terrain' },
    { name: 'offLeashArea', icon: 'pets', labelsKey: 'offLeash' },
    { name: 'hospitality', icon: 'restaurant' },
    { name: 'water', icon: 'water' }
  ]
</script>

{#each properties as property}
  {#if trail[property.name]}
    {@const value = trail[property.name]}
    {@const labelEntry = (labels as Record<string, unknown> | null)?.[
      property.labelsKey ?? property.name
    ]}
    {@const labelText = property.label
      ? property.label.replace('%s', String(value))
      : typeof labelEntry === 'object' && labelEntry !== null
        ? ((labelEntry as Record<string, string>)[String(value)] ?? String(value))
        : String(labelEntry ?? value)}
    <span class="flex items-center gap-2">
      <Icon name={property.icon as keyof typeof ICONS} />
      <span class="font-display text-xl text-white">{labelText}</span>
    </span>
  {/if}
{/each}
