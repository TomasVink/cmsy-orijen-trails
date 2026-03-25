/**
 * Next.js instrumentation hook — runs once when the server process starts,
 * before any requests are handled.
 *
 * Runs pending Payload migrations automatically so the database schema is
 * always up-to-date without a separate migration step in the deployment
 * pipeline. Migrations are idempotent — already-applied ones are skipped.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { getPayload } = await import('payload')
    const { default: config } = await import('@payload-config')

    const payload = await getPayload({ config })
    try {
      await payload.db.migrate()
    } catch (err) {
      payload.logger.error({ err }, 'Database migration failed — server will not start')
      process.exit(1)
    }
  }
}
