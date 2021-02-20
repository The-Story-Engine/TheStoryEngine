CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."blog_mailing_list"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "email" text NOT NULL, "confirmed" boolean NOT NULL DEFAULT false, PRIMARY KEY ("email") );
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_blog_mailing_list_updated_at"
BEFORE UPDATE ON "public"."blog_mailing_list"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_blog_mailing_list_updated_at" ON "public"."blog_mailing_list" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
