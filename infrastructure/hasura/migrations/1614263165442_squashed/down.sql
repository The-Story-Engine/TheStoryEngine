
alter table "public"."waitlist" drop constraint "proper_email";
alter table "public"."waitlist" add constraint "proper_email" check (CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'::text));

alter table "public"."waitlist" drop constraint "waitlist_email_key";

alter table "public"."waitlist" drop constraint "waitlist_pkey";
alter table "public"."waitlist"
    add constraint "waitlist_pkey" 
    primary key ( "email" );

ALTER TABLE "public"."waitlist" ALTER COLUMN "lists" TYPE ARRAY;
ALTER TABLE "public"."waitlist" ALTER COLUMN "lists" SET NOT NULL;

ALTER TABLE "public"."waitlist" DROP COLUMN "confirmed";

DROP TABLE "public"."waitlist";
