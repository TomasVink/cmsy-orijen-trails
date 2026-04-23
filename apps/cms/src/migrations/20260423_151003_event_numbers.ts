import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "registrations" ADD COLUMN "people" numeric;
  ALTER TABLE "registrations" ADD COLUMN "dogs" numeric;
  ALTER TABLE "registrations" ADD COLUMN "other" numeric;
  ALTER TABLE "trail_labels_locales" ADD COLUMN "form_link_label" varchar;
  ALTER TABLE "trail_labels_locales" ADD COLUMN "form_link_placeholder" varchar;
  ALTER TABLE "sign_up_labels_locales" ADD COLUMN "people_label" varchar;
  ALTER TABLE "sign_up_labels_locales" ADD COLUMN "dogs_label" varchar;
  ALTER TABLE "sign_up_labels_locales" ADD COLUMN "other_label" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "registrations" DROP COLUMN "people";
  ALTER TABLE "registrations" DROP COLUMN "dogs";
  ALTER TABLE "registrations" DROP COLUMN "other";
  ALTER TABLE "trail_labels_locales" DROP COLUMN "form_link_label";
  ALTER TABLE "trail_labels_locales" DROP COLUMN "form_link_placeholder";
  ALTER TABLE "sign_up_labels_locales" DROP COLUMN "people_label";
  ALTER TABLE "sign_up_labels_locales" DROP COLUMN "dogs_label";
  ALTER TABLE "sign_up_labels_locales" DROP COLUMN "other_label";`)
}
