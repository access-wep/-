import { useState, useEffect } from 'react'
import { useAuth } from './hooks/useAuth'
import LoginForm from './pages/LoginForm'
import RegisterForm from './pages/RegisterForm'
import TermsPage from './pages/TermsPage'
import Dashboard from './pages/Dashboard'
import PaymentPage from './pages/PaymentPage'
import AdminDashboard from './pages/AdminDashboard'
import { supabase } from './lib/supabase'

export default function App() {
  const { user, loading, signOut } = useAuth()
  const [page, setPage] = useState<'login' | 'register' | 'terms' | 'dashboard' | 'payment' | 'admin'>('login')
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (user) {
      checkAdmin()
    }
  }, [user])

  async function checkAdmin() {
    const { data } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user!.id)
      .single()

    setIsAdmin(data?.is_admin || false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {user && (
        <header className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold">Ø¬Ø¯ÙˆÙ„ ØªÙ†Ø¸ÙŠÙ…</h1>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">{user.name}</span>
              <button
                onClick={() => {
                  signOut()
                  setPage('login')
                }}
                className="px-4 py-2 text-sm border border-border rounded-md hover:bg-accent transition-colors"
              >
                Ø®Ø±ÙˆØ¬
              </button>
            </div>
          </div>
        </header>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8">
        {!user && page === 'login' && (
          <LoginForm
            onSwitchToRegister={() => setPage('register')}
            onSwitchToTerms={() => setPage('terms')}
          />
        )}

        {!user && page === 'register' && (
          <RegisterForm
            onBackToLogin={() => setPage('login')}
            onAcceptTerms={() => setPage('terms')}
          />
        )}

        {!user && page === 'terms' && (
          <TermsPage
            onAccept={() => setPage('register')}
            onDecline={() => setPage('login')}
          />
        )}

        {user && page === 'dashboard' && (
          <Dashboard user={user} isAdmin={isAdmin} onPageChange={setPage} />
        )}

        {user && page === 'payment' && (
          <PaymentPage user={user} onBack={() => setPage('dashboard')} />
        )}

        {user && isAdmin && page === 'admin' && (
          <AdminDashboard user={user} onBack={() => setPage('dashboard')} />
        )}
      </main>
    </div>
  )
}
