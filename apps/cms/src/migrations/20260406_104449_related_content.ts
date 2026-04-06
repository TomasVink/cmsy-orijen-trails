import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_trails_links_type" AS ENUM('komoot', 'allTrails', 'other');
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"influencers_id" integer,
  	"trails_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "trails_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL,
  	"type" "enum_trails_links_type" DEFAULT 'other'
  );
  
  CREATE TABLE "trails_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"influencers_id" integer,
  	"trails_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "trail_labels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "trail_labels_locales" (
  	"difficulty_easy" varchar,
  	"difficulty_moderate" varchar,
  	"difficulty_challenging" varchar,
  	"difficulty_all_difficulties" varchar,
  	"off_leash_fully" varchar,
  	"off_leash_partial" varchar,
  	"off_leash_none" varchar,
  	"hospitality" varchar,
  	"water" varchar,
  	"view_trail" varchar,
  	"form_name_label" varchar,
  	"form_email_label" varchar,
  	"form_trail_name_label" varchar,
  	"form_description_label" varchar,
  	"form_description_hint" varchar,
  	"form_address_label" varchar,
  	"form_distance_label" varchar,
  	"form_off_leash_area_label" varchar,
  	"form_off_leash_area_placeholder" varchar,
  	"form_hospitality_label" varchar,
  	"form_water_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "ui_labels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "ui_labels_locales" (
  	"back" varchar,
  	"continue_reading" varchar,
  	"follow_on" varchar,
  	"submitting" varchar,
  	"map_zoom_hint" varchar,
  	"map_zoom_hint_mac" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_influencers_fk" FOREIGN KEY ("influencers_id") REFERENCES "public"."influencers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_trails_fk" FOREIGN KEY ("trails_id") REFERENCES "public"."trails"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trails_links" ADD CONSTRAINT "trails_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trails"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trails_rels" ADD CONSTRAINT "trails_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."trails"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trails_rels" ADD CONSTRAINT "trails_rels_influencers_fk" FOREIGN KEY ("influencers_id") REFERENCES "public"."influencers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trails_rels" ADD CONSTRAINT "trails_rels_trails_fk" FOREIGN KEY ("trails_id") REFERENCES "public"."trails"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trails_rels" ADD CONSTRAINT "trails_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trail_labels_locales" ADD CONSTRAINT "trail_labels_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trail_labels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ui_labels_locales" ADD CONSTRAINT "ui_labels_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ui_labels"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_influencers_id_idx" ON "posts_rels" USING btree ("influencers_id");
  CREATE INDEX "posts_rels_trails_id_idx" ON "posts_rels" USING btree ("trails_id");
  CREATE INDEX "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE INDEX "trails_links_order_idx" ON "trails_links" USING btree ("_order");
  CREATE INDEX "trails_links_parent_id_idx" ON "trails_links" USING btree ("_parent_id");
  CREATE INDEX "trails_rels_order_idx" ON "trails_rels" USING btree ("order");
  CREATE INDEX "trails_rels_parent_idx" ON "trails_rels" USING btree ("parent_id");
  CREATE INDEX "trails_rels_path_idx" ON "trails_rels" USING btree ("path");
  CREATE INDEX "trails_rels_influencers_id_idx" ON "trails_rels" USING btree ("influencers_id");
  CREATE INDEX "trails_rels_trails_id_idx" ON "trails_rels" USING btree ("trails_id");
  CREATE INDEX "trails_rels_posts_id_idx" ON "trails_rels" USING btree ("posts_id");
  CREATE UNIQUE INDEX "trail_labels_locales_locale_parent_id_unique" ON "trail_labels_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "ui_labels_locales_locale_parent_id_unique" ON "ui_labels_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "pages_blocks_submit_trail_locales" DROP COLUMN "name_label";
  ALTER TABLE "pages_blocks_submit_trail_locales" DROP COLUMN "email_label";
  ALTER TABLE "pages_blocks_submit_trail_locales" DROP COLUMN "trail_name_label";
  ALTER TABLE "pages_blocks_submit_trail_locales" DROP COLUMN "description_label";
  ALTER TABLE "pages_blocks_submit_trail_locales" DROP COLUMN "address_label";
  ALTER TABLE "pages_blocks_submit_trail_locales" DROP COLUMN "distance_label";
  ALTER TABLE "pages_blocks_submit_trail_locales" DROP COLUMN "off_leash_area_label";
  ALTER TABLE "pages_blocks_submit_trail_locales" DROP COLUMN "hospitality_label";
  ALTER TABLE "pages_blocks_submit_trail_locales" DROP COLUMN "water_label";
  ALTER TABLE "pages_blocks_submit_trail_locales" DROP COLUMN "off_leash_area_placeholder";
  ALTER TABLE "pages_blocks_submit_trail_locales" DROP COLUMN "off_leash_area_fully_label";
  ALTER TABLE "pages_blocks_submit_trail_locales" DROP COLUMN "off_leash_area_partial_label";
  ALTER TABLE "pages_blocks_submit_trail_locales" DROP COLUMN "off_leash_area_none_label";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "trails_links" CASCADE;
  DROP TABLE "trails_rels" CASCADE;
  DROP TABLE "trail_labels" CASCADE;
  DROP TABLE "trail_labels_locales" CASCADE;
  DROP TABLE "ui_labels" CASCADE;
  DROP TABLE "ui_labels_locales" CASCADE;
  ALTER TABLE "pages_blocks_submit_trail_locales" ADD COLUMN "name_label" varchar DEFAULT 'Your name';
  ALTER TABLE "pages_blocks_submit_trail_locales" ADD COLUMN "email_label" varchar DEFAULT 'Email address';
  ALTER TABLE "pages_blocks_submit_trail_locales" ADD COLUMN "trail_name_label" varchar DEFAULT 'Trail name';
  ALTER TABLE "pages_blocks_submit_trail_locales" ADD COLUMN "description_label" varchar DEFAULT 'Trail description';
  ALTER TABLE "pages_blocks_submit_trail_locales" ADD COLUMN "address_label" varchar DEFAULT 'Address / start point';
  ALTER TABLE "pages_blocks_submit_trail_locales" ADD COLUMN "distance_label" varchar DEFAULT 'Distance (km)';
  ALTER TABLE "pages_blocks_submit_trail_locales" ADD COLUMN "off_leash_area_label" varchar DEFAULT 'Off-leash area';
  ALTER TABLE "pages_blocks_submit_trail_locales" ADD COLUMN "hospitality_label" varchar DEFAULT 'Hospitality nearby (café, restaurant, etc.)';
  ALTER TABLE "pages_blocks_submit_trail_locales" ADD COLUMN "water_label" varchar DEFAULT 'Natural water on route (river, lake, sea)';
  ALTER TABLE "pages_blocks_submit_trail_locales" ADD COLUMN "off_leash_area_placeholder" varchar DEFAULT '— select —';
  ALTER TABLE "pages_blocks_submit_trail_locales" ADD COLUMN "off_leash_area_fully_label" varchar DEFAULT 'Fully';
  ALTER TABLE "pages_blocks_submit_trail_locales" ADD COLUMN "off_leash_area_partial_label" varchar DEFAULT 'Partial';
  ALTER TABLE "pages_blocks_submit_trail_locales" ADD COLUMN "off_leash_area_none_label" varchar DEFAULT 'None';
  DROP TYPE "public"."enum_trails_links_type";`)
}
