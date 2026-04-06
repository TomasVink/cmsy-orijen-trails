import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_events_locales" (
  	"title" varchar NOT NULL,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "events_slots" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"start" varchar NOT NULL,
  	"end" varchar NOT NULL,
  	"available" boolean DEFAULT true
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"published" boolean DEFAULT false,
  	"trail_id" integer NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"start" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "events_locales" (
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "events_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"influencers_id" integer
  );
  
  CREATE TABLE "registrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"event_id" integer NOT NULL,
  	"slot" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "sign_up_labels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "sign_up_labels_locales" (
  	"name_label" varchar,
  	"email_label" varchar,
  	"phone_label" varchar,
  	"signup_cta" varchar,
  	"submit_label" varchar,
  	"success_title" varchar,
  	"success_message" varchar,
  	"fully_booked" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_social_button" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_social_button_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_social_button" CASCADE;
  DROP TABLE "pages_blocks_social_button_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "events_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "registrations_id" integer;
  ALTER TABLE "ui_labels_locales" ADD COLUMN "blog_title" varchar;
  ALTER TABLE "ui_labels_locales" ADD COLUMN "trails_title" varchar;
  ALTER TABLE "ui_labels_locales" ADD COLUMN "trail_filters_difficulty" varchar;
  ALTER TABLE "ui_labels_locales" ADD COLUMN "trail_filters_off_leash" varchar;
  ALTER TABLE "ui_labels_locales" ADD COLUMN "trail_filters_distance" varchar;
  ALTER TABLE "ui_labels_locales" ADD COLUMN "trail_filters_features" varchar;
  ALTER TABLE "ui_labels_locales" ADD COLUMN "trail_filters_community" varchar;
  ALTER TABLE "ui_labels_locales" ADD COLUMN "trail_filters_clear" varchar;
  ALTER TABLE "pages_blocks_events" ADD CONSTRAINT "pages_blocks_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_events_locales" ADD CONSTRAINT "pages_blocks_events_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_slots" ADD CONSTRAINT "events_slots_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_trail_id_trails_id_fk" FOREIGN KEY ("trail_id") REFERENCES "public"."trails"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_locales" ADD CONSTRAINT "events_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_influencers_fk" FOREIGN KEY ("influencers_id") REFERENCES "public"."influencers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "registrations" ADD CONSTRAINT "registrations_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sign_up_labels_locales" ADD CONSTRAINT "sign_up_labels_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sign_up_labels"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_events_order_idx" ON "pages_blocks_events" USING btree ("_order");
  CREATE INDEX "pages_blocks_events_parent_id_idx" ON "pages_blocks_events" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_events_path_idx" ON "pages_blocks_events" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_events_locales_locale_parent_id_unique" ON "pages_blocks_events_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "events_slots_order_idx" ON "events_slots" USING btree ("_order");
  CREATE INDEX "events_slots_parent_id_idx" ON "events_slots" USING btree ("_parent_id");
  CREATE INDEX "events_trail_idx" ON "events" USING btree ("trail_id");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE UNIQUE INDEX "events_locales_locale_parent_id_unique" ON "events_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "events_rels_order_idx" ON "events_rels" USING btree ("order");
  CREATE INDEX "events_rels_parent_idx" ON "events_rels" USING btree ("parent_id");
  CREATE INDEX "events_rels_path_idx" ON "events_rels" USING btree ("path");
  CREATE INDEX "events_rels_influencers_id_idx" ON "events_rels" USING btree ("influencers_id");
  CREATE INDEX "registrations_event_idx" ON "registrations" USING btree ("event_id");
  CREATE INDEX "registrations_updated_at_idx" ON "registrations" USING btree ("updated_at");
  CREATE INDEX "registrations_created_at_idx" ON "registrations" USING btree ("created_at");
  CREATE UNIQUE INDEX "sign_up_labels_locales_locale_parent_id_unique" ON "sign_up_labels_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_registrations_fk" FOREIGN KEY ("registrations_id") REFERENCES "public"."registrations"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_registrations_id_idx" ON "payload_locked_documents_rels" USING btree ("registrations_id");
  DROP TYPE "public"."enum_pages_blocks_social_button_platform";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_social_button_platform" AS ENUM('instagram', 'tiktok', 'facebook');
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
  
  ALTER TABLE "pages_blocks_events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_events_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_slots" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "registrations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sign_up_labels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sign_up_labels_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_events" CASCADE;
  DROP TABLE "pages_blocks_events_locales" CASCADE;
  DROP TABLE "events_slots" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "events_locales" CASCADE;
  DROP TABLE "events_rels" CASCADE;
  DROP TABLE "registrations" CASCADE;
  DROP TABLE "sign_up_labels" CASCADE;
  DROP TABLE "sign_up_labels_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_events_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_registrations_fk";
  
  DROP INDEX "payload_locked_documents_rels_events_id_idx";
  DROP INDEX "payload_locked_documents_rels_registrations_id_idx";
  ALTER TABLE "pages_blocks_social_button" ADD CONSTRAINT "pages_blocks_social_button_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_social_button" ADD CONSTRAINT "pages_blocks_social_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_social_button_locales" ADD CONSTRAINT "pages_blocks_social_button_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_social_button"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_social_button_order_idx" ON "pages_blocks_social_button" USING btree ("_order");
  CREATE INDEX "pages_blocks_social_button_parent_id_idx" ON "pages_blocks_social_button" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_social_button_path_idx" ON "pages_blocks_social_button" USING btree ("_path");
  CREATE INDEX "pages_blocks_social_button_background_image_idx" ON "pages_blocks_social_button" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_social_button_locales_locale_parent_id_unique" ON "pages_blocks_social_button_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "events_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "registrations_id";
  ALTER TABLE "ui_labels_locales" DROP COLUMN "blog_title";
  ALTER TABLE "ui_labels_locales" DROP COLUMN "trails_title";
  ALTER TABLE "ui_labels_locales" DROP COLUMN "trail_filters_difficulty";
  ALTER TABLE "ui_labels_locales" DROP COLUMN "trail_filters_off_leash";
  ALTER TABLE "ui_labels_locales" DROP COLUMN "trail_filters_distance";
  ALTER TABLE "ui_labels_locales" DROP COLUMN "trail_filters_features";
  ALTER TABLE "ui_labels_locales" DROP COLUMN "trail_filters_community";
  ALTER TABLE "ui_labels_locales" DROP COLUMN "trail_filters_clear";`)
}
