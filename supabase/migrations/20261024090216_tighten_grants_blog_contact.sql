/*
# Tighten grants on blog_posts and contact_messages

1. Security Changes
- `blog_posts`: Revoke INSERT, UPDATE, DELETE from anon and authenticated. Only SELECT is needed by the frontend (public read of published posts). The owner manages posts through the Supabase dashboard with service_role.
- `contact_messages`: Revoke SELECT, UPDATE, DELETE from anon and authenticated. Only INSERT is needed by the frontend (public can submit messages). The owner reads/manages messages through the Supabase dashboard with service_role.
- RLS policies remain unchanged and correct: blog_posts has SELECT-only (published=true), contact_messages has INSERT-only.
*/

REVOKE INSERT, UPDATE, DELETE ON blog_posts FROM anon, authenticated;
REVOKE SELECT, UPDATE, DELETE ON contact_messages FROM anon, authenticated;
