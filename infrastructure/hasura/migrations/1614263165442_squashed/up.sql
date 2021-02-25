
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."waitlist"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "email" text NOT NULL, "lists" Text[] NOT NULL, "donations" jsonb NOT NULL DEFAULT jsonb_build_array(), PRIMARY KEY ("email") , UNIQUE ("id"), CONSTRAINT "proper_email" CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'));
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
CREATE TRIGGER "set_public_waitlist_updated_at"
BEFORE UPDATE ON "public"."waitlist"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_waitlist_updated_at" ON "public"."waitlist" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

ALTER TABLE "public"."waitlist" ADD COLUMN "confirmed" boolean NOT NULL DEFAULT false;

ALTER TABLE "public"."waitlist" ALTER COLUMN "lists" TYPE text[];
ALTER TABLE "public"."waitlist" ALTER COLUMN "lists" DROP NOT NULL;

alter table "public"."waitlist" drop constraint "waitlist_pkey";
alter table "public"."waitlist"
    add constraint "waitlist_pkey" 
    primary key ( "id" );

alter table "public"."waitlist" add constraint "waitlist_email_key" unique ("email");

alter table "public"."waitlist" drop constraint "proper_email";
alter table "public"."waitlist" add constraint "proper_email" check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'::text);
