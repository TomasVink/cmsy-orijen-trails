const BUNNY_API_KEY = process.env.BUNNY_API_KEY
const BUNNY_PULLZONE_ID = process.env.BUNNY_PULLZONE_ID
const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL

const LOCALES = ['nl', 'en']

async function purgeUrl(url: string): Promise<void> {
  await fetch(`https://api.bunny.net/purge?url=${encodeURIComponent(url)}&async=false`, {
    method: 'POST',
    headers: { AccessKey: BUNNY_API_KEY! },
  })
}

export async function purgePageCache(slugsByLocale: Record<string, string>): Promise<void> {
  if (!BUNNY_API_KEY || !WEB_URL) return
  await Promise.all(
    Object.entries(slugsByLocale).map(([locale, slug]) => {
      const url = slug === 'home' ? `${WEB_URL}/${locale}` : `${WEB_URL}/${locale}/${slug}`
      return purgeUrl(url)
    }),
  )
}

export async function purgePostCache(slugsByLocale: Record<string, string>): Promise<void> {
  if (!BUNNY_API_KEY || !WEB_URL) return
  const urls: string[] = LOCALES.map(locale => `${WEB_URL}/${locale}/blog`)
  Object.entries(slugsByLocale).forEach(([locale, slug]) => {
    urls.push(`${WEB_URL}/${locale}/blog/${slug}`)
  })
  await Promise.all(urls.map(purgeUrl))
}

export async function purgeTrailCache(id: string): Promise<void> {
  if (!BUNNY_API_KEY || !WEB_URL) return
  const urls = [
    // API list endpoint (fetched client-side by the map)
    `${WEB_URL}/api/trails*`,
    ...LOCALES.flatMap(locale => [
      `${WEB_URL}/${locale}/trails`,
      `${WEB_URL}/${locale}/trails/${id}`,
    ]),
  ]
  await Promise.all(urls.map(purgeUrl))
}

export async function purgeAllCache(): Promise<void> {
  if (!BUNNY_API_KEY || !BUNNY_PULLZONE_ID) return
  await fetch(`https://api.bunny.net/pullzone/${BUNNY_PULLZONE_ID}/purgeCache`, {
    method: 'POST',
    headers: { AccessKey: BUNNY_API_KEY },
  })
}
