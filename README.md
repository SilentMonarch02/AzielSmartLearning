# AZIEL SMART LEARNING – school website

Static website (GitHub Pages) + Supabase backend (logins, roles, database, file storage). No demo data.

## Roles
| Role | Can do |
|---|---|
| **Web administrator** (you) | Everything: add/remove school admins and other web administrators, add teachers, post announcements/timetables, **turn the website OFF/ON**. Cannot be removed by the school admin. |
| **School admin** | Post announcements, events, timetables; add/remove **teachers only**; manage all notes, videos, classes. |
| **Teacher** | Upload notes and videos, schedule/host online classes, remove their own items. |

The system always keeps at least one web administrator.

## Setup (about 20 minutes)
1. **Supabase**: create a free project at supabase.com. Open *SQL Editor*, paste all of `supabase/schema.sql`, Run.
2. **Config**: copy *Project URL* and *anon public key* (Project Settings > API) into `config.js`.
3. **First web administrator**: in the SQL Editor run
   `insert into public.staff_invites(email, role) values ('YOUR-EMAIL', 'web_admin');`
   then open the site > **Staff** > *Create account* with that email. (If Supabase asks to confirm email, confirm it, then sign in. Or turn off *Confirm email* in Authentication > Providers > Email.)
4. **GitHub**: create a repository, upload all files in this folder (keep `index.html` at the top level), then *Settings > Pages > Deploy from branch > main / root*. Your site appears at `https://USERNAME.github.io/REPO/`.
5. In Supabase *Authentication > URL Configuration*, set *Site URL* to your GitHub Pages address.

## Adding people
Web administrator or school admin: **Staff area > Staff > Add staff** (email + role). That person opens the Staff page and uses *Create account* with the same email.

## Turning the website off (web administrator only)
**Staff area > Website status > Turn site OFF.** Visitors see your message; announcements, timetables, notes and videos stop being served to the public. Only you can still sign in, from the same screen, to turn it back ON. For a complete hard stop, also disable GitHub Pages (repo Settings > Pages).

## File sizes
`schema.sql` allows files up to 1 GB, but Supabase's own project limit applies: **50 MB on the free plan**. For 1 GB uploads, use the Pro plan and raise *Storage > Settings > Global file size limit*. Large videos are more reliable as YouTube/Drive links (paste the link instead of uploading).

## Not included yet
Student/parent portal, results and report cards, online fee payment (M-Pesa Daraja). The demo versions were removed; these need extra tables and a payment service. Fees are still paid by Paybill 400200, account 40722.
