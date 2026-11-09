-- ============================================================================
-- Ø¬Ø¯ÙˆÙ„ ØªÙ†Ø¸ÙŠÙ… - Organization Scheduler
-- Ù‚Ø§Ø¹Ø¯Ø© Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø¨Ø§Ø³ØªØ®Ø¯Ø§Ù… Supabase (PostgreSQL)
-- ============================================================================

-- ØªÙ…ÙƒÙŠÙ† UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================================
-- Ø¬Ø¯ÙˆÙ„ Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…ÙŠÙ† (profiles)
-- ============================================================================
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  phone text not null,
  email text not null unique,
  name text not null,
  age integer not null check (age >= 18),
  avatar_url text,
  is_admin boolean default false,
  terms_accepted_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table profiles is 'Ø¬Ø¯ÙˆÙ„ ØªØ®Ø²ÙŠÙ† Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…ÙŠÙ† Ø¨Ø¹Ø¯ Ø§Ù„ØªØ³Ø¬ÙŠÙ„';
comment on column profiles.is_admin is 'ÙŠØ´ÙŠØ± Ø¥Ù„Ù‰ Ù…Ø§ Ø¥Ø°Ø§ ÙƒØ§Ù† Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù… Ù„Ø¯ÙŠÙ‡ ØµÙ„Ø§Ø­ÙŠØ§Øª Ø¥Ø¯Ø§Ø±ÙŠØ©';
comment on column profiles.terms_accepted_at is 'ØªØ§Ø±ÙŠØ® Ù‚Ø¨ÙˆÙ„ Ø´Ø±ÙˆØ· Ø§Ù„Ø§Ø³ØªØ®Ø¯Ø§Ù…';

-- ============================================================================
-- Ø¬Ø¯ÙˆÙ„ Ø§Ù„Ø§Ø´ØªØ±Ø§ÙƒØ§Øª (subscriptions)
-- ============================================================================
create table subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  plan_type text not null check (plan_type in ('monthly', 'yearly')),
  status text not null default 'pending' check (status in ('pending', 'active', 'past_due', 'canceled', 'completed')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean default false,
  stripe_subscription_id text,
  payment_method text default 'manual',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table subscriptions is 'Ø¬Ø¯ÙˆÙ„ ØªØªØ¨Ø¹ Ø§Ø´ØªØ±Ø§ÙƒØ§Øª Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…ÙŠÙ†';
comment on column subscriptions.stripe_subscription_id is 'Ù…Ø¹Ø±Ù Ø§Ù„Ø§Ø´ØªØ±Ø§Ùƒ ÙÙŠ Stripe (Ø§Ø®ØªÙŠØ§Ø±ÙŠ)';

-- ============================================================================
-- Ø¬Ø¯ÙˆÙ„ Ø§Ù„Ù…Ø¯ÙÙˆØ¹Ø§Øª (payments)
-- ============================================================================
create table payments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  subscription_id uuid references subscriptions(id) on delete set null,
  amount decimal(10, 2) not null,
  currency text default 'USD',
  method text not null check (method in ('credit_card', 'bank_transfer', 'paypal', 'manual')),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'completed', 'refunded')),
  receipt_url text,
  admin_notes text,
  approved_by uuid references profiles(id),
  approved_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table payments is 'Ø¬Ø¯ÙˆÙ„ ØªØªØ¨Ø¹ Ø·Ù„Ø¨Ø§Øª Ø§Ù„Ø¯ÙØ¹ ÙˆØ§Ù„Ù…ÙˆØ§ÙÙ‚Ø© Ø¹Ù„ÙŠÙ‡Ø§';
comment on column payments.approved_by is 'Ù…Ø¹Ø±Ù Ø§Ù„Ù…Ø³Ø¤ÙˆÙ„ Ø§Ù„Ø°ÙŠ ÙˆØ§ÙÙ‚ Ø¹Ù„Ù‰ Ø§Ù„Ø¯ÙØ¹';

-- ============================================================================
-- Ø¬Ø¯ÙˆÙ„ Ø±Ù…ÙˆØ² Ø§Ù„Ø®ØµÙ… (discount_codes)
-- ============================================================================
create table discount_codes (
  id uuid default gen_random_uuid() primary key,
  code text not null unique,
  description text,
  discount_type text not null check (discount_type in ('percentage', 'fixed')),
  discount_value decimal(10, 2) not null,
  max_uses integer,
  times_used integer default 0,
  valid_from timestamptz not null,
  valid_until timestamptz,
  applicable_plans text[] default array['monthly', 'yearly'],
  is_active boolean default true,
  created_by uuid references profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table discount_codes is 'Ø¬Ø¯ÙˆÙ„ Ø±Ù…ÙˆØ² Ø§Ù„Ø®ØµÙ… ÙˆØ§Ù„Ø®ØµÙˆÙ…Ø§Øª Ø§Ù„Ù…ØªØ§Ø­Ø©';
comment on column discount_codes.applicable_plans is 'Ø§Ù„Ø®Ø·Ø· Ø§Ù„ØªÙŠ ÙŠÙ†Ø·Ø¨Ù‚ Ø¹Ù„ÙŠÙ‡Ø§ Ø§Ù„Ø®ØµÙ…';

-- ============================================================================
-- Ø¬Ø¯ÙˆÙ„ Ø§Ù„Ù…Ù‡Ø§Ù… (tasks)
-- ============================================================================
create table tasks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  title text not null,
  description text,
  due_date date not null,
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high')),
  completed boolean default false,
  period_type text not null check (period_type in ('daily', 'weekly', 'custom')),
  period_start date,
  period_end date,
  category text default 'general',
  reminder_enabled boolean default false,
  reminder_time time,
  tags text[],
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table tasks is 'Ø¬Ø¯ÙˆÙ„ Ø§Ù„Ù…Ù‡Ø§Ù… Ø§Ù„ÙŠÙˆÙ…ÙŠØ© ÙˆØ§Ù„Ø£Ø³Ø¨ÙˆØ¹ÙŠØ© ÙˆØ§Ù„Ø´Ù‡Ø±ÙŠØ©';
comment on column tasks.category is 'ØªØµÙ†ÙŠÙ Ø§Ù„Ù…Ù‡Ù…Ø© (Ø¹Ù…Ù„ØŒ Ø´Ø®ØµÙŠØŒ ØªØ¹Ù„ÙŠÙ…ÙŠ...)';
comment on column tasks.tags is 'ÙˆØ³ÙˆÙ… Ù„Ù„Ù…Ø³Ø§Ø¹Ø¯Ø© ÙÙŠ Ø§Ù„ØªÙ†Ø¸ÙŠÙ…';

-- ============================================================================
-- Ø¬Ø¯ÙˆÙ„ Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª Ø§Ù„Ø¥Ø¯Ø§Ø±Ø© (admin_settings)
-- ============================================================================
create table admin_settings (
  key text primary key,
  value jsonb not null,
  description text,
  updated_by uuid references profiles(id),
  updated_at timestamptz default now()
);

comment on table admin_settings is 'Ø¬Ø¯ÙˆÙ„ Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª Ø§Ù„Ù…ÙˆÙ‚Ø¹ ÙˆØ§Ù„Ù‚ÙˆØ§Ø¹Ø¯ Ø§Ù„Ø¹Ø§Ù…Ø©';

-- ============================================================================
-- Ø¬Ø¯ÙˆÙ„ Ø§Ù„Ø¥Ø´Ø¹Ø§Ø±Ø§Øª (notifications)
-- ============================================================================
create table notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  type text not null check (type in ('payment_approved', 'payment_rejected', 'task_reminder', 'system_announcement')),
  title text not null,
  message text not null,
  is_read boolean default false,
  link text,
  created_at timestamptz default now()
);

comment on table notifications is 'Ø¬Ø¯ÙˆÙ„ Ø¥Ø´Ø¹Ø§Ø±Ø§Øª Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…ÙŠÙ†';

-- ============================================================================
-- Row Level Security (RLS)
-- ============================================================================
alter table profiles enable row level security;
alter table subscriptions enable row level security;
alter table payments enable row level security;
alter table discount_codes enable row level security;
alter table tasks enable row level security;
alter table admin_settings enable row level security;
alter table notifications enable row level security;

-- ============================================================================
-- Policies - Profiles
-- ============================================================================
create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

create policy "Admins can view all profiles"
  on profiles for select
  using (
    exists (
      select 1 from profiles p
      where p.id = auth.uid() and p.is_admin = true
    )
  );

create policy "Public profiles are viewable"
  on profiles for select
  using (true);

-- ============================================================================
-- Policies - Subscriptions
-- ============================================================================
create policy "Users can view own subscriptions"
  on subscriptions for select
  using (auth.uid() = user_id);

create policy "Users can create own subscriptions"
  on subscriptions for insert
  with check (auth.uid() = user_id);

create policy "Admins can manage all subscriptions"
  on subscriptions for all
  using (
    exists (
      select 1 from profiles p
      where p.id = auth.uid() and p.is_admin = true
    )
  );

-- ============================================================================
-- Policies - Payments
-- ============================================================================
create policy "Users can view own payments"
  on payments for select
  using (auth.uid() = user_id);

create policy "Users can create own payments"
  on payments for insert
  with check (auth.uid() = user_id);

create policy "Admins can view all payments"
  on payments for select
  using (
    exists (
      select 1 from profiles p
      where p.id = auth.uid() and p.is_admin = true
    )
  );

create policy "Admins can update payments"
  on payments for update
  using (
    exists (
      select 1 from profiles p
      where p.id = auth.uid() and p.is_admin = true
    )
  );

-- ============================================================================
-- Policies - Discount Codes
-- ============================================================================
create policy "Anyone can view active discounts"
  on discount_codes for select
  using (is_active = true and valid_from <= now() and (valid_until is null or valid_until >= now()));

create policy "Admins can manage all discounts"
  on discount_codes for all
  using (
    exists (
      select 1 from profiles p
      where p.id = auth.uid() and p.is_admin = true
    )
  );

-- ============================================================================
-- Policies - Tasks
-- ============================================================================
create policy "Users can view own tasks"
  on tasks for select
  using (auth.uid() = user_id);

create policy "Users can create own tasks"
  on tasks for insert
  with check (auth.uid() = user_id);

create policy "Users can update own tasks"
  on tasks for update
  using (auth.uid() = user_id);

create policy "Users can delete own tasks"
  on tasks for delete
  using (auth.uid() = user_id);

-- ============================================================================
-- Policies - Admin Settings
-- ============================================================================
create policy "Admins can manage settings"
  on admin_settings for all
  using (
    exists (
      select 1 from profiles p
      where p.id = auth.uid() and p.is_admin = true
    )
  );

-- ============================================================================
-- Policies - Notifications
-- ============================================================================
create policy "Users can view own notifications"
  on notifications for select
  using (auth.uid() = user_id);

create policy "Users can update own notifications"
  on notifications for update
  using (auth.uid() = user_id);

create policy "System can insert notifications"
  on notifications for insert
  with check (true);

-- ============================================================================
-- Functions
-- ============================================================================

-- Ø¯Ø§Ù„Ø© ØªØ­Ø¯ÙŠØ« Ø­Ù‚Ù„ updated_at ØªÙ„Ù‚Ø§Ø¦ÙŠØ§Ù‹
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Ø¯Ø§Ù„Ø© Ø§Ù„ØªØ­Ù‚Ù‚ Ù…Ù† ØµÙ„Ø§Ø­ÙŠØ© Ø±Ù…Ø² Ø§Ù„Ø®ØµÙ…
create or replace function validate_discount_code(input_code text)
returns table (
  valid boolean,
  discount_type text,
  discount_value decimal,
  remaining_uses integer
) as $$
declare
  discount_record discount_codes%rowtype;
begin
  select * into discount_record
  from discount_codes
  where code = upper(input_code)
    and is_active = true
    and valid_from <= now()
    and (valid_until is null or valid_until >= now());

  if found then
    if discount_record.max_uses is null or discount_record.times_used < discount_record.max_uses then
      valid := true;
      discount_type := discount_record.discount_type;
      discount_value := discount_record.discount_value;
      remaining_uses := case
        when discount_record.max_uses is null then null
        else discount_record.max_uses - discount_record.times_used
      end;
    else
      valid := false;
    end if;
  else
    valid := false;
  end if;
  return next;
end;
$$ language plpgsql stable;

-- Ø¯Ø§Ù„Ø© ØªØ­Ø¯ÙŠØ« Ø¹Ø¯Ø¯ Ø§Ø³ØªØ®Ø¯Ø§Ù…Ø§Øª Ø±Ù…Ø² Ø§Ù„Ø®ØµÙ…
create or replace function increment_discount_usage(discount_id uuid)
returns void as $$
begin
  update discount_codes
  set times_used = times_used + 1
  where id = discount_id;
end;
$$ language plpgsql;

-- ============================================================================
-- Triggers
-- ============================================================================
create trigger update_profiles_updated_at before update on profiles
  for each row execute function update_updated_at_column();

create trigger update_subscriptions_updated_at before update on subscriptions
  for each row execute function update_updated_at_column();

create trigger update_payments_updated_at before update on payments
  for each row execute function update_updated_at_column();

create trigger update_discount_codes_updated_at before update on discount_codes
  for each row execute function update_updated_at_column();

create trigger update_tasks_updated_at before update on tasks
  for each row execute function update_updated_at_column();

create trigger update_notifications_updated_at before update on notifications
  for each row execute function update_updated_at_column();

-- ============================================================================
-- Ø¨ÙŠØ§Ù†Ø§Øª Ø§ÙØªØ±Ø§Ø¶ÙŠØ©
-- ============================================================================

-- Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª Ø§Ù„Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ø§ÙØªØ±Ø§Ø¶ÙŠØ©
insert into admin_settings (key, value, description) values
  ('monthly_price', '"29.99"'::jsonb, 'Ø³Ø¹Ø± Ø§Ù„Ø®Ø·Ø© Ø§Ù„Ø´Ù‡Ø±ÙŠØ© Ø¨Ø§Ù„Ø¯ÙˆÙ„Ø§Ø±'),
  ('yearly_price', '"299.99"'::jsonb, 'Ø³Ø¹Ø± Ø§Ù„Ø®Ø·Ø© Ø§Ù„Ø³Ù†ÙˆÙŠØ© Ø¨Ø§Ù„Ø¯ÙˆÙ„Ø§Ø±'),
  ('site_name', '"Ø¬Ø¯ÙˆÙ„ ØªÙ†Ø¸ÙŠÙ…"'::jsonb, 'Ø§Ø³Ù… Ø§Ù„Ù…ÙˆÙ‚Ø¹'),
  ('support_email', '"support@example.com"'::jsonb, 'Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¯Ø¹Ù… Ø§Ù„ÙÙ†ÙŠ');

-- Ø±Ù…ÙˆØ² Ø®ØµÙ… ØªØ¬Ø±ÙŠØ¨ÙŠØ©
insert into discount_codes (code, description, discount_type, discount_value, max_uses, valid_from, applicable_plans) values
  ('SAVE20', 'Ø®ØµÙ… 20% Ø¹Ù„Ù‰ Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø®Ø·Ø·', 'percentage', 20.00, 100, '2026-01-01', array['monthly', 'yearly']),
  ('YEAR50', 'Ø®ØµÙ… 50% Ø¹Ù„Ù‰ Ø§Ù„Ø®Ø·Ø© Ø§Ù„Ø³Ù†ÙˆÙŠØ©', 'percentage', 50.00, 50, '2026-11-01', array['yearly']),
  ('WELCOME10', 'Ø®ØµÙ… ØªØ±Ø­ÙŠØ¨ÙŠ 10%', 'percentage', 10.00, null, '2026-01-01', array['monthly', 'yearly']);

-- ============================================================================
-- ÙÙ‡Ø±Ø³Ø© Ù„ØªØ­Ø³ÙŠÙ† Ø§Ù„Ø£Ø¯Ø§Ø¡
-- ============================================================================
create index if not exists idx_profiles_email on profiles(email);
create index if not exists idx_profiles_is_admin on profiles(is_admin);
create index if not exists idx_subscriptions_user_id on subscriptions(user_id);
create index if not exists idx_subscriptions_status on subscriptions(status);
create index if not exists idx_payments_user_id on payments(user_id);
create index if not exists idx_payments_status on payments(status);
create index if not exists idx_tasks_user_id on tasks(user_id);
create index if not exists idx_tasks_due_date on tasks(due_date);
create index if not exists idx_tasks_completed on tasks(completed);
create index if not exists idx_notifications_user_id on notifications(user_id);
create index if not exists idx_notifications_is_read on notifications(is_read);

