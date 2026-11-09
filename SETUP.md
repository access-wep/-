# Ø¯Ù„ÙŠÙ„ Ø§Ù„Ø¥Ø¹Ø¯Ø§Ø¯ Ø§Ù„ÙƒØ§Ù…Ù„ - Ø¬Ø¯ÙˆÙ„ ØªÙ†Ø¸ÙŠÙ…

## ðŸ“‹ Ø§Ù„Ù…ØªØ·Ù„Ø¨Ø§Øª Ø§Ù„Ù…Ø³Ø¨Ù‚Ø©

### 1. Ø­Ø³Ø§Ø¨ Supabase
- Ø§Ø°Ù‡Ø¨ Ø¥Ù„Ù‰ https://supabase.com/dashboard
- Ø³Ø¬Ù„ Ø­Ø³Ø§Ø¨ Ø¬Ø¯ÙŠØ¯ (Ù…Ø¬Ø§Ù†ÙŠ)
- Ø£Ù†Ø´Ø¦ Ù…Ø´Ø±ÙˆØ¹ Ø¬Ø¯ÙŠØ¯

### 2. Ø¥Ø¹Ø¯Ø§Ø¯ Ù‚Ø§Ø¹Ø¯Ø© Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª
1. Ù…Ù† Ù„ÙˆØ­Ø© ØªØ­ÙƒÙ… SupabaseØŒ Ø§Ø°Ù‡Ø¨ Ø¥Ù„Ù‰ **SQL Editor**
2. Ø§Ù†Ø³Ø® Ù…Ø­ØªÙˆÙ‰ Ù…Ù„Ù [supabase/schema.sql](./supabase/schema.sql) ÙƒØ§Ù…Ù„Ø§Ù‹
3. Ø§Ù„ØµÙ‚Ù‡ ÙÙŠ Ø§Ù„Ù…Ø­Ø±Ø± ÙˆØ§Ø¶ØºØ· **Run**
4. Ø§Ù†ØªØ¸Ø± Ø­ØªÙ‰ ØªØ¸Ù‡Ø± Ø±Ø³Ø§Ù„Ø© "Success"

### 3. ØªÙØ¹ÙŠÙ„ Ø§Ù„Ù…ØµØ§Ø¯Ù‚Ø© Ø¨Ù€ Google OAuth
1. Ù…Ù† Supabase Dashboard â†’ Authentication â†’ Providers
2. ÙØ¹Ù‘Ù„ **Google** provider
3. Ø§Ø­ÙØ¸ **Client ID** Ùˆ **Client Secret** Ù…Ù† Google Cloud Console
4. Ø£Ø¶Ù Redirect URL ÙÙŠ Google Cloud: `https://YOUR_PROJECT.supabase.co/auth/v1/callback`

### 4. Ø¥Ø¹Ø¯Ø§Ø¯ Ù…ØªØºÙŠØ±Ø§Øª Ø§Ù„Ø¨ÙŠØ¦Ø©
Ø§Ù†Ø³Ø® `.env.example` Ø¥Ù„Ù‰ `.env.local` ÙˆØ£Ø¶Ù Ù‚ÙŠÙ…Ùƒ:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

---

## ðŸš€ Ø±ÙØ¹ Ø¹Ù„Ù‰ Cloudflare Pages

### Ø§Ù„Ø·Ø±ÙŠÙ‚Ø© Ø§Ù„Ø³Ù‡Ù„Ø© (Auto-deploy)
1. Ø§Ø°Ù‡Ø¨ Ø¥Ù„Ù‰ https://dash.cloudflare.com/pages
2. Ø§Ø¶ØºØ· **Create a project** â†’ **Connect to Git**
3. Ø§Ø®ØªØ± Ù…Ø³ØªÙˆØ¯Ø¹ `access-wep/-`
4. Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª Ø§Ù„Ø¨Ù†Ø§Ø¡:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/`
5. Ø§Ø¶ØºØ· **Save and Deploy**

### Ø·Ø±ÙŠÙ‚Ø© Ø§Ù„Ù†Ø´Ø± Ø§Ù„ÙŠØ¯ÙˆÙŠ
```bash
npm run build
# Ø«Ù… Ø§Ø±ÙØ¹ Ù…Ø¬Ù„Ø¯ dist Ø¥Ù„Ù‰ Cloudflare via Workers & Pages
```

---

## ðŸ‘¤ Ø¬Ø¹Ù„ Ù†ÙØ³Ùƒ Admin

Ø¨Ø¹Ø¯ Ø§Ù„ØªØ³Ø¬ÙŠÙ„ØŒ Ø´ØºÙ„ Ù‡Ø°Ø§ SQL ÙÙŠ Supabase SQL Editor Ù„ØªØ¬Ø¹Ù„ Ø­Ø³Ø§Ø¨Ùƒ Ù…Ø³Ø¤ÙˆÙ„Ø§Ù‹:

```sql
UPDATE profiles SET is_admin = true WHERE email = 'YOUR_EMAIL@example.com';
```

---

## âœ… Ø±Ù…ÙˆØ² Ø§Ù„Ø®ØµÙ… Ø§Ù„ØªØ¬Ø±ÙŠØ¨ÙŠØ©

| Ø§Ù„Ø±Ù…Ø² | Ø§Ù„Ø®ØµÙ… | Ø§Ù„Ø§Ø³ØªØ®Ø¯Ø§Ù… |
|-------|--------|-----------|
| `SAVE20` | 20% | Ø¹Ø§Ù… |
| `YEAR50` | 50% | Ø§Ù„Ø®Ø·Ø© Ø§Ù„Ø³Ù†ÙˆÙŠØ© |

---

## ðŸ“ Ù‡ÙŠÙƒÙ„ Ø§Ù„Ù…Ù„ÙØ§Øª

```
wep/
â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ pages/           # Ø§Ù„ØµÙØ­Ø§Øª Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©
â”‚   â”‚   â”œâ”€â”€ LoginForm.tsx
â”‚   â”‚   â”œâ”€â”€ RegisterForm.tsx
â”‚   â”‚   â”œâ”€â”€ TermsPage.tsx
â”‚   â”‚   â”œâ”€â”€ Dashboard.tsx
â”‚   â”‚   â”œâ”€â”€ PaymentPage.tsx
â”‚   â”‚   â””â”€â”€ AdminDashboard.tsx
â”‚   â”œâ”€â”€ lib/             # Ù…ÙƒØªØ¨Ø§Øª ÙˆØ¸ÙŠÙÙŠØ©
â”‚   â”‚   â””â”€â”€ supabase.ts  # Ø¹Ù…ÙŠÙ„ Supabase
â”‚   â”œâ”€â”€ hooks/           # Custom React hooks
â”‚   â”‚   â””â”€â”€ useAuth.ts
â”‚   â”œâ”€â”€ App.tsx          # Ù…ÙƒÙˆÙ† Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠ
â”‚   â””â”€â”€ main.tsx         # Ù†Ù‚Ø·Ø© Ø§Ù„Ø¯Ø®ÙˆÙ„
â”œâ”€â”€ supabase/
â”‚   â””â”€â”€ schema.sql       # Ù…Ø®Ø·Ø· Ù‚Ø§Ø¹Ø¯Ø© Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª
â””â”€â”€ .env.example         # Ù†Ù…ÙˆØ°Ø¬ Ù…ØªØºÙŠØ±Ø§Øª Ø§Ù„Ø¨ÙŠØ¦Ø©
```

---

## ðŸ”§Troubleshooting

### Ø§Ù„Ù…Ø´ÙƒÙ„Ø©: "Missing SUPABASE_URL"
**Ø§Ù„Ø­Ù„**: ØªØ£ÙƒØ¯ Ù…Ù† Ø¥Ù†Ø´Ø§Ø¡ Ù…Ù„Ù `.env.local` ÙˆØªØ¹Ø¨Ø¦ØªÙ‡ Ø¨Ø§Ù„Ù‚ÙŠÙ… Ø§Ù„ØµØ­ÙŠØ­Ø©

### Ø§Ù„Ù…Ø´ÙƒÙ„Ø©: Ø§Ù„Ø®Ø·Ø£ 401 Ø¹Ù†Ø¯ ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„
**Ø§Ù„Ø­Ù„**: ØªØ­Ù‚Ù‚ Ù…Ù† Ø£Ù† RLS policies Ù…ÙØ¹Ù‘Ù„Ø© ÙÙŠ Supabase

### Ø§Ù„Ù…Ø´ÙƒÙ„Ø©: Ù„Ø§ ÙŠØ¹Ù…Ù„ Google Sign-in
**Ø§Ù„Ø­Ù„**: ØªØ­Ù‚Ù‚ Ù…Ù† Ø£Ù† Redirect URL Ù…Ø¶Ø¨ÙˆØ· ÙÙŠ ÙƒÙ„ Ù…Ù† Google Cloud Ùˆ Supabase
