-- Ø¬Ø¯ÙˆÙ„ Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…ÙŠÙ† (profiles)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  phone text not null,
  email text not null unique,
  name text not null,
  age integer not null check (age >= 18),
  is_admin boolean default false,
  terms_accepted_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Ø¬Ø¯ÙˆÙ„ Ø§Ù„Ø§Ø´ØªØ±Ø§ÙƒØ§Øª
create table subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  plan_type text not null check (plan_type in ('monthly', 'yearly')),
  status text not null default 'pending' check (status in ('pending', 'active', 'past_due', 'canceled', 'completed')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Ø¬Ø¯ÙˆÙ„ Ø§Ù„Ù…Ø¯ÙÙˆØ¹Ø§Øª
create table payments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  subscription_id uuid references subscriptions(id) on delete set null,
  amount decimal not null,
  currency text default 'USD',
  method text not null check (method in ('credit_card', 'bank_transfer', 'manual')),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'completed')),
  receipt_url text,
  admin_notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Ø¬Ø¯ÙˆÙ„ Ø±Ù…ÙˆØ² Ø§Ù„Ø®ØµÙ…
create table discount_codes (
  id uuid default gen_random_uuid() primary key,
  code text not null unique,
  discount_type text not null check (discount_type in ('percentage', 'fixed')),
  discount_value decimal not null,
  max_uses integer,
  times_used integer default 0,
  valid_from timestamptz not null,
  valid_until timestamptz,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Ø¬Ø¯ÙˆÙ„ Ø§Ù„Ù…Ù‡Ø§Ù…
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
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Ø¬Ø¯ÙˆÙ„ Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª Ø§Ù„Ø¥Ø¯Ø§Ø±Ø©
create table admin_settings (
  key text primary key,
  value jsonb not null,
  updated_by uuid references profiles(id),
  updated_at timestamptz default now()
);

-- Row Level Security
alter table profiles enable row level security;
alter table subscriptions enable row level security;
alter table payments enable row level security;
alter table discount_codes enable row level security;
alter table tasks enable row level security;
alter table admin_settings enable row level security;

-- Policies for profiles
create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- Policies for subscriptions
create policy "Users can view own subscriptions"
  on subscriptions for select
  using (auth.uid() = user_id);

create policy "Users can create own subscriptions"
  on subscriptions for insert
  with check (auth.uid() = user_id);

-- Policies for payments
create policy "Users can view own payments"
  on payments for select
  using (auth.uid() = user_id);

create policy "Users can create own payments"
  on payments for insert
  with check (auth.uid() = user_id);

-- Admin policies for payments (approve/reject)
create policy "Admins can update payments"
  on payments for all
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid() and profiles.is_admin = true
    )
  );

-- Policies for discount_codes
create policy "Anyone can view active discounts"
  on discount_codes for select
  using (is_active = true);

create policy "Admins can manage discounts"
  on discount_codes for all
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid() and profiles.is_admin = true
    )
  );

-- Policies for tasks
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

-- Policies for admin_settings
create policy "Admins can manage settings"
  on admin_settings for all
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid() and profiles.is_admin = true
    )
  );

-- Trigger for updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

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

-- Insert default admin setting
insert into admin_settings (key, value) values
  ('monthly_price', '29.99'),
  ('yearly_price', '299.99');
