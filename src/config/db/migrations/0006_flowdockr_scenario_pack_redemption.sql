CREATE TABLE IF NOT EXISTS "scenario_pack_redemption" (
  "id" text PRIMARY KEY NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "stripe_checkout_session_id" text NOT NULL,
  "user_id" text NOT NULL,
  "pack_id" text NOT NULL,
  "credits_granted" integer NOT NULL,
  "credit_id" text,
  CONSTRAINT "scenario_pack_redemption_stripe_checkout_session_id_unique"
    UNIQUE ("stripe_checkout_session_id"),
  CONSTRAINT "scenario_pack_redemption_user_id_user_id_fk"
    FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade,
  CONSTRAINT "chk_scenario_pack_redemption_credits_positive"
    CHECK ("credits_granted" > 0)
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_scenario_pack_redemption_user_created"
ON "scenario_pack_redemption" USING btree ("user_id", "created_at");
