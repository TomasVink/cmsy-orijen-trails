import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "stores" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"address" varchar NOT NULL,
  	"postcode" varchar NOT NULL,
  	"city" varchar NOT NULL,
  	"logo_id" integer NOT NULL,
  	"url" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "stores_locales" (
  	"store_message" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "posts_rels" ADD COLUMN "stores_id" integer;
  ALTER TABLE "trails_rels" ADD COLUMN "stores_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "stores_id" integer;
  ALTER TABLE "stores" ADD CONSTRAINT "stores_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stores_locales" ADD CONSTRAINT "stores_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stores"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "stores_logo_idx" ON "stores" USING btree ("logo_id");
  CREATE INDEX "stores_updated_at_idx" ON "stores" USING btree ("updated_at");
  CREATE INDEX "stores_created_at_idx" ON "stores" USING btree ("created_at");
  CREATE UNIQUE INDEX "stores_locales_locale_parent_id_unique" ON "stores_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_stores_fk" FOREIGN KEY ("stores_id") REFERENCES "public"."stores"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trails_rels" ADD CONSTRAINT "trails_rels_stores_fk" FOREIGN KEY ("stores_id") REFERENCES "public"."stores"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_stores_fk" FOREIGN KEY ("stores_id") REFERENCES "public"."stores"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_rels_stores_id_idx" ON "posts_rels" USING btree ("stores_id");
  CREATE INDEX "trails_rels_stores_id_idx" ON "trails_rels" USING btree ("stores_id");
  CREATE INDEX "payload_locked_documents_rels_stores_id_idx" ON "payload_locked_documents_rels" USING btree ("stores_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "stores" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "stores_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "stores" CASCADE;
  DROP TABLE "stores_locales" CASCADE;
  ALTER TABLE "posts_rels" DROP CONSTRAINT "posts_rels_stores_fk";
  
  ALTER TABLE "trails_rels" DROP CONSTRAINT "trails_rels_stores_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_stores_fk";
  
  DROP INDEX "posts_rels_stores_id_idx";
  DROP INDEX "trails_rels_stores_id_idx";
  DROP INDEX "payload_locked_documents_rels_stores_id_idx";
  ALTER TABLE "posts_rels" DROP COLUMN "stores_id";
  ALTER TABLE "trails_rels" DROP COLUMN "stores_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "stores_id";`)
}
