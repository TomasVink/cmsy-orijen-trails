import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_blog_locales" RENAME COLUMN "body" TO "intro";
  ALTER TABLE "pages_blocks_blog" DROP CONSTRAINT "pages_blocks_blog_image_id_media_id_fk";
  
  DROP INDEX "pages_blocks_blog_image_idx";
  ALTER TABLE "pages_blocks_blog" ADD COLUMN "section_id" varchar NOT NULL;
  ALTER TABLE "pages_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id");
  ALTER TABLE "pages_blocks_blog" DROP COLUMN "image_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_posts_fk";
  
  DROP INDEX "pages_rels_posts_id_idx";
  ALTER TABLE "pages_blocks_blog" ADD COLUMN "image_id" integer NOT NULL;
  ALTER TABLE "pages_blocks_blog_locales" ADD COLUMN "body" jsonb NOT NULL;
  ALTER TABLE "pages_blocks_blog" ADD CONSTRAINT "pages_blocks_blog_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_blog_image_idx" ON "pages_blocks_blog" USING btree ("image_id");
  ALTER TABLE "pages_blocks_blog" DROP COLUMN "section_id";
  ALTER TABLE "pages_blocks_blog_locales" DROP COLUMN "intro";
  ALTER TABLE "pages_rels" DROP COLUMN "posts_id";`)
}
