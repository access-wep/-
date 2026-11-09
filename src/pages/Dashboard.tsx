import { Calendar, Plus, CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import type { User, Task } from '@/lib/supabase'

interface DashboardProps {
  user: User
  isAdmin: boolean
  onPageChange: (page: 'dashboard' | 'payment' | 'admin') => void
}

export default function Dashboard({ user, isAdmin, onPageChange }: DashboardProps) {
  const today = new Date().toISOString().split('T')[0]

  const tasks: Task[] = [
    {
      id: '1',
      user_id: user.id,
      title: 'Ù…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„ØªÙ‚Ø±ÙŠØ± Ø§Ù„Ø´Ù‡Ø±ÙŠ',
      description: 'ØªØ­Ù‚Ù‚ Ù…Ù† Ø§Ù„Ø£Ø±Ù‚Ø§Ù… ÙˆØ§Ù„Ø¥Ø­ØµØ§Ø¦ÙŠØ§Øª',
      due_date: today,
      priority: 'high',
      completed: false,
      period_type: 'daily',
      period_start: null,
      period_end: null,
      created_at: today,
      updated_at: today
    },
    {
      id: '2',
      user_id: user.id,
      title: 'Ø§Ø¬ØªÙ…Ø§Ø¹ Ø§Ù„ÙØ±ÙŠÙ‚',
      description: 'Ù†Ù‚Ø§Ø´ Ø®Ø·Ø© Ø§Ù„Ø±Ø¨Ø¹ Ø§Ù„Ù‚Ø§Ø¯Ù…',
      due_date: today,
      priority: 'medium',
      completed: true,
      period_type: 'daily',
      period_start: null,
      period_end: null,
      created_at: today,
      updated_at: today
    },
    {
      id: '3',
      user_id: user.id,
      title: 'ØªØ³Ù„ÙŠÙ… Ø§Ù„Ù…Ø´Ø±ÙˆØ¹',
      description: 'Ø¥Ù†Ù‡Ø§Ø¡ Ø¬Ù…ÙŠØ¹ Ø§Ù„Ù…Ù‡Ø§Ù… Ø§Ù„Ù…ØªØ¨Ù‚ÙŠØ©',
      due_date: '2026-11-15',
      priority: 'high',
      completed: false,
      period_type: 'weekly',
      period_start: today,
      period_end: '2026-11-15',
      created_at: today,
      updated_at: today
    }
  ]

  const pendingTasks = tasks.filter(t => !t.completed)
  const completedTasks = tasks.filter(t => t.completed)

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Ù…Ø±Ø­Ø¨Ø§Ù‹ØŒ {user.name}</h2>
          <p className="text-muted-foreground mt-1">Ù„Ø¯ÙŠÙƒ {pendingTasks.length} Ù…Ù‡Ø§Ù… Ù…Ø¹Ù„Ù‚Ø©</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onPageChange('payment')}
            className="px-4 py-2 border border-border rounded-md hover:bg-accent transition-colors flex items-center gap-2"
          >
            <Clock className="h-4 w-4" />
            Ø§Ù„Ø¯ÙØ¹ ÙˆØ§Ù„Ø§Ø´ØªØ±Ø§Ùƒ
          </button>
          {isAdmin && (
            <button
              onClick={() => onPageChange('admin')}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Ù„ÙˆØ­Ø© Ø§Ù„ØªØ­ÙƒÙ… Ø§Ù„Ø¥Ø¯Ø§Ø±ÙŠØ©
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 border border-border rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="h-5 w-5 text-success" />
            <span className="text-sm text-muted-foreground">Ù…Ù‡Ø§Ù… Ù…ÙƒØªÙ…Ù„Ø©</span>
          </div>
          <p className="text-3xl font-semibold">{completedTasks.length}</p>
        </div>
        <div className="p-6 border border-border rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="h-5 w-5 text-warning" />
            <span className="text-sm text-muted-foreground">Ù…Ù‡Ø§Ù… Ù…Ø¹Ù„Ù‚Ø©</span>
          </div>
          <p className="text-3xl font-semibold">{pendingTasks.length}</p>
        </div>
        <div className="p-6 border border-border rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="h-5 w-5 text-info" />
            <span className="text-sm text-muted-foreground">Ø§Ù„ÙŠÙˆÙ…</span>
          </div>
          <p className="text-3xl font-semibold">{new Date().toLocaleDateString('ar-SA')}</p>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Ø¬Ø¯ÙˆÙ„ Ø§Ù„Ù…Ù‡Ø§Ù…</h3>
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Ø§Ù„Ù…Ù‡Ù…Ø©</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Ø§Ù„Ø£ÙˆÙ„ÙˆÙŠØ©</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Ø§Ø³ØªØ­Ù‚Ø§Ù‚</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Ø§Ù„Ø­Ø§Ù„Ø©</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tasks.map(task => (
                <tr key={task.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {task.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2 border-border" />
                      )}
                      <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
                        {task.title}
                      </span>
                    </div>
                    {task.description && (
                      <p className="text-sm text-muted-foreground mr-6 mt-1">{task.description}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.priority === 'high' ? 'bg-destructive/10 text-destructive' :
                      task.priority === 'medium' ? 'bg-warning/10 text-warning' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {task.priority === 'high' ? 'Ø¹Ø§Ù„ÙŠØ©' : task.priority === 'medium' ? 'Ù…ØªÙˆØ³Ø·Ø©' : 'Ù…Ù†Ø®ÙØ¶Ø©'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{task.due_date}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.completed ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                    }`}>
                      {task.completed ? 'Ù…ÙƒØªÙ…Ù„' : 'Ù‚ÙŠØ¯ Ø§Ù„ØªÙ†ÙÙŠØ°'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Period Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Ø§Ø®ØªØ± Ø§Ù„ÙØªØ±Ø© Ø§Ù„Ø²Ù…Ù†ÙŠØ©</h3>
        <div className="flex gap-3 flex-wrap">
          <button className="px-4 py-2 border-2 border-primary bg-primary/5 text-primary rounded-md font-medium">
            Ø£Ø³Ø¨ÙˆØ¹ÙŠ
          </button>
          <button className="px-4 py-2 border border-border rounded-md hover:bg-accent transition-colors">
            Ø´Ù‡Ø±ÙŠ
          </button>
          <button className="px-4 py-2 border border-border rounded-md hover:bg-accent transition-colors">
            ÙØªØ±Ø© Ù…Ø®ØµØµØ©
          </button>
        </div>
      </div>
    </div>
  )
}
