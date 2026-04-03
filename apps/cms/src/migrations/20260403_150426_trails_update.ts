import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_trails_off_leash_area" AS ENUM('fully', 'partial', 'none');
  ALTER TABLE "pages_blocks_submit_trail_locales" RENAME COLUMN "body" TO "intro";
  ALTER TABLE "trails" RENAME COLUMN "featured" TO "community";
  ALTER TABLE "pages_blocks_submit_trail" ADD COLUMN "section_id" varchar NOT NULL;
  ALTER TABLE "pages_blocks_submit_trail_locales" ADD COLUMN "address_label" varchar DEFAULT 'Address / start point';
  ALTER TABLE "pages_blocks_submit_trail_locales" ADD COLUMN "distance_label" varchar DEFAULT 'Distance (km)';
  ALTER TABLE "pages_blocks_submit_trail_locales" ADD COLUMN "off_leash_area_label" varchar DEFAULT 'Off-leash area';
  ALTER TABLE "pages_blocks_submit_trail_locales" ADD COLUMN "hospitality_label" varchar DEFAULT 'Hospitality nearby (café, restaurant, etc.)';
  ALTER TABLE "pages_blocks_submit_trail_locales" ADD COLUMN "water_label" varchar DEFAULT 'Natural water on route (river, lake, sea)';
  ALTER TABLE "pages_blocks_submit_trail_locales" ADD COLUMN "off_leash_area_placeholder" varchar DEFAULT '— select —';
  ALTER TABLE "pages_blocks_submit_trail_locales" ADD COLUMN "off_leash_area_fully_label" varchar DEFAULT 'Fully';
  ALTER TABLE "pages_blocks_submit_trail_locales" ADD COLUMN "off_leash_area_partial_label" varchar DEFAULT 'Partial';
  ALTER TABLE "pages_blocks_submit_trail_locales" ADD COLUMN "off_leash_area_none_label" varchar DEFAULT 'None';
  ALTER TABLE "pages_blocks_submit_trail_locales" ADD COLUMN "success_title" varchar DEFAULT 'Thank you!';
  ALTER TABLE "pages_blocks_submit_trail_locales" ADD COLUMN "success_message" varchar DEFAULT 'Your trail has been submitted and will be reviewed shortly.';
  ALTER TABLE "trails" ADD COLUMN "off_leash_area" "enum_trails_off_leash_area";
  ALTER TABLE "trails" ADD COLUMN "hospitality" boolean;
  ALTER TABLE "trails" ADD COLUMN "water" boolean;
  ALTER TABLE "posts" DROP COLUMN "link";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_submit_trail_locales" ADD COLUMN "body" jsonb;
  ALTER TABLE "posts" ADD COLUMN "link" varchar;
  ALTER TABLE "trails" ADD COLUMN "featured" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_submit_trail" DROP COLUMN "section_id";
  ALTER TABLE "pages_blocks_submit_trail_locales" DROP COLUMN "intro";
  ALTER TABLE "pages_blocks_submit_trail_locales" DROP COLUMN "address_label";
  ALTER TABLE "pages_blocks_submit_trail_locales" DROP COLUMN "distance_label";
  ALTER TABLE "pages_blocks_submit_trail_locales" DROP COLUMN "off_leash_area_label";
  ALTER TABLE "pages_blocks_submit_trail_locales" DROP COLUMN "hospitality_label";
  ALTER TABLE "pages_blocks_submit_trail_locales" DROP COLUMN "water_label";
  ALTER TABLE "pages_blocks_submit_trail_locales" DROP COLUMN "off_leash_area_placeholder";
  ALTER TABLE "pages_blocks_submit_trail_locales" DROP COLUMN "off_leash_area_fully_label";
  ALTER TABLE "pages_blocks_submit_trail_locales" DROP COLUMN "off_leash_area_partial_label";
  ALTER TABLE "pages_blocks_submit_trail_locales" DROP COLUMN "off_leash_area_none_label";
  ALTER TABLE "pages_blocks_submit_trail_locales" DROP COLUMN "success_title";
  ALTER TABLE "pages_blocks_submit_trail_locales" DROP COLUMN "success_message";
  ALTER TABLE "trails" DROP COLUMN "community";
  ALTER TABLE "trails" DROP COLUMN "off_leash_area";
  ALTER TABLE "trails" DROP COLUMN "hospitality";
  ALTER TABLE "trails" DROP COLUMN "water";
  DROP TYPE "public"."enum_trails_off_leash_area";`)
}
