'use client'

import { useEffect, useState } from 'react'

interface Project {
  name: string
  slug: string
  payload_url: string
}

interface TopBarData {
  email: string
  projects: Project[]
  currentProject: { name: string; payload_url: string } | null
}

const PLATFORM_URL = process.env.NEXT_PUBLIC_CMS_PLATFORM_URL

function signOut() {
  window.location.href = '/api/users/logto-logout'
}

export default function TopBar() {
  const [data, setData] = useState<TopBarData | null>(null)

  useEffect(() => {
    fetch('/api/users/topbar')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setData(d))
      .catch(() => {})
  }, [])

  const showProjects = data && data.projects.length > 0
  const selectedUrl = data?.currentProject?.payload_url ?? data?.projects[0]?.payload_url ?? ''

  return (
    <nav
      style={{
        position: 'fixed',
        width: '100vw',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        fontFamily: 'system-ui, sans-serif',
        fontSize: 14,
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <a
          href={PLATFORM_URL ?? '/'}
          style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
        >
          <img src="/cmsy_logo.svg" alt="cmsy logo" style={{ height: 32 }} />
          <span style={{ fontWeight: 600, color: '#111827' }}>cmsy</span>
        </a>
        {showProjects && (
          <>
            <span style={{ color: '#d1d5db', fontWeight: 400, fontSize: 18, lineHeight: 1 }}>/</span>
            {data.projects.length > 1 ? (
              <select
                value={selectedUrl}
                onChange={(e) => {
                  window.location.href = e.target.value
                }}
                style={{
                  background: 'transparent',
                  color: '#111827',
                  border: 'none',
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: 'system-ui, sans-serif',
                  cursor: 'pointer',
                  padding: 0,
                  appearance: 'auto',
                }}
              >
                {data.projects.map((p) => (
                  <option key={p.slug} value={p.payload_url}>
                    {p.name}
                  </option>
                ))}
              </select>
            ) : (
              <span style={{ fontWeight: 600, color: '#111827' }}>{data.projects[0].name}</span>
            )}
          </>
        )}
      </div>
      {data && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 14, color: '#4b5563' }}>
          <span>{data.email}</span>
          <button
            onClick={signOut}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              fontSize: 14,
              color: '#6b7280',
              cursor: 'pointer',
              fontFamily: 'system-ui, sans-serif',
            }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#111827' }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#6b7280' }}
          >
            Sign out
          </button>
        </div>
      )}
    </nav>
  )
}
