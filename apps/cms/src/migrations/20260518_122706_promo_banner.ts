import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_promo_banner_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_promo_banner_logos_locales" (
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_promo_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_promo_banner_locales" (
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"badge_primary_text" varchar,
  	"badge_secondary_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "pages_blocks_cta_block_locales" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_promo_banner_logos" ADD CONSTRAINT "pages_blocks_promo_banner_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_promo_banner_logos" ADD CONSTRAINT "pages_blocks_promo_banner_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_promo_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_promo_banner_logos_locales" ADD CONSTRAINT "pages_blocks_promo_banner_logos_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_promo_banner_logos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_promo_banner" ADD CONSTRAINT "pages_blocks_promo_banner_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_promo_banner" ADD CONSTRAINT "pages_blocks_promo_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_promo_banner_locales" ADD CONSTRAINT "pages_blocks_promo_banner_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_promo_banner"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_promo_banner_logos_order_idx" ON "pages_blocks_promo_banner_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_promo_banner_logos_parent_id_idx" ON "pages_blocks_promo_banner_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_promo_banner_logos_logo_idx" ON "pages_blocks_promo_banner_logos" USING btree ("logo_id");
  CREATE UNIQUE INDEX "pages_blocks_promo_banner_logos_locales_locale_parent_id_uni" ON "pages_blocks_promo_banner_logos_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_promo_banner_order_idx" ON "pages_blocks_promo_banner" USING btree ("_order");
  CREATE INDEX "pages_blocks_promo_banner_parent_id_idx" ON "pages_blocks_promo_banner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_promo_banner_path_idx" ON "pages_blocks_promo_banner" USING btree ("_path");
  CREATE INDEX "pages_blocks_promo_banner_background_image_idx" ON "pages_blocks_promo_banner" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_promo_banner_locales_locale_parent_id_unique" ON "pages_blocks_promo_banner_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_promo_banner_logos" CASCADE;
  DROP TABLE "pages_blocks_promo_banner_logos_locales" CASCADE;
  DROP TABLE "pages_blocks_promo_banner" CASCADE;
  DROP TABLE "pages_blocks_promo_banner_locales" CASCADE;
  ALTER TABLE "pages_blocks_cta_block_locales" DROP COLUMN "title";`)
}
