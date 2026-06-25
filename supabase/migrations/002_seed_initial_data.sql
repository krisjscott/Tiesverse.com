-- Tiesverse landing — initial seed data
-- Sourced from site.js static data (Jun 2026 snapshot).
-- Admin will replace / extend via admin panel.
-- Run in Supabase Dashboard → SQL Editor AFTER 001_create_landing_tables.sql

-- ── webinars ──────────────────────────────────────────────────────────────────
INSERT INTO webinars (title, speaker, org, date, time_tz, registration_link, cover_url, tag, kind, status) VALUES
  ('Checkmate & Chatter: The TIES Debate Competition',
   'TIES', 'Inter-college debate competition',
   'Jul 12, 2026', '11:00 AM IST',
   'https://www.tiesverse.com/workshop',
   '/work/poster-checkmate-chatter.webp',
   'Workshop', 'workshop', 'upcoming'),

  ('Middle Powers in the Age of Great Power Competition',
   'Ms. Carice Witte', 'Founder & Exec. Director, SIGNAL Group',
   'Jun 04, 2026', '4:00 PM IST',
   NULL, '/work/poster-witte.webp',
   'Past', NULL, 'past'),

  ('New Voices, New Power: Youth and India''s Evolving Political Arena',
   'Viraansh Bhanushali', 'Oxford · The Oxford Union',
   'May 17, 2026', '4:00 PM IST',
   NULL, '/work/poster-bhanushali.webp',
   NULL, NULL, 'past'),

  ('India''s BRICS Presidency: Balancing China''s Influence',
   'Antara Ghosal Singh', 'Fellow, ORF',
   'May 08, 2026', '4:30 PM IST',
   NULL, '/work/poster-ghosal-singh.webp',
   NULL, NULL, 'past'),

  ('The Structural Causes of World Poverty',
   'Prof. Thomas Pogge', 'Yale University',
   'Apr 23, 2026', '4:00 PM IST',
   NULL, '/work/poster-pogge.webp',
   NULL, NULL, 'past'),

  ('Nuclear Geopolitics in a Fragmented World Order: Workshop',
   'Dr. Reshmi Kazi', 'Jamia Millia Islamia',
   'Apr 10–11, 2026', NULL,
   NULL, NULL,
   NULL, 'workshop', 'past'),

  ('Balancing Freedom of Navigation and Military Posturing',
   'Capt. Sarabjeet Singh Parmar (Retd.)', 'Council for Strategic & Defence Research',
   'Mar 28, 2026', NULL,
   NULL, NULL,
   NULL, NULL, 'past'),

  ('Nuclear Politics and Strategy',
   'Dr. Anamika Asthana', 'SIS, Pune',
   'Feb 13, 2026', NULL,
   NULL, NULL,
   NULL, NULL, 'past'),

  ('Shadow Wars & Strategic Shifts: Israel, Iran & West Asia',
   'Dr. Alvite Ningthoujam', 'Symbiosis Institute',
   'Feb 09, 2026', NULL,
   NULL, NULL,
   NULL, NULL, 'past'),

  ('China''s Doctrine of Cognitive Domain Operations',
   'Prof. (Dr.) Sriparna Pathak', 'O.P. Jindal School',
   'Jan 23, 2026', NULL,
   NULL, NULL,
   NULL, NULL, 'past'),

  ('Intelligence in Grey-Zone Conflicts',
   'Dr. Paul McGarr', 'King''s College London',
   'Jan 13, 2026', NULL,
   NULL, NULL,
   NULL, NULL, 'past');

-- ── events ────────────────────────────────────────────────────────────────────
INSERT INTO events (title, category, city, venue, date, time, host, price, orig_price, capacity, attended, note, flagship, past, cover_url) VALUES
  ('India AI Impact Summit',
   'Summit', 'New Delhi', 'Bharat Mandapam',
   'Apr 12, 2026', '10:00 AM', 'TIES · India AI',
   0, NULL, NULL, '350+ attended',
   'Countering disinformation & building resilient societies in the age of AI.',
   true, true, '/work/event-india-ai.webp'),

  ('Geopolitics Live: The Delhi Salon',
   'Salon', 'New Delhi', 'India Habitat Centre',
   'Jun 28, 2026', '6:30 PM', 'Foreign Policy India',
   499, 799, 80, NULL,
   NULL,
   false, false, NULL),

  ('The Bharat Age: UPSC Strategy Meetup',
   'Meetup', 'Bengaluru', 'Cubbon Pavilion',
   'Jul 05, 2026', '11:00 AM', 'The Bharat Age',
   0, NULL, 120, NULL,
   NULL,
   false, false, NULL),

  ('Newsroom Masterclass: Explainers that Travel',
   'Workshop', 'Mumbai', 'BKC Studio',
   'Jul 12, 2026', '4:00 PM', 'Nimble',
   999, 1499, 40, NULL,
   NULL,
   false, false, NULL),

  ('Tabloid Live: Reading the World',
   'Salon', 'Pune', 'FC Road Loft',
   'Jul 19, 2026', '6:00 PM', 'Tabloid by Ties',
   299, 499, 100, NULL,
   NULL,
   false, false, NULL),

  ('Finties Forum: Markets & Macro',
   'Roundtable', 'Mumbai', 'Nariman Point',
   'Aug 02, 2026', '5:00 PM', 'Finties',
   699, 999, 60, NULL,
   NULL,
   false, false, NULL),

  ('Geo Atlas Night: Maps & Power',
   'Meetup', 'Hyderabad', 'HITEC City',
   'Aug 16, 2026', '7:00 PM', 'Geo Atlas',
   0, NULL, 90, NULL,
   NULL,
   false, false, NULL);

-- ── articles ──────────────────────────────────────────────────────────────────
-- Reports (full long-form research)
INSERT INTO articles (slug, title, dek, cat, topic, kind, date, read_time, cover_url, featured, published) VALUES
  ('geopolitical-geometry-of-global-trade',
   'The Geopolitical Geometry of Global Trade',
   'How corridors, chokepoints and new alliances are redrawing the map of economic power — and where Bharat stands in the next decade.',
   'Geoeconomics', 'Geoeconomics', 'Report', 'May 12, 2026', '18 min read',
   '/work/map-trade.webp', true, true),

  ('ai-wars-a-new-manhattan-project',
   'AI Wars: a new Manhattan Project',
   'The compute race, the talent race, and the new logic of national power.',
   'Technology', 'Technology', 'Report', 'Apr 28, 2026', '14 min read',
   '/work/insight-ai-wars.webp', false, true),

  ('why-budget-2026-matters',
   'Why Budget 2026 matters for India',
   'Reading the fine print like a strategist, not a headline.',
   'Economy', 'Economy', 'Brief', 'Apr 02, 2026', '9 min read',
   '/work/insight-budget-2026.webp', false, true),

  ('india-and-the-arctic',
   'India and the Arctic: a new frontier',
   'Trade, resources and great-power competition at the top of the world.',
   'Geopolitics', 'Geopolitics', 'Report', 'Mar 19, 2026', '12 min read',
   '/work/insight-arctic.webp', false, true),

  ('kamikaze-drones',
   'Kamikaze drones: jack of the new-age wars',
   'Cheap, expendable, decisive — how loitering munitions changed the battlefield.',
   'Defence', 'Defence', 'Brief', 'Mar 05, 2026', '8 min read',
   '/work/insight-kamikaze.webp', false, true),

  ('pax-silica-initiative',
   'What is the Pax Silica Initiative?',
   'Semiconductors as statecraft, and the contest to set the rules.',
   'Technology', 'Technology', 'Report', 'Feb 22, 2026', '11 min read',
   '/work/insight-pax-silica.webp', false, true),

-- Insights / shorter articles (from WORK in site.js)
  ('mother-of-all-deals-india-eu-fta',
   'The Mother of All Deals: a new era of India–EU FTA',
   'What the landmark India–EU Free Trade Agreement means for Bharat''s economic future.',
   'Geopolitics', 'Geopolitics', 'Article', 'Feb 10, 2026', '6 min read',
   '/work/mother-of-all-deals.webp', false, true),

  ('fact-vs-fiction-pakistan-amritsar-narrative',
   'Fact vs Fiction: Pakistan''s failed Amritsar narrative',
   'Separating disinformation from documented ground reality.',
   'Analysis', 'Geopolitics', 'Analysis', 'Jan 28, 2026', '7 min read',
   '/work/insight-fact-fiction.webp', false, true),

  ('seven-geopolitical-events-to-watch',
   '7 geopolitical events to watch',
   'The signals worth tracking in a year of compounding complexity.',
   'Briefs', 'Geopolitics', 'Article', 'Jan 15, 2026', '5 min read',
   '/work/insight-7-events.webp', false, true),

  ('faith-funds-future',
   'Faith, Funds, Future',
   'The intersection of religion, capital, and strategic intent in modern India.',
   'Opinion', 'Economy', 'Article', 'Jan 05, 2026', '6 min read',
   '/work/insight-faith-funds.webp', false, true),

  ('gita-natyashastra-unesco-memory-world',
   'Gita & Natyashastra in UNESCO''s Memory of the World',
   'What the inscription means for India''s civilisational diplomacy.',
   'Culture', 'Geopolitics', 'Article', 'Dec 20, 2025', '5 min read',
   '/work/insight-unesco.webp', false, true),

  ('sadak-suraksha-abhiyan-policy-public-conduct',
   'Sadak Suraksha Abhiyan: from policy to public conduct',
   'Tracing the gap between road safety legislation and lived reality.',
   'Public Policy', 'Economy', 'Analysis', 'Dec 10, 2025', '7 min read',
   '/work/insight-sadak-suraksha.webp', false, true);

-- ── youtube_videos ────────────────────────────────────────────────────────────
-- Placeholder videos — replace video_id with real YouTube IDs from @TiesIndia
INSERT INTO youtube_videos (title, video_id, thumbnail_url, published_at, category) VALUES
  ('India AI Impact Summit — Full Session Highlights',
   'REPLACE_WITH_REAL_ID', NULL, 'Apr 2026', 'Events'),
  ('Middle Powers in a Multipolar World | Ms. Carice Witte',
   'REPLACE_WITH_REAL_ID', NULL, 'Jun 2026', 'Webinars'),
  ('Budget 2026: What it means for India''s strategic future',
   'REPLACE_WITH_REAL_ID', NULL, 'Feb 2026', 'Analysis'),
  ('The Strait of Hormuz — Geopolitical Deep Dive',
   'REPLACE_WITH_REAL_ID', NULL, 'Jan 2026', 'Research');

-- ── workshops ─────────────────────────────────────────────────────────────────
INSERT INTO workshops (title, description, date, time_tz, host, cover_url, register_url, status) VALUES
  ('Checkmate & Chatter: The TIES Debate Competition',
   'Inter-college debate competition. Open to all college students across India.',
   'Jul 12, 2026', '11:00 AM IST',
   'TIES', '/work/poster-checkmate-chatter.webp',
   'https://www.tiesverse.com/workshop', 'upcoming'),

  ('Nuclear Geopolitics in a Fragmented World Order',
   'Two-day intensive workshop on nuclear strategy and geopolitical fragmentation with Dr. Reshmi Kazi.',
   'Apr 10–11, 2026', NULL,
   'TIES × Jamia Millia Islamia', NULL,
   NULL, 'past'),

  ('Newsroom Masterclass: Explainers that Travel',
   'How to craft research-driven explainers that reach mass audiences — with the Nimble editorial team.',
   'Jul 12, 2026', '4:00 PM IST',
   'Nimble', NULL,
   NULL, 'upcoming');

-- ── team_members ──────────────────────────────────────────────────────────────
-- Founders (photo_url will be populated once images are uploaded to Supabase Storage)
INSERT INTO team_members (name, role, bio, photo_url, department, is_founder, display_order) VALUES
  ('Hardik Pathak',
   'Co-Founder',
   'Master''s in Political Science; a strategist and cartographer whose fascination with maps and global affairs grew into a commitment to geopolitics and international relations. Conceptualised the Tiesverse Foundation to empower youth voices in policy and governance.',
   NULL, 'Leadership', true, 1),

  ('Pruthavirajsingh Dulat',
   'Co-Founder',
   'B.Tech (ECE) and co-founder at 20. Has steered the organisation''s growth across media and technology, building scalable platforms at the intersection of information, influence and innovation.',
   NULL, 'Leadership', true, 2),

-- Sample team members (replace with real data)
  ('Abhishek Singh',
   'Director — Management, Ops & Strategy',
   NULL, NULL, 'Operations', false, 3),

  ('Sample Research Lead',
   'Head of Research',
   NULL, NULL, 'Research', false, 4),

  ('Sample Media Lead',
   'Head of Media',
   NULL, NULL, 'Media', false, 5);

-- ── guests ────────────────────────────────────────────────────────────────────
INSERT INTO guests (name, role, org, photo_url, quote, featured) VALUES
  ('Shashi Tharoor',
   'MP, Lok Sabha', 'Parliament of India',
   '/work/guest-tharoor.webp',
   'Different voices, one mission, standing united against terrorism. Proud to see our shared message resonate worldwide.',
   true),

  ('Priyanka Chaturvedi',
   'MP, Rajya Sabha', 'Parliament of India',
   '/work/guest-chaturvedi.webp',
   'Fabulous. Clarity and creativity that genuinely get noticed.',
   true),

  ('Jitin Prasada',
   'MoS, Commerce & Industry', 'Government of India',
   NULL, NULL, false),

  ('Prof. Thomas Pogge',
   'Professor of Philosophy & International Affairs', 'Yale University',
   NULL, NULL, false),

  ('Ms. Carice Witte',
   'Founder & Executive Director', 'SIGNAL Group',
   NULL, NULL, false),

  ('Capt. Sarabjeet Singh Parmar (Retd.)',
   'Senior Fellow', 'Council for Strategic & Defence Research',
   NULL, NULL, false),

  ('Dr. Paul McGarr',
   'Reader in Intelligence & International Security', 'King''s College London',
   NULL, NULL, false),

  ('Antara Ghosal Singh',
   'Fellow', 'Observer Research Foundation',
   NULL, NULL, false),

  ('Dr. Reshmi Kazi',
   'Associate Professor', 'Jamia Millia Islamia',
   NULL, NULL, false),

  ('Pathikrit Payne',
   'Senior Research Fellow', 'SPMRF',
   NULL, NULL, false),

  ('Aditya Raj Kaul',
   'Senior Executive Editor', NULL,
   NULL, NULL, false),

  ('Prof. (Dr.) Sriparna Pathak',
   'Associate Professor', 'O.P. Jindal Global University',
   NULL, NULL, false);
