CREATE TABLE IF NOT EXISTS "rate_limit_counter" (
  "id" text PRIMARY KEY NOT NULL,
  "bucket" text NOT NULL,
  "key_hash" text NOT NULL,
  "window_start" timestamp NOT NULL,
  "count" integer DEFAULT 0 NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "uniq_rate_limit_counter_window"
ON "rate_limit_counter" USING btree ("bucket", "key_hash", "window_start");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_rate_limit_counter_updated"
ON "rate_limit_counter" USING btree ("updated_at");
