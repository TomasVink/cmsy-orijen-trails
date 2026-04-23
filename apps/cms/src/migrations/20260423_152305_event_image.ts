import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "events" ADD COLUMN "header_id" integer;
  ALTER TABLE "events" ADD CONSTRAINT "events_header_id_media_id_fk" FOREIGN KEY ("header_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "events_header_idx" ON "events" USING btree ("header_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "events" DROP CONSTRAINT "events_header_id_media_id_fk";
  
  DROP INDEX "events_header_idx";
  ALTER TABLE "events" DROP COLUMN "header_id";`)
}
