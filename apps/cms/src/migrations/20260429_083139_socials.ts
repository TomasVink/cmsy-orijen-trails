import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_nav_items_socials_platform" AS ENUM('instagram', 'facebook', 'youtube', 'tiktok');
  CREATE TABLE "nav_items_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_nav_items_socials_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  ALTER TABLE "nav_items_socials" ADD CONSTRAINT "nav_items_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav_items"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "nav_items_socials_order_idx" ON "nav_items_socials" USING btree ("_order");
  CREATE INDEX "nav_items_socials_parent_id_idx" ON "nav_items_socials" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "nav_items_socials" CASCADE;
  DROP TYPE "public"."enum_nav_items_socials_platform";`)
}
