import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('nl', 'en');
  CREATE TYPE "public"."enum_pages_blocks_hero_cta_icon" AS ENUM('map-search', 'group', 'route', 'clock');
  CREATE TYPE "public"."enum_pages_blocks_campaign_steps_steps_icon" AS ENUM('map-search', 'group', 'route', 'clock');
  CREATE TYPE "public"."enum_pages_blocks_social_button_platform" AS ENUM('instagram', 'tiktok', 'facebook');
  CREATE TYPE "public"."enum_trails_difficulty" AS ENUM('easy', 'moderate', 'challenging');
  CREATE TYPE "public"."enum_influencers_platform" AS ENUM('instagram', 'tiktok');
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logto_sub" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_url" varchar,
  	"outline" boolean DEFAULT false,
  	"icon" "enum_pages_blocks_hero_cta_icon"
  );
  
  CREATE TABLE "pages_blocks_hero_cta_locales" (
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_locales" (
  	"headline" varchar NOT NULL,
  	"subheadline" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_campaign_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_campaign_steps_steps_icon"
  );
  
  CREATE TABLE "pages_blocks_campaign_steps_steps_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_campaign_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_campaign_steps_locales" (
  	"title" varchar NOT NULL,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_top_trails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_top_trails_locales" (
  	"title" varchar NOT NULL,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_trails_overview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_trails_overview_locales" (
  	"title" varchar NOT NULL,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_submit_trail" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_submit_trail_locales" (
  	"title" varchar NOT NULL,
  	"body" jsonb,
  	"cta_label" varchar,
  	"name_label" varchar DEFAULT 'Your name',
  	"email_label" varchar DEFAULT 'Email address',
  	"trail_name_label" varchar DEFAULT 'Trail name',
  	"description_label" varchar DEFAULT 'Trail description',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_blog" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_blog_locales" (
  	"title" varchar NOT NULL,
  	"body" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_social_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_pages_blocks_social_button_platform" NOT NULL,
  	"handle" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_social_button_locales" (
  	"cta_text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_influencer_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_influencer_carousel_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"trails_id" integer,
  	"influencers_id" integer
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_id" integer,
  	"link" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "posts_locales" (
  	"slug" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"excerpt" varchar,
  	"content" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "trails_photos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "trails" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"published" boolean DEFAULT false,
  	"featured" boolean DEFAULT false,
  	"header_id" integer,
  	"distance" numeric,
  	"duration" numeric,
  	"difficulty" "enum_trails_difficulty",
  	"coordinates_lat" numeric,
  	"coordinates_lng" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "trails_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"content" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "influencers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"handle" varchar NOT NULL,
  	"platform" "enum_influencers_platform" NOT NULL,
  	"image_id" integer NOT NULL,
  	"profile_url" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"prefix" varchar DEFAULT 'orijen-trails',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_tablet_url" varchar,
  	"sizes_tablet_width" numeric,
  	"sizes_tablet_height" numeric,
  	"sizes_tablet_mime_type" varchar,
  	"sizes_tablet_filesize" numeric,
  	"sizes_tablet_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"pages_id" integer,
  	"posts_id" integer,
  	"trails_id" integer,
  	"influencers_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "pages_blocks_hero_cta" ADD CONSTRAINT "pages_blocks_hero_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_cta_locales" ADD CONSTRAINT "pages_blocks_hero_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_locales" ADD CONSTRAINT "pages_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_campaign_steps_steps" ADD CONSTRAINT "pages_blocks_campaign_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_campaign_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_campaign_steps_steps_locales" ADD CONSTRAINT "pages_blocks_campaign_steps_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_campaign_steps_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_campaign_steps" ADD CONSTRAINT "pages_blocks_campaign_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_campaign_steps_locales" ADD CONSTRAINT "pages_blocks_campaign_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_campaign_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_top_trails" ADD CONSTRAINT "pages_blocks_top_trails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_top_trails_locales" ADD CONSTRAINT "pages_blocks_top_trails_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_top_trails"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trails_overview" ADD CONSTRAINT "pages_blocks_trails_overview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trails_overview_locales" ADD CONSTRAINT "pages_blocks_trails_overview_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_trails_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_submit_trail" ADD CONSTRAINT "pages_blocks_submit_trail_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_submit_trail_locales" ADD CONSTRAINT "pages_blocks_submit_trail_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_submit_trail"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog" ADD CONSTRAINT "pages_blocks_blog_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog" ADD CONSTRAINT "pages_blocks_blog_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog_locales" ADD CONSTRAINT "pages_blocks_blog_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_social_button" ADD CONSTRAINT "pages_blocks_social_button_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_social_button" ADD CONSTRAINT "pages_blocks_social_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_social_button_locales" ADD CONSTRAINT "pages_blocks_social_button_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_social_button"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_influencer_carousel" ADD CONSTRAINT "pages_blocks_influencer_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_influencer_carousel_locales" ADD CONSTRAINT "pages_blocks_influencer_carousel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_influencer_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_trails_fk" FOREIGN KEY ("trails_id") REFERENCES "public"."trails"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_influencers_fk" FOREIGN KEY ("influencers_id") REFERENCES "public"."influencers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_header_id_media_id_fk" FOREIGN KEY ("header_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trails_photos" ADD CONSTRAINT "trails_photos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "trails_photos" ADD CONSTRAINT "trails_photos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trails"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trails" ADD CONSTRAINT "trails_header_id_media_id_fk" FOREIGN KEY ("header_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "trails_locales" ADD CONSTRAINT "trails_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trails"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "influencers" ADD CONSTRAINT "influencers_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_trails_fk" FOREIGN KEY ("trails_id") REFERENCES "public"."trails"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_influencers_fk" FOREIGN KEY ("influencers_id") REFERENCES "public"."influencers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "users_logto_sub_idx" ON "users" USING btree ("logto_sub");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE INDEX "pages_blocks_hero_cta_order_idx" ON "pages_blocks_hero_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_cta_parent_id_idx" ON "pages_blocks_hero_cta" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_cta_locales_locale_parent_id_unique" ON "pages_blocks_hero_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_video_idx" ON "pages_blocks_hero" USING btree ("video_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_locales_locale_parent_id_unique" ON "pages_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_campaign_steps_steps_order_idx" ON "pages_blocks_campaign_steps_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_campaign_steps_steps_parent_id_idx" ON "pages_blocks_campaign_steps_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_campaign_steps_steps_locales_locale_parent_id_u" ON "pages_blocks_campaign_steps_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_campaign_steps_order_idx" ON "pages_blocks_campaign_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_campaign_steps_parent_id_idx" ON "pages_blocks_campaign_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_campaign_steps_path_idx" ON "pages_blocks_campaign_steps" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_campaign_steps_locales_locale_parent_id_unique" ON "pages_blocks_campaign_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_top_trails_order_idx" ON "pages_blocks_top_trails" USING btree ("_order");
  CREATE INDEX "pages_blocks_top_trails_parent_id_idx" ON "pages_blocks_top_trails" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_top_trails_path_idx" ON "pages_blocks_top_trails" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_top_trails_locales_locale_parent_id_unique" ON "pages_blocks_top_trails_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_trails_overview_order_idx" ON "pages_blocks_trails_overview" USING btree ("_order");
  CREATE INDEX "pages_blocks_trails_overview_parent_id_idx" ON "pages_blocks_trails_overview" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_trails_overview_path_idx" ON "pages_blocks_trails_overview" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_trails_overview_locales_locale_parent_id_unique" ON "pages_blocks_trails_overview_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_submit_trail_order_idx" ON "pages_blocks_submit_trail" USING btree ("_order");
  CREATE INDEX "pages_blocks_submit_trail_parent_id_idx" ON "pages_blocks_submit_trail" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_submit_trail_path_idx" ON "pages_blocks_submit_trail" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_submit_trail_locales_locale_parent_id_unique" ON "pages_blocks_submit_trail_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_blog_order_idx" ON "pages_blocks_blog" USING btree ("_order");
  CREATE INDEX "pages_blocks_blog_parent_id_idx" ON "pages_blocks_blog" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_blog_path_idx" ON "pages_blocks_blog" USING btree ("_path");
  CREATE INDEX "pages_blocks_blog_image_idx" ON "pages_blocks_blog" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_blog_locales_locale_parent_id_unique" ON "pages_blocks_blog_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_social_button_order_idx" ON "pages_blocks_social_button" USING btree ("_order");
  CREATE INDEX "pages_blocks_social_button_parent_id_idx" ON "pages_blocks_social_button" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_social_button_path_idx" ON "pages_blocks_social_button" USING btree ("_path");
  CREATE INDEX "pages_blocks_social_button_background_image_idx" ON "pages_blocks_social_button" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_social_button_locales_locale_parent_id_unique" ON "pages_blocks_social_button_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_influencer_carousel_order_idx" ON "pages_blocks_influencer_carousel" USING btree ("_order");
  CREATE INDEX "pages_blocks_influencer_carousel_parent_id_idx" ON "pages_blocks_influencer_carousel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_influencer_carousel_path_idx" ON "pages_blocks_influencer_carousel" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_influencer_carousel_locales_locale_parent_id_un" ON "pages_blocks_influencer_carousel_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages_locales" USING btree ("slug","_locale");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_trails_id_idx" ON "pages_rels" USING btree ("trails_id");
  CREATE INDEX "pages_rels_influencers_id_idx" ON "pages_rels" USING btree ("influencers_id");
  CREATE INDEX "posts_header_idx" ON "posts" USING btree ("header_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts_locales" USING btree ("slug","_locale");
  CREATE UNIQUE INDEX "posts_locales_locale_parent_id_unique" ON "posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "trails_photos_order_idx" ON "trails_photos" USING btree ("_order");
  CREATE INDEX "trails_photos_parent_id_idx" ON "trails_photos" USING btree ("_parent_id");
  CREATE INDEX "trails_photos_image_idx" ON "trails_photos" USING btree ("image_id");
  CREATE INDEX "trails_header_idx" ON "trails" USING btree ("header_id");
  CREATE INDEX "trails_updated_at_idx" ON "trails" USING btree ("updated_at");
  CREATE INDEX "trails_created_at_idx" ON "trails" USING btree ("created_at");
  CREATE UNIQUE INDEX "trails_locales_locale_parent_id_unique" ON "trails_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "influencers_image_idx" ON "influencers" USING btree ("image_id");
  CREATE INDEX "influencers_updated_at_idx" ON "influencers" USING btree ("updated_at");
  CREATE INDEX "influencers_created_at_idx" ON "influencers" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_tablet_sizes_tablet_filename_idx" ON "media" USING btree ("sizes_tablet_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_trails_id_idx" ON "payload_locked_documents_rels" USING btree ("trails_id");
  CREATE INDEX "payload_locked_documents_rels_influencers_id_idx" ON "payload_locked_documents_rels" USING btree ("influencers_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users" CASCADE;
  DROP TABLE "pages_blocks_hero_cta" CASCADE;
  DROP TABLE "pages_blocks_hero_cta_locales" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_campaign_steps_steps" CASCADE;
  DROP TABLE "pages_blocks_campaign_steps_steps_locales" CASCADE;
  DROP TABLE "pages_blocks_campaign_steps" CASCADE;
  DROP TABLE "pages_blocks_campaign_steps_locales" CASCADE;
  DROP TABLE "pages_blocks_top_trails" CASCADE;
  DROP TABLE "pages_blocks_top_trails_locales" CASCADE;
  DROP TABLE "pages_blocks_trails_overview" CASCADE;
  DROP TABLE "pages_blocks_trails_overview_locales" CASCADE;
  DROP TABLE "pages_blocks_submit_trail" CASCADE;
  DROP TABLE "pages_blocks_submit_trail_locales" CASCADE;
  DROP TABLE "pages_blocks_blog" CASCADE;
  DROP TABLE "pages_blocks_blog_locales" CASCADE;
  DROP TABLE "pages_blocks_social_button" CASCADE;
  DROP TABLE "pages_blocks_social_button_locales" CASCADE;
  DROP TABLE "pages_blocks_influencer_carousel" CASCADE;
  DROP TABLE "pages_blocks_influencer_carousel_locales" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_locales" CASCADE;
  DROP TABLE "trails_photos" CASCADE;
  DROP TABLE "trails" CASCADE;
  DROP TABLE "trails_locales" CASCADE;
  DROP TABLE "influencers" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_pages_blocks_hero_cta_icon";
  DROP TYPE "public"."enum_pages_blocks_campaign_steps_steps_icon";
  DROP TYPE "public"."enum_pages_blocks_social_button_platform";
  DROP TYPE "public"."enum_trails_difficulty";
  DROP TYPE "public"."enum_influencers_platform";`)
}
