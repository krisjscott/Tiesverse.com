-- Add django_id to each table so the admin panel can upsert without duplicating.
-- Run after 001_create_landing_tables.sql

ALTER TABLE events        ADD COLUMN IF NOT EXISTS django_id integer UNIQUE;
ALTER TABLE articles      ADD COLUMN IF NOT EXISTS django_id integer UNIQUE;
ALTER TABLE youtube_videos ADD COLUMN IF NOT EXISTS django_id integer UNIQUE;
ALTER TABLE workshops     ADD COLUMN IF NOT EXISTS django_id integer UNIQUE;
ALTER TABLE team_members  ADD COLUMN IF NOT EXISTS django_id integer UNIQUE;
ALTER TABLE guests        ADD COLUMN IF NOT EXISTS django_id integer UNIQUE;
-- webinars are managed via the webinar admin module (Turso), not tiesverse_app
