import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_cta_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_block_locales" (
  	"cta" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "pages_blocks_blog_locales" ADD COLUMN "view_all_label" varchar;
  ALTER TABLE "trail_labels_locales" ADD COLUMN "view_all_trails" varchar;
  ALTER TABLE "pages_blocks_cta_block" ADD CONSTRAINT "pages_blocks_cta_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_block" ADD CONSTRAINT "pages_blocks_cta_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_block_locales" ADD CONSTRAINT "pages_blocks_cta_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_block"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_cta_block_order_idx" ON "pages_blocks_cta_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_block_parent_id_idx" ON "pages_blocks_cta_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_block_path_idx" ON "pages_blocks_cta_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_block_image_idx" ON "pages_blocks_cta_block" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_cta_block_locales_locale_parent_id_unique" ON "pages_blocks_cta_block_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_cta_block" CASCADE;
  DROP TABLE "pages_blocks_cta_block_locales" CASCADE;
  ALTER TABLE "pages_blocks_blog_locales" DROP COLUMN "view_all_label";
  ALTER TABLE "trail_labels_locales" DROP COLUMN "view_all_trails";`)
}
