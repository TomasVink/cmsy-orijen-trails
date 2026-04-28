import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "trails" ADD COLUMN "patch_id" integer;
  ALTER TABLE "patches" ADD COLUMN "image_id" integer;
  ALTER TABLE "trail_labels_locales" ADD COLUMN "route_links_c_t_a" varchar;
  ALTER TABLE "trails" ADD CONSTRAINT "trails_patch_id_patches_id_fk" FOREIGN KEY ("patch_id") REFERENCES "public"."patches"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "patches" ADD CONSTRAINT "patches_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "trails_patch_idx" ON "trails" USING btree ("patch_id");
  CREATE INDEX "patches_image_idx" ON "patches" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "trails" DROP CONSTRAINT "trails_patch_id_patches_id_fk";
  
  ALTER TABLE "patches" DROP CONSTRAINT "patches_image_id_media_id_fk";
  
  DROP INDEX "trails_patch_idx";
  DROP INDEX "patches_image_idx";
  ALTER TABLE "trails" DROP COLUMN "patch_id";
  ALTER TABLE "patches" DROP COLUMN "image_id";
  ALTER TABLE "trail_labels_locales" DROP COLUMN "route_links_c_t_a";`)
}
