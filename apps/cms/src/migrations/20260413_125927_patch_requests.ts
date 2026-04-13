import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_user_form_request_type" AS ENUM('trail', 'patch-request');
  CREATE TYPE "public"."enum_pages_blocks_user_form_icon" AS ENUM('map-search', 'group', 'route', 'clock', 'hike', 'prize', 'camera', 'terrain', 'pets');
  CREATE TYPE "public"."enum_patch_requests_status" AS ENUM('draft', 'requested', 'send');
  CREATE TABLE "patches" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"patch" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "patch_requests_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "patch_requests" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"address_street_address" varchar NOT NULL,
  	"address_postcode" varchar NOT NULL,
  	"address_city" varchar NOT NULL,
  	"address_country" varchar NOT NULL,
  	"patch_id" integer NOT NULL,
  	"status" "enum_patch_requests_status" DEFAULT 'requested',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "user_media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"prefix" varchar DEFAULT 'orijen-trails/user',
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
  	"sizes_thumbnail_filename" varchar
  );
  
  ALTER TABLE "pages_blocks_submit_trail" RENAME TO "pages_blocks_user_form";
  ALTER TABLE "pages_blocks_submit_trail_locales" RENAME TO "pages_blocks_user_form_locales";
  ALTER TABLE "pages_blocks_user_form" DROP CONSTRAINT "pages_blocks_submit_trail_parent_id_fk";
  
  ALTER TABLE "pages_blocks_user_form_locales" DROP CONSTRAINT "pages_blocks_submit_trail_locales_parent_id_fk";
  
  DROP INDEX "pages_blocks_submit_trail_order_idx";
  DROP INDEX "pages_blocks_submit_trail_parent_id_idx";
  DROP INDEX "pages_blocks_submit_trail_path_idx";
  DROP INDEX "pages_blocks_submit_trail_locales_locale_parent_id_unique";
  ALTER TABLE "pages_blocks_user_form" ADD COLUMN "request_type" "enum_pages_blocks_user_form_request_type" DEFAULT 'trail' NOT NULL;
  ALTER TABLE "pages_blocks_user_form" ADD COLUMN "icon" "enum_pages_blocks_user_form_icon";
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "patches_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "patch_requests_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "user_media_id" integer;
  ALTER TABLE "ui_labels_locales" ADD COLUMN "patch_request_form_name_label" varchar;
  ALTER TABLE "ui_labels_locales" ADD COLUMN "patch_request_form_email_label" varchar;
  ALTER TABLE "ui_labels_locales" ADD COLUMN "patch_request_form_street_address_label" varchar;
  ALTER TABLE "ui_labels_locales" ADD COLUMN "patch_request_form_postcode_label" varchar;
  ALTER TABLE "ui_labels_locales" ADD COLUMN "patch_request_form_city_label" varchar;
  ALTER TABLE "ui_labels_locales" ADD COLUMN "patch_request_form_country_label" varchar;
  ALTER TABLE "ui_labels_locales" ADD COLUMN "patch_request_form_image_label" varchar;
  ALTER TABLE "ui_labels_locales" ADD COLUMN "patch_request_form_patch_label" varchar DEFAULT 'Patch';
  ALTER TABLE "ui_labels_locales" ADD COLUMN "patch_request_form_submit_label" varchar;
  ALTER TABLE "patch_requests_images" ADD CONSTRAINT "patch_requests_images_image_id_user_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."user_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "patch_requests_images" ADD CONSTRAINT "patch_requests_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."patch_requests"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "patch_requests" ADD CONSTRAINT "patch_requests_patch_id_patches_id_fk" FOREIGN KEY ("patch_id") REFERENCES "public"."patches"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "patches_updated_at_idx" ON "patches" USING btree ("updated_at");
  CREATE INDEX "patches_created_at_idx" ON "patches" USING btree ("created_at");
  CREATE INDEX "patch_requests_images_order_idx" ON "patch_requests_images" USING btree ("_order");
  CREATE INDEX "patch_requests_images_parent_id_idx" ON "patch_requests_images" USING btree ("_parent_id");
  CREATE INDEX "patch_requests_images_image_idx" ON "patch_requests_images" USING btree ("image_id");
  CREATE INDEX "patch_requests_patch_idx" ON "patch_requests" USING btree ("patch_id");
  CREATE INDEX "patch_requests_updated_at_idx" ON "patch_requests" USING btree ("updated_at");
  CREATE INDEX "patch_requests_created_at_idx" ON "patch_requests" USING btree ("created_at");
  CREATE INDEX "user_media_updated_at_idx" ON "user_media" USING btree ("updated_at");
  CREATE INDEX "user_media_created_at_idx" ON "user_media" USING btree ("created_at");
  CREATE UNIQUE INDEX "user_media_filename_idx" ON "user_media" USING btree ("filename");
  CREATE INDEX "user_media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "user_media" USING btree ("sizes_thumbnail_filename");
  ALTER TABLE "pages_blocks_user_form" ADD CONSTRAINT "pages_blocks_user_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_user_form_locales" ADD CONSTRAINT "pages_blocks_user_form_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_user_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_patches_fk" FOREIGN KEY ("patches_id") REFERENCES "public"."patches"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_patch_requests_fk" FOREIGN KEY ("patch_requests_id") REFERENCES "public"."patch_requests"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_user_media_fk" FOREIGN KEY ("user_media_id") REFERENCES "public"."user_media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_user_form_order_idx" ON "pages_blocks_user_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_user_form_parent_id_idx" ON "pages_blocks_user_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_user_form_path_idx" ON "pages_blocks_user_form" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_user_form_locales_locale_parent_id_unique" ON "pages_blocks_user_form_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "payload_locked_documents_rels_patches_id_idx" ON "payload_locked_documents_rels" USING btree ("patches_id");
  CREATE INDEX "payload_locked_documents_rels_patch_requests_id_idx" ON "payload_locked_documents_rels" USING btree ("patch_requests_id");
  CREATE INDEX "payload_locked_documents_rels_user_media_id_idx" ON "payload_locked_documents_rels" USING btree ("user_media_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "patches" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "patch_requests_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "patch_requests" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "user_media" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "patches" CASCADE;
  DROP TABLE "patch_requests_images" CASCADE;
  DROP TABLE "patch_requests" CASCADE;
  DROP TABLE "user_media" CASCADE;
  ALTER TABLE "pages_blocks_user_form" RENAME TO "pages_blocks_submit_trail";
  ALTER TABLE "pages_blocks_user_form_locales" RENAME TO "pages_blocks_submit_trail_locales";
  ALTER TABLE "pages_blocks_submit_trail" DROP CONSTRAINT "pages_blocks_user_form_parent_id_fk";
  
  ALTER TABLE "pages_blocks_submit_trail_locales" DROP CONSTRAINT "pages_blocks_user_form_locales_parent_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_patches_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_patch_requests_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_user_media_fk";
  
  DROP INDEX "pages_blocks_user_form_order_idx";
  DROP INDEX "pages_blocks_user_form_parent_id_idx";
  DROP INDEX "pages_blocks_user_form_path_idx";
  DROP INDEX "pages_blocks_user_form_locales_locale_parent_id_unique";
  DROP INDEX "payload_locked_documents_rels_patches_id_idx";
  DROP INDEX "payload_locked_documents_rels_patch_requests_id_idx";
  DROP INDEX "payload_locked_documents_rels_user_media_id_idx";
  ALTER TABLE "pages_blocks_submit_trail" ADD CONSTRAINT "pages_blocks_submit_trail_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_submit_trail_locales" ADD CONSTRAINT "pages_blocks_submit_trail_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_submit_trail"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_submit_trail_order_idx" ON "pages_blocks_submit_trail" USING btree ("_order");
  CREATE INDEX "pages_blocks_submit_trail_parent_id_idx" ON "pages_blocks_submit_trail" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_submit_trail_path_idx" ON "pages_blocks_submit_trail" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_submit_trail_locales_locale_parent_id_unique" ON "pages_blocks_submit_trail_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "pages_blocks_submit_trail" DROP COLUMN "request_type";
  ALTER TABLE "pages_blocks_submit_trail" DROP COLUMN "icon";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "patches_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "patch_requests_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "user_media_id";
  ALTER TABLE "ui_labels_locales" DROP COLUMN "patch_request_form_name_label";
  ALTER TABLE "ui_labels_locales" DROP COLUMN "patch_request_form_email_label";
  ALTER TABLE "ui_labels_locales" DROP COLUMN "patch_request_form_street_address_label";
  ALTER TABLE "ui_labels_locales" DROP COLUMN "patch_request_form_postcode_label";
  ALTER TABLE "ui_labels_locales" DROP COLUMN "patch_request_form_city_label";
  ALTER TABLE "ui_labels_locales" DROP COLUMN "patch_request_form_country_label";
  ALTER TABLE "ui_labels_locales" DROP COLUMN "patch_request_form_image_label";
  ALTER TABLE "ui_labels_locales" DROP COLUMN "patch_request_form_patch_label";
  ALTER TABLE "ui_labels_locales" DROP COLUMN "patch_request_form_submit_label";
  DROP TYPE "public"."enum_pages_blocks_user_form_request_type";
  DROP TYPE "public"."enum_pages_blocks_user_form_icon";
  DROP TYPE "public"."enum_patch_requests_status";`)
}
