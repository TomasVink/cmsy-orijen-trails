<script lang="ts">
  // Renders Payload Lexical rich text content as HTML.
  import { env } from '$env/dynamic/public'
  import ImageModal from '$lib/components/ui/ImageModal.svelte'

  type MediaValue = {
    url?: string
    filename?: string
    alt?: string
    width?: number
    height?: number
  }

  type LexicalNode = {
    type: string
    text?: string
    format?: number | string
    tag?: string
    url?: string
    listType?: string
    children?: LexicalNode[]
    value?: MediaValue | string | number
  }

  type LexicalContent = {
    root: LexicalNode
    [k: string]: unknown
  }

  type Props = {
    content: LexicalContent | null | undefined
    class?: string
  }

  let { content, class: className = '' }: Props = $props()

  let modalOpen = $state(false)
  let modalImages = $state<{ src: string; alt?: string }[]>([])

  function handleClick(e: MouseEvent) {
    const target = e.target as HTMLElement
    if (target.tagName !== 'IMG') return
    const src = target.getAttribute('src')
    if (!src) return
    modalImages = [{ src, alt: target.getAttribute('alt') ?? '' }]
    modalOpen = true
  }

  const headingClass: Record<string, string> = {
    h2: 'text-2xl',
    h3: 'text-xl'
  }

  function renderNode(node: LexicalNode): string {
    const children = () => (node.children ?? []).map(renderNode).join('')

    switch (node.type) {
      case 'root':
        return children()
      case 'paragraph':
        return `<p class='my-4'>${children()}</p>`
      case 'heading':
        return `<${node.tag} class=${headingClass[node.tag as string] ?? ''}>${children()}</${node.tag}>`
      case 'text': {
        if (!node.text) return ''
        let t = node.text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        const fmt = typeof node.format === 'number' ? node.format : 0
        if (fmt & 1) t = `<strong>${t}</strong>`
        if (fmt & 2) t = `<em>${t}</em>`
        if (fmt & 8) t = `<u>${t}</u>`
        if (fmt & 4) t = `<s>${t}</s>`
        if (fmt & 16) t = `<code>${t}</code>`
        return t
      }
      case 'link':
        return `<a href="${node.url}">${children()}</a>`
      case 'list': {
        const tag = node.listType === 'number' ? 'ol' : 'ul'
        return `<${tag}>${children()}</${tag}>`
      }
      case 'listitem':
        return `<li>${children()}</li>`
      case 'quote':
        return `<blockquote>${children()}</blockquote>`
      case 'upload': {
        const raw = node.value
        const img: MediaValue | undefined =
          typeof raw === 'object' && raw !== null ? (raw as MediaValue) : undefined
        if (!img) return ''
        let src = img.url ?? ''
        if (!src && img.filename) {
          src = `${env.PUBLIC_PAYLOAD_URL}/api/media/file/${img.filename}`
        } else if (src && !src.startsWith('http')) {
          src = `${env.PUBLIC_PAYLOAD_URL}${src}`
        }
        if (!src) return ''
        const alt = img.alt ? img.alt.replace(/"/g, '&quot;') : ''
        const width = img.width ? ` width="${img.width}"` : ''
        const height = img.height ? ` height="${img.height}"` : ''
        return `<div class="my-8 cursor-zoom-in"><img src="${src}" alt="${alt}"${width}${height} class="max-w-2xl w-full h-auto mx-auto"></div>`
      }
      case 'horizontalrule':
        return '<hr>'
      case 'linebreak':
        return '<br>'
      default:
        return children()
    }
  }

  const html = $derived(content?.root ? renderNode(content.root) : '')
</script>

{#if html}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="prose max-w-none {className}" onclick={handleClick}>
    {@html html}
  </div>
{/if}

<ImageModal images={modalImages} bind:open={modalOpen} />
