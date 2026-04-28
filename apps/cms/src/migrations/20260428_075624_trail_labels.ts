import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "trail_labels_locales" ADD COLUMN "approved_trail" varchar DEFAULT 'Orijen Approved Trail';
  ALTER TABLE "trail_labels_locales" ADD COLUMN "community_trail" varchar DEFAULT 'Community Route';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "trail_labels_locales" DROP COLUMN "approved_trail";
  ALTER TABLE "trail_labels_locales" DROP COLUMN "community_trail";`)
}
