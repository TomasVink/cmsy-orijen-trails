import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_influencers_accounts_platform" AS ENUM('instagram', 'facebook', 'linkedin', 'tiktok', 'twitter', 'youtube', 'website');
  CREATE TABLE "influencers_accounts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_influencers_accounts_platform" NOT NULL,
  	"handle" varchar,
  	"url" varchar NOT NULL
  );
  
  ALTER TABLE "pages_blocks_influencer_carousel" ADD COLUMN "section_id" varchar NOT NULL;
  ALTER TABLE "pages_blocks_influencer_carousel_locales" ADD COLUMN "intro" varchar;
  ALTER TABLE "influencers" ADD COLUMN "bio" varchar;
  ALTER TABLE "influencers_accounts" ADD CONSTRAINT "influencers_accounts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."influencers"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "influencers_accounts_order_idx" ON "influencers_accounts" USING btree ("_order");
  CREATE INDEX "influencers_accounts_parent_id_idx" ON "influencers_accounts" USING btree ("_parent_id");
  ALTER TABLE "influencers" DROP COLUMN "handle";
  ALTER TABLE "influencers" DROP COLUMN "platform";
  ALTER TABLE "influencers" DROP COLUMN "profile_url";
  DROP TYPE "public"."enum_influencers_platform";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_influencers_platform" AS ENUM('instagram', 'tiktok');
  DROP TABLE "influencers_accounts" CASCADE;
  ALTER TABLE "influencers" ADD COLUMN "handle" varchar NOT NULL;
  ALTER TABLE "influencers" ADD COLUMN "platform" "enum_influencers_platform" NOT NULL;
  ALTER TABLE "influencers" ADD COLUMN "profile_url" varchar NOT NULL;
  ALTER TABLE "pages_blocks_influencer_carousel" DROP COLUMN "section_id";
  ALTER TABLE "pages_blocks_influencer_carousel_locales" DROP COLUMN "intro";
  ALTER TABLE "influencers" DROP COLUMN "bio";
  DROP TYPE "public"."enum_influencers_accounts_platform";`)
}
