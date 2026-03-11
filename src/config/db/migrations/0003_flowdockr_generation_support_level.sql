ALTER TABLE "feature_entitlement"
ADD COLUMN IF NOT EXISTS "follow_up_enabled" boolean DEFAULT false NOT NULL;
--> statement-breakpoint
UPDATE "feature_entitlement" fe
SET
  "follow_up_enabled" = CASE
    WHEN s."support_level" = 'studio' THEN true
    ELSE false
  END,
  "updated_at" = now()
FROM "user_billing_state" s
WHERE s."user_id" = fe."user_id";
--> statement-breakpoint
ALTER TABLE "generation"
ADD COLUMN IF NOT EXISTS "support_level" text DEFAULT 'free' NOT NULL;
--> statement-breakpoint
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'chk_generation_support_level'
  ) THEN
    ALTER TABLE "generation"
      ADD CONSTRAINT "chk_generation_support_level"
      CHECK ("support_level" IN ('free', 'quick_help', 'pro', 'studio'));
  END IF;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_generation_support_level_created"
ON "generation" USING btree ("support_level", "created_at");
--> statement-breakpoint
UPDATE "generation"
SET "support_level" = CASE
  WHEN "strategy_json" LIKE '%"supportLevel":"studio"%' THEN 'studio'
  WHEN "strategy_json" LIKE '%"supportLevel":"pro"%' THEN 'pro'
  WHEN "strategy_json" LIKE '%"supportLevel":"quick_help"%' THEN 'quick_help'
  WHEN "is_free_generation" = true THEN 'free'
  WHEN "credits_charged" > 0 THEN 'pro'
  ELSE 'free'
END
WHERE "support_level" IS NULL
   OR "support_level" = 'free';
