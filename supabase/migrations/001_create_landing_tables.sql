-- Tiesverse landing site — 7 dynamic collections
-- Run this in Supabase Dashboard → SQL Editor
-- Admin (Django) writes via service_role key; public site reads via anon key.

-- ── 1. webinars ───────────────────────────────────────────────────────────────
-- Canonical source is Turso (webinar.tiesverse.com).
-- Admin mirrors a copy here on publish so tiesverse.com can list them.
CREATE TABLE IF NOT EXISTS webinars (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title             text NOT NULL,
  speaker           text NOT NULL,
  org               text,
  date              text NOT NULL,          -- "May 17, 2026"
  time_tz           text,                   -- "4:00 PM IST"
  registration_link text,
  cover_url         text,
  tag               text,                   -- "Upcoming" | "Workshop"
  kind              text,                   -- "workshop" etc.
  status            text NOT NULL DEFAULT 'upcoming',  -- upcoming | past
  created_by        text,
  created_at        timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE webinars ENABLE ROW LEVEL SECURITY;
CREATE POLICY "webinars_public_read" ON webinars FOR SELECT USING (true);

-- ── 2. events ─────────────────────────────────────────────────────────────────
-- Offline summits, conclaves, city engagements.
CREATE TABLE IF NOT EXISTS events (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text NOT NULL,
  category    text,                          -- Summit | Salon | Meetup | Workshop | Roundtable
  city        text,
  venue       text,
  date        text NOT NULL,
  time        text,
  host        text,
  price       integer NOT NULL DEFAULT 0,
  orig_price  integer,                       -- original price before discount
  capacity    integer,
  attended    text,                          -- "350+ attended"
  note        text,
  flagship    boolean NOT NULL DEFAULT false,
  past        boolean NOT NULL DEFAULT false,
  cover_url   text,
  register_url text,
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "events_public_read" ON events FOR SELECT USING (true);

-- ── 3. articles ───────────────────────────────────────────────────────────────
-- Covers both short insights (WORK) and full reports (REPORTS).
CREATE TABLE IF NOT EXISTS articles (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        text UNIQUE NOT NULL,
  title       text NOT NULL,
  dek         text,                          -- subtitle / standfirst
  cat         text,                          -- short category label: "Technology", "Economy" …
  topic       text,                          -- filter group: "Geopolitics", "Geoeconomics" …
  kind        text NOT NULL DEFAULT 'Article', -- Article | Report | Brief | Analysis
  date        text,
  read_time   text,
  cover_url   text NOT NULL,
  featured    boolean NOT NULL DEFAULT false,
  published   boolean NOT NULL DEFAULT true,
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "articles_public_read" ON articles FOR SELECT USING (published = true);

-- ── 4. youtube_videos ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS youtube_videos (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title         text NOT NULL,
  video_id      text NOT NULL,              -- YouTube video ID (not the full URL)
  thumbnail_url text,
  published_at  text,
  category      text,
  created_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE youtube_videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "youtube_videos_public_read" ON youtube_videos FOR SELECT USING (true);

-- ── 5. workshops ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS workshops (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title        text NOT NULL,
  description  text,
  date         text,
  time_tz      text,
  host         text,
  cover_url    text,
  register_url text,
  status       text NOT NULL DEFAULT 'upcoming',  -- upcoming | past
  created_at   timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE workshops ENABLE ROW LEVEL SECURITY;
CREATE POLICY "workshops_public_read" ON workshops FOR SELECT USING (true);

-- ── 6. team_members ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS team_members (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text NOT NULL,
  role          text NOT NULL,
  bio           text,
  photo_url     text,
  department    text,
  is_founder    boolean NOT NULL DEFAULT false,
  display_order integer NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "team_members_public_read" ON team_members FOR SELECT USING (true);

-- ── 7. guests ─────────────────────────────────────────────────────────────────
-- Past guests & speakers. featured = true → show in testimonials carousel.
CREATE TABLE IF NOT EXISTS guests (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL,
  role       text NOT NULL,
  org        text,
  photo_url  text,
  quote      text,
  featured   boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "guests_public_read" ON guests FOR SELECT USING (true);
