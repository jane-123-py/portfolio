/*
# Create blog posts and contact messages tables

1. New Tables
- `blog_posts`
  - `id` (uuid, primary key)
  - `title` (text, not null) — the post title
  - `slug` (text, unique, not null) — URL-friendly identifier
  - `excerpt` (text) — short summary shown in the blog list
  - `content` (text) — full post body in markdown
  - `tags` (text[]) — optional tags for categorization
  - `published` (boolean, default false) — whether the post is visible to visitors
  - `created_at` (timestamptz, default now())
  - `updated_at` (timestamptz, default now())
- `contact_messages`
  - `id` (uuid, primary key)
  - `name` (text, not null) — sender's name
  - `email` (text, not null) — sender's email
  - `subject` (text) — optional subject line
  - `message` (text, not null) — the message body
  - `read` (boolean, default false) — whether the owner has read this message
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on both tables.
- `blog_posts`: grant SELECT to `anon, authenticated` so visitors can read published posts; allow public read of published posts only. No public write — the owner manages posts through the Supabase dashboard.
- `contact_messages`: grant INSERT to `anon, authenticated` so visitors can submit contact form messages; no public SELECT or UPDATE — only the owner (via service_role / dashboard) can read and manage messages.
- All policies are single-tenant (no sign-in) since this is a portfolio site with no user accounts.
*/

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text,
  tags text[] DEFAULT '{}',
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON blog_posts TO anon, authenticated;

DROP POLICY IF EXISTS "public_read_published_posts" ON blog_posts;
CREATE POLICY "public_read_published_posts"
ON blog_posts FOR SELECT
TO anon, authenticated
USING (published = true);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON contact_messages TO anon, authenticated;

DROP POLICY IF EXISTS "public_insert_contact_messages" ON contact_messages;
CREATE POLICY "public_insert_contact_messages"
ON contact_messages FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Index for faster slug lookups
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published) WHERE published = true;
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
