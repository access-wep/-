import { useState } from 'react'
import { Settings, DollarSign, Tag, CheckCircle, XCircle, Plus, Edit2, Trash2 } from 'lucide-react'
import type { User, Payment, DiscountCode, AdminSetting } from '@/lib/supabase'

interface AdminDashboardProps {
  user: User
  onBack: () => void
}

export default function AdminDashboard({ user, onBack }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'pricing' | 'discounts' | 'payments'>('pricing')

  // Pricing state
  const [monthlyPrice, setMonthlyPrice] = useState(29.99)
  const [yearlyPrice, setYearlyPrice] = useState(299.99)

  // Discount codes state
  const [discounts, setDiscounts] = useState<DiscountCode[]>([
    {
      id: '1',
      code: 'SAVE20',
      discount_type: 'percentage',
      discount_value: 20,
      max_uses: 100,
      times_used: 12,
      valid_from: '2026-01-01',
      valid_until: null,
      is_active: true,
      created_at: '2026-01-01',
      updated_at: '2026-01-01'
    },
    {
      id: '2',
      code: 'YEAR50',
      discount_type: 'percentage',
      discount_value: 50,
      max_uses: 50,
      times_used: 3,
      valid_from: '2026-11-01',
      valid_until: '2026-12-31',
      is_active: true,
      created_at: '2026-11-01',
      updated_at: '2026-11-01'
    }
  ])
  const [newCode, setNewCode] = useState('')
  const [newDiscount, setNewDiscount] = useState(0)

  // Payments state
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: '1',
      user_id: 'user1',
      subscription_id: 'sub1',
      amount: 29.99,
      currency: 'USD',
      method: 'bank_transfer',
      status: 'pending',
      receipt_url: '/receipts/receipt1.jpg',
      admin_notes: null,
      created_at: '2026-11-08',
      updated_at: '2026-11-08'
    },
    {
      id: '2',
      user_id: 'user2',
      subscription_id: 'sub2',
      amount: 299.99,
      currency: 'USD',
      method: 'bank_transfer',
      status: 'approved',
      receipt_url: '/receipts/receipt2.jpg',
      admin_notes: 'ØªÙ…Øª Ø§Ù„Ù…ÙˆØ§ÙÙ‚Ø©',
      created_at: '2026-11-07',
      updated_at: '2026-11-08'
    }
  ])

  function handleApprove(paymentId: string) {
    setPayments(payments.map(p =>
      p.id === paymentId ? { ...p, status: 'approved', admin_notes: 'ØªÙ…Øª Ø§Ù„Ù…ÙˆØ§ÙÙ‚Ø©', updated_at: new Date().toISOString().split('T')[0] } : p
    ))
  }

  function handleReject(paymentId: string) {
    setPayments(payments.map(p =>
      p.id === paymentId ? { ...p, status: 'rejected', admin_notes: 'Ù…Ø±ÙÙˆØ¶', updated_at: new Date().toISOString().split('T')[0] } : p
    ))
  }

  function handleAddDiscount() {
    if (!newCode || newDiscount <= 0) return
    const newDiscountObj: DiscountCode = {
      id: Date.now().toString(),
      code: newCode.toUpperCase(),
      discount_type: 'percentage',
      discount_value: newDiscount,
      max_uses: null,
      times_used: 0,
      valid_from: new Date().toISOString().split('T')[0],
      valid_until: null,
      is_active: true,
      created_at: new Date().toISOString().split('T')[0]
    }
    setDiscounts([...discounts, newDiscountObj])
    setNewCode('')
    setNewDiscount(0)
  }

  function handleDeleteDiscount(discountId: string) {
    setDiscounts(discounts.filter(d => d.id !== discountId))
  }

  function handleToggleDiscount(discountId: string) {
    setDiscounts(discounts.map(d =>
      d.id === discountId ? { ...d, is_active: !d.is_active } : d
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Ù„ÙˆØ­Ø© Ø§Ù„ØªØ­ÙƒÙ… Ø§Ù„Ø¥Ø¯Ø§Ø±ÙŠØ©</h2>
        <button onClick={onBack} className="text-muted-foreground hover:text-foreground text-sm">
          â† Ø§Ù„Ø¹ÙˆØ¯Ø© Ù„Ù„ÙˆØ­Ø© Ø§Ù„ØªØ­ÙƒÙ…
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('pricing')}
            className={`pb-3 px-1 font-medium transition-colors ${
              activeTab === 'pricing' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'
            }`}
          >
            <DollarSign className="h-4 w-4 inline mr-2" />
            Ø§Ù„Ø£Ø³Ø¹Ø§Ø±
          </button>
          <button
            onClick={() => setActiveTab('discounts')}
            className={`pb-3 px-1 font-medium transition-colors ${
              activeTab === 'discounts' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'
            }`}
          >
            <Tag className="h-4 w-4 inline mr-2" />
            Ø®ØµÙˆÙ…Ø§Øª
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`pb-3 px-1 font-medium transition-colors ${
              activeTab === 'payments' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'
            }`}
          >
            <Settings className="h-4 w-4 inline mr-2" />
            Ø·Ù„Ø¨Ø§Øª Ø§Ù„Ø¯ÙØ¹
          </button>
        </div>
      </div>

      {/* Pricing Tab */}
      {activeTab === 'pricing' && (
        <div className="space-y-4">
          <h3 className="font-semibold">ØªØ¹Ø¯ÙŠÙ„ Ø§Ù„Ø£Ø³Ø¹Ø§Ø±</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Ø§Ù„Ø³Ø¹Ø± Ø§Ù„Ø´Ù‡Ø±ÙŠ ($)</label>
              <input
                type="number"
                value={monthlyPrice}
                onChange={(e) => setMonthlyPrice(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Ø§Ù„Ø³Ø¹Ø± Ø§Ù„Ø³Ù†ÙˆÙŠ ($)</label>
              <input
                type="number"
                value={yearlyPrice}
                onChange={(e) => setYearlyPrice(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            Ø­ÙØ¸ Ø§Ù„Ø£Ø³Ø¹Ø§Ø±
          </button>
        </div>
      )}

      {/* Discounts Tab */}
      {activeTab === 'discounts' && (
        <div className="space-y-6">
          <h3 className="font-semibold">Ø¥Ø¯Ø§Ø±Ø© Ø±Ù…ÙˆØ² Ø§Ù„Ø®ØµÙ…</h3>

          {/* Add new discount */}
          <div className="p-4 border border-border rounded-lg space-y-3">
            <h4 className="text-sm font-medium">Ø¥Ø¶Ø§ÙØ© Ø±Ù…Ø² Ø®ØµÙ… Ø¬Ø¯ÙŠØ¯</h4>
            <div className="grid grid-cols-3 gap-3">
              <input
                type="text"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                placeholder="Ø±Ù…Ø² Ø§Ù„Ø®ØµÙ… (Ù…Ø«Ù„: SAVE20)"
                className="px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <input
                type="number"
                value={newDiscount || ''}
                onChange={(e) => setNewDiscount(parseInt(e.target.value))}
                placeholder="Ù†Ø³Ø¨Ø© Ø§Ù„Ø®ØµÙ… %"
                min="1"
                max="100"
                className="px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                onClick={handleAddDiscount}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Ø¥Ø¶Ø§ÙØ©
              </button>
            </div>
          </div>

          {/* Discount list */}
          <div className="space-y-3">
            {discounts.map(discount => (
              <div key={discount.id} className="p-4 border border-border rounded-lg flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-muted font-mono text-sm rounded">{discount.code}</span>
                  <span className="text-sm">{discount.discount_value}% Ø®ØµÙ…</span>
                  {discount.valid_until && (
                    <span className="text-xs text-muted-foreground">
                      Ø­ØªÙ‰ {discount.valid_until}
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">
                    Ù…Ø³ØªØ®Ø¯Ù…: {discount.times_used}{discount.max_uses ? `/${discount.max_uses}` : ''}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleDiscount(discount.id)}
                    className={`px-3 py-1 rounded text-sm ${
                      discount.is_active ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {discount.is_active ? 'Ù†Ø´Ø·' : 'Ù…Ø¹Ø·Ù„'}
                  </button>
                  <button
                    onClick={() => handleDeleteDiscount(discount.id)}
                    className="p-2 hover:bg-destructive/10 rounded transition-colors text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payments Tab */}
      {activeTab === 'payments' && (
        <div className="space-y-4">
          <h3 className="font-semibold">Ø·Ù„Ø¨Ø§Øª Ø§Ù„Ø¯ÙØ¹ Ø§Ù„Ù…Ø¹Ù„Ù‚Ø©</h3>

          {payments.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              Ù„Ø§ ØªÙˆØ¬Ø¯ Ø·Ù„Ø¨Ø§Øª Ø¯ÙØ¹
            </div>
          ) : (
            <div className="space-y-3">
              {payments.map(payment => (
                <div key={payment.id} className="p-4 border border-border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-medium">Ø§Ù„Ù…Ø¨Ù„Øº: ${payment.amount}</p>
                      <p className="text-sm text-muted-foreground">
                        Ø§Ù„ØªØ§Ø±ÙŠØ®: {payment.created_at}
                      </p>
                      {payment.admin_notes && (
                        <p className="text-sm mt-1">{payment.admin_notes}</p>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      payment.status === 'pending' ? 'bg-warning/10 text-warning' :
                      payment.status === 'approved' ? 'bg-success/10 text-success' :
                      'bg-destructive/10 text-destructive'
                    }`}>
                      {payment.status === 'pending' ? 'Ù‚ÙŠØ¯ Ø§Ù„Ø§Ù†ØªØ¸Ø§Ø±' :
                       payment.status === 'approved' ? 'Ù…ÙˆØ§ÙÙ‚ Ø¹Ù„ÙŠÙ‡' : 'Ù…Ø±ÙÙˆØ¶'}
                    </span>
                  </div>

                  {payment.receipt_url && (
                    <div className="mb-3 p-2 bg-muted rounded text-sm text-muted-foreground">
                      ðŸ“Ž Ø¥ÙŠØµØ§Ù„ Ø§Ù„Ø¯ÙØ¹ Ù…ÙˆØ¬ÙˆØ¯
                    </div>
                  )}

                  {payment.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(payment.id)}
                        className="flex-1 py-2 bg-success text-white rounded-md hover:bg-success/90 transition-colors flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Ù…ÙˆØ§ÙÙ‚Ø©
                      </button>
                      <button
                        onClick={() => handleReject(payment.id)}
                        className="flex-1 py-2 bg-destructive text-white rounded-md hover:bg-destructive/90 transition-colors flex items-center justify-center gap-2"
                      >
                        <XCircle className="h-4 w-4" />
                        Ø±ÙØ¶
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
