import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "nav_items_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "nav_items_items_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "nav_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"highlighted_link_url" varchar NOT NULL,
  	"highlighted_link_open_in_new_tab" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "nav_items_locales" (
  	"logo_link" varchar DEFAULT 'https://emea.orijenpetfoods.com/' NOT NULL,
  	"highlighted_link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_cta_block" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "nav_items_items" ADD CONSTRAINT "nav_items_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_items_items_locales" ADD CONSTRAINT "nav_items_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav_items_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_items_locales" ADD CONSTRAINT "nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav_items"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "nav_items_items_order_idx" ON "nav_items_items" USING btree ("_order");
  CREATE INDEX "nav_items_items_parent_id_idx" ON "nav_items_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "nav_items_items_locales_locale_parent_id_unique" ON "nav_items_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "nav_items_locales_locale_parent_id_unique" ON "nav_items_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "nav_items_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "nav_items_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "nav_items_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "nav_items_items" CASCADE;
  DROP TABLE "nav_items_items_locales" CASCADE;
  DROP TABLE "nav_items" CASCADE;
  DROP TABLE "nav_items_locales" CASCADE;
  ALTER TABLE "pages_blocks_cta_block" ALTER COLUMN "image_id" SET NOT NULL;`)
}
