import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_submit_trail_locales"
    ALTER COLUMN "intro" TYPE varchar USING CASE WHEN intro IS NULL THEN NULL ELSE intro::text END;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_submit_trail_locales"
    ALTER COLUMN "intro" TYPE jsonb USING CASE WHEN intro IS NULL THEN NULL ELSE to_jsonb(intro) END;`)
}
