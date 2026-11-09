import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Phone, Mail, User, Calendar, AlertCircle } from 'lucide-react'

interface RegisterFormProps {
  onBackToLogin: () => void
  onAcceptTerms: () => void
}

export default function RegisterForm({ onBackToLogin, onAcceptTerms }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  function validate(): boolean {
    if (formData.password !== formData.confirmPassword) {
      setError('ÙƒÙ„Ù…ØªØ§ Ø§Ù„Ù…Ø±ÙˆØ± ØºÙŠØ± Ù…ØªØ·Ø§Ø¨Ù‚ØªÙŠÙ†')
      return false
    }
    if (parseInt(formData.age) < 18) {
      setError('ÙŠØ¬Ø¨ Ø£Ù† ÙŠÙƒÙˆÙ† Ø¹Ù…Ø±Ùƒ 18 Ø³Ù†Ø© Ø¹Ù„Ù‰ Ø§Ù„Ø£Ù‚Ù„')
      return false
    }
    if (!/^\+?\d{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      setError('Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ ØºÙŠØ± ØµØ­ÙŠØ­')
      return false
    }
    return true
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      await signUp(formData.email, formData.password, {
        name: formData.name,
        phone: formData.phone,
        age: parseInt(formData.age)
      })
      onAcceptTerms()
    } catch (err: any) {
      setError(err.message || 'ÙØ´Ù„ Ø§Ù„ØªØ³Ø¬ÙŠÙ„')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-semibold">Ø¥Ù†Ø´Ø§Ø¡ Ø­Ø³Ø§Ø¨ Ø¬Ø¯ÙŠØ¯</h2>
          <p className="text-muted-foreground">Ø§Ù†Ø¶Ù… Ø¥Ù„Ù‰ Ø¬Ø¯ÙˆÙ„ ØªÙ†Ø¸ÙŠÙ…</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Ø§Ù„Ø§Ø³Ù… Ø§Ù„ÙƒØ§Ù…Ù„</label>
            <div className="relative">
              <User className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-4 pr-10 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Ø§Ø³Ù…Ùƒ Ø§Ù„ÙƒØ§Ù…Ù„"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ</label>
            <div className="relative">
              <Phone className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-4 pr-10 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="+966 5XXXXXXXX"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ</label>
            <div className="relative">
              <Mail className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-4 pr-10 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="example@email.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Ø§Ù„Ø¹Ù…Ø±</label>
              <div className="relative">
                <Calendar className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="1"
                  max="120"
                  className="w-full pl-4 pr-10 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="18+"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">ÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ±</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                required
                minLength={8}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">ØªØ£ÙƒÙŠØ¯ ÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ±</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
              required
            />
          </div>

          {formData.age && parseInt(formData.age) < 18 && (
            <div className="flex items-center gap-2 p-3 bg-warning/10 text-warning text-sm rounded-md">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span>ÙŠØ¬Ø¨ Ø£Ù† ÙŠÙƒÙˆÙ† Ø¹Ù…Ø±Ùƒ 18 Ø³Ù†Ø© Ø¹Ù„Ù‰ Ø§Ù„Ø£Ù‚Ù„ Ù„Ù„ØªØ³Ø¬ÙŠÙ„</span>
            </div>
          )}

          {error && (
            <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Ø¬Ø§Ø±ÙŠ Ø§Ù„ØªØ³Ø¬ÙŠÙ„...' : 'Ø¥Ù†Ø´Ø§Ø¡ Ø­Ø³Ø§Ø¨'}
          </button>
        </form>

        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Ù„Ø¯ÙŠÙƒ Ø­Ø³Ø§Ø¨ Ø¨Ø§Ù„ÙØ¹Ù„ØŸ{' '}
            <button
              onClick={onBackToLogin}
              className="text-primary hover:underline font-medium"
            >
              ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
