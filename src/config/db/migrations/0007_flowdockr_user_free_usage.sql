CREATE TABLE IF NOT EXISTS "user_free_usage" (
  "user_id" text PRIMARY KEY NOT NULL,
  "free_generations_used" integer DEFAULT 0 NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "user_free_usage_user_id_user_id_fk"
    FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade,
  CONSTRAINT "chk_user_free_usage_non_negative"
    CHECK ("free_generations_used" >= 0)
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_user_free_usage_updated"
ON "user_free_usage" USING btree ("updated_at");
