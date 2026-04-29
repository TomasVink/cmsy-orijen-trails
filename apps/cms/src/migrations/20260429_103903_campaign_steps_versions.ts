import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_campaign_steps_version" AS ENUM('map', 'rectangles');
  ALTER TABLE "pages_blocks_campaign_steps_steps" ADD COLUMN "image_id" integer;
  ALTER TABLE "pages_blocks_campaign_steps" ADD COLUMN "version" "enum_pages_blocks_campaign_steps_version" DEFAULT 'map';
  ALTER TABLE "pages_blocks_campaign_steps_steps" ADD CONSTRAINT "pages_blocks_campaign_steps_steps_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_campaign_steps_steps_image_idx" ON "pages_blocks_campaign_steps_steps" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_campaign_steps_steps" DROP CONSTRAINT "pages_blocks_campaign_steps_steps_image_id_media_id_fk";
  
  DROP INDEX "pages_blocks_campaign_steps_steps_image_idx";
  ALTER TABLE "pages_blocks_campaign_steps_steps" DROP COLUMN "image_id";
  ALTER TABLE "pages_blocks_campaign_steps" DROP COLUMN "version";
  DROP TYPE "public"."enum_pages_blocks_campaign_steps_version";`)
}
