import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = await cookies()
  cookieStore.delete('payload-token')

  const logtoEndpoint = process.env.LOGTO_ENDPOINT
  const postLogoutRedirect = process.env.NEXT_PUBLIC_CMS_PLATFORM_URL ?? '/'

  if (logtoEndpoint) {
    const params = new URLSearchParams({ post_logout_redirect_uri: postLogoutRedirect })
    return NextResponse.redirect(`${logtoEndpoint}/oidc/session/end?${params}`, 302)
  }

  return NextResponse.redirect(postLogoutRedirect, 302)
}
