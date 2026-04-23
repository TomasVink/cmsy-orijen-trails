import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_campaign_steps_background_color" AS ENUM('black', 'white', 'texture');
  CREATE TYPE "public"."enum_pages_blocks_top_trails_background_color" AS ENUM('black', 'white', 'texture');
  CREATE TYPE "public"."enum_pages_blocks_trails_overview_background_color" AS ENUM('black', 'white', 'texture');
  CREATE TYPE "public"."enum_pages_blocks_user_form_background_color" AS ENUM('black', 'white', 'texture');
  CREATE TYPE "public"."enum_pages_blocks_blog_background_color" AS ENUM('black', 'white', 'texture');
  CREATE TYPE "public"."enum_pages_blocks_influencer_carousel_background_color" AS ENUM('black', 'white', 'texture');
  CREATE TYPE "public"."enum_pages_blocks_events_background_color" AS ENUM('black', 'white', 'texture');
  CREATE TYPE "public"."enum_pages_blocks_faq_background_color" AS ENUM('black', 'white', 'texture');
  ALTER TABLE "pages_blocks_campaign_steps" ADD COLUMN "background_image_id" integer;
  ALTER TABLE "pages_blocks_campaign_steps" ADD COLUMN "background_color" "enum_pages_blocks_campaign_steps_background_color" DEFAULT 'black';
  ALTER TABLE "pages_blocks_top_trails" ADD COLUMN "background_image_id" integer;
  ALTER TABLE "pages_blocks_top_trails" ADD COLUMN "background_color" "enum_pages_blocks_top_trails_background_color" DEFAULT 'black';
  ALTER TABLE "pages_blocks_trails_overview" ADD COLUMN "background_image_id" integer;
  ALTER TABLE "pages_blocks_trails_overview" ADD COLUMN "background_color" "enum_pages_blocks_trails_overview_background_color" DEFAULT 'black';
  ALTER TABLE "pages_blocks_user_form" ADD COLUMN "background_image_id" integer;
  ALTER TABLE "pages_blocks_user_form" ADD COLUMN "background_color" "enum_pages_blocks_user_form_background_color" DEFAULT 'black';
  ALTER TABLE "pages_blocks_blog" ADD COLUMN "background_image_id" integer;
  ALTER TABLE "pages_blocks_blog" ADD COLUMN "background_color" "enum_pages_blocks_blog_background_color" DEFAULT 'black';
  ALTER TABLE "pages_blocks_influencer_carousel" ADD COLUMN "background_image_id" integer;
  ALTER TABLE "pages_blocks_influencer_carousel" ADD COLUMN "background_color" "enum_pages_blocks_influencer_carousel_background_color" DEFAULT 'black';
  ALTER TABLE "pages_blocks_events" ADD COLUMN "background_image_id" integer;
  ALTER TABLE "pages_blocks_events" ADD COLUMN "background_color" "enum_pages_blocks_events_background_color" DEFAULT 'black';
  ALTER TABLE "pages_blocks_faq" ADD COLUMN "background_image_id" integer;
  ALTER TABLE "pages_blocks_faq" ADD COLUMN "background_color" "enum_pages_blocks_faq_background_color" DEFAULT 'black';
  ALTER TABLE "pages_blocks_campaign_steps" ADD CONSTRAINT "pages_blocks_campaign_steps_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_top_trails" ADD CONSTRAINT "pages_blocks_top_trails_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_trails_overview" ADD CONSTRAINT "pages_blocks_trails_overview_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_user_form" ADD CONSTRAINT "pages_blocks_user_form_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog" ADD CONSTRAINT "pages_blocks_blog_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_influencer_carousel" ADD CONSTRAINT "pages_blocks_influencer_carousel_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_events" ADD CONSTRAINT "pages_blocks_events_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_campaign_steps_background_image_idx" ON "pages_blocks_campaign_steps" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_top_trails_background_image_idx" ON "pages_blocks_top_trails" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_trails_overview_background_image_idx" ON "pages_blocks_trails_overview" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_user_form_background_image_idx" ON "pages_blocks_user_form" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_blog_background_image_idx" ON "pages_blocks_blog" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_influencer_carousel_background_image_idx" ON "pages_blocks_influencer_carousel" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_events_background_image_idx" ON "pages_blocks_events" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_faq_background_image_idx" ON "pages_blocks_faq" USING btree ("background_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_campaign_steps" DROP CONSTRAINT "pages_blocks_campaign_steps_background_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_top_trails" DROP CONSTRAINT "pages_blocks_top_trails_background_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_trails_overview" DROP CONSTRAINT "pages_blocks_trails_overview_background_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_user_form" DROP CONSTRAINT "pages_blocks_user_form_background_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_blog" DROP CONSTRAINT "pages_blocks_blog_background_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_influencer_carousel" DROP CONSTRAINT "pages_blocks_influencer_carousel_background_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_events" DROP CONSTRAINT "pages_blocks_events_background_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_faq" DROP CONSTRAINT "pages_blocks_faq_background_image_id_media_id_fk";
  
  DROP INDEX "pages_blocks_campaign_steps_background_image_idx";
  DROP INDEX "pages_blocks_top_trails_background_image_idx";
  DROP INDEX "pages_blocks_trails_overview_background_image_idx";
  DROP INDEX "pages_blocks_user_form_background_image_idx";
  DROP INDEX "pages_blocks_blog_background_image_idx";
  DROP INDEX "pages_blocks_influencer_carousel_background_image_idx";
  DROP INDEX "pages_blocks_events_background_image_idx";
  DROP INDEX "pages_blocks_faq_background_image_idx";
  ALTER TABLE "pages_blocks_campaign_steps" DROP COLUMN "background_image_id";
  ALTER TABLE "pages_blocks_campaign_steps" DROP COLUMN "background_color";
  ALTER TABLE "pages_blocks_top_trails" DROP COLUMN "background_image_id";
  ALTER TABLE "pages_blocks_top_trails" DROP COLUMN "background_color";
  ALTER TABLE "pages_blocks_trails_overview" DROP COLUMN "background_image_id";
  ALTER TABLE "pages_blocks_trails_overview" DROP COLUMN "background_color";
  ALTER TABLE "pages_blocks_user_form" DROP COLUMN "background_image_id";
  ALTER TABLE "pages_blocks_user_form" DROP COLUMN "background_color";
  ALTER TABLE "pages_blocks_blog" DROP COLUMN "background_image_id";
  ALTER TABLE "pages_blocks_blog" DROP COLUMN "background_color";
  ALTER TABLE "pages_blocks_influencer_carousel" DROP COLUMN "background_image_id";
  ALTER TABLE "pages_blocks_influencer_carousel" DROP COLUMN "background_color";
  ALTER TABLE "pages_blocks_events" DROP COLUMN "background_image_id";
  ALTER TABLE "pages_blocks_events" DROP COLUMN "background_color";
  ALTER TABLE "pages_blocks_faq" DROP COLUMN "background_image_id";
  ALTER TABLE "pages_blocks_faq" DROP COLUMN "background_color";
  DROP TYPE "public"."enum_pages_blocks_campaign_steps_background_color";
  DROP TYPE "public"."enum_pages_blocks_top_trails_background_color";
  DROP TYPE "public"."enum_pages_blocks_trails_overview_background_color";
  DROP TYPE "public"."enum_pages_blocks_user_form_background_color";
  DROP TYPE "public"."enum_pages_blocks_blog_background_color";
  DROP TYPE "public"."enum_pages_blocks_influencer_carousel_background_color";
  DROP TYPE "public"."enum_pages_blocks_events_background_color";
  DROP TYPE "public"."enum_pages_blocks_faq_background_color";`)
}
