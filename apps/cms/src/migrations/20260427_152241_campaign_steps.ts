import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_hero_cta_icon" ADD VALUE 'share';
  ALTER TYPE "public"."enum_pages_blocks_campaign_steps_steps_icon" ADD VALUE 'share';
  ALTER TYPE "public"."enum_pages_blocks_user_form_icon" ADD VALUE 'share';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_cta" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_hero_cta_icon";
  CREATE TYPE "public"."enum_pages_blocks_hero_cta_icon" AS ENUM('map-search', 'group', 'route', 'clock', 'hike', 'prize', 'camera', 'terrain', 'pets');
  ALTER TABLE "pages_blocks_hero_cta" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_pages_blocks_hero_cta_icon" USING "icon"::"public"."enum_pages_blocks_hero_cta_icon";
  ALTER TABLE "pages_blocks_campaign_steps_steps" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_campaign_steps_steps_icon";
  CREATE TYPE "public"."enum_pages_blocks_campaign_steps_steps_icon" AS ENUM('map-search', 'group', 'route', 'clock', 'hike', 'prize', 'camera', 'terrain', 'pets');
  ALTER TABLE "pages_blocks_campaign_steps_steps" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_pages_blocks_campaign_steps_steps_icon" USING "icon"::"public"."enum_pages_blocks_campaign_steps_steps_icon";
  ALTER TABLE "pages_blocks_user_form" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_user_form_icon";
  CREATE TYPE "public"."enum_pages_blocks_user_form_icon" AS ENUM('map-search', 'group', 'route', 'clock', 'hike', 'prize', 'camera', 'terrain', 'pets');
  ALTER TABLE "pages_blocks_user_form" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_pages_blocks_user_form_icon" USING "icon"::"public"."enum_pages_blocks_user_form_icon";`)
}
