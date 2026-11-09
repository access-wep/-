import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY in environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type User = {
  id: string
  phone: string
  email: string
  name: string
  age: number
  created_at: string
  updated_at: string
}

export type Subscription = {
  id: string
  user_id: string
  plan_type: 'monthly' | 'yearly'
  status: 'active' | 'past_due' | 'canceled' | 'completed'
  current_period_start: string
  current_period_end: string
  cancel_at_period_end: boolean
  created_at: string
  updated_at: string
}

export type Payment = {
  id: string
  user_id: string
  subscription_id: string
  amount: number
  currency: string
  method: string
  status: 'pending' | 'approved' | 'rejected' | 'completed'
  receipt_url: string | null
  admin_notes: string | null
  created_at: string
  updated_at: string
}

export type DiscountCode = {
  id: string
  code: string
  discount_type: 'percentage' | 'fixed'
  discount_value: number
  max_uses: number | null
  times_used: number
  valid_from: string
  valid_until: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export type Task = {
  id: string
  user_id: string
  title: string
  description: string | null
  due_date: string
  priority: 'low' | 'medium' | 'high'
  completed: boolean
  period_type: 'daily' | 'weekly' | 'custom'
  period_start: string | null
  period_end: string | null
  created_at: string
  updated_at: string
}

export type AdminSetting = {
  key: string
  value: string
  updated_by: string | null
  updated_at: string
}
