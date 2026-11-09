import { useState } from 'react'
import { CreditCard, Calendar, TrendingDown, Upload, CheckCircle } from 'lucide-react'
import type { User } from '@/lib/supabase'

interface PaymentPageProps {
  user: User
  onBack: () => void
}

export default function PaymentPage({ user, onBack }: PaymentPageProps) {
  const [planType, setPlanType] = useState<'monthly' | 'yearly'>('monthly')
  const [discountCode, setDiscountCode] = useState('')
  const [appliedDiscount, setAppliedDiscount] = useState<number | null>(null)
  const [receiptFile, setReceiptFile] = useState<File | null>(null)
  const [step, setStep] = useState<'select' | 'confirm' | 'upload' | 'success'>('select')

  const prices = {
    monthly: 29.99,
    yearly: 299.99
  }

  const discountedPrice = planType === 'monthly'
    ? appliedDiscount ? prices.monthly * (1 - appliedDiscount / 100) : prices.monthly
    : appliedDiscount ? prices.yearly * (1 - appliedDiscount / 100) : prices.yearly

  function handleApplyDiscount() {
    if (discountCode.toUpperCase() === 'SAVE20') {
      setAppliedDiscount(20)
    } else if (discountCode.toUpperCase() === 'YEAR50') {
      setAppliedDiscount(50)
    } else {
      alert('Ø±Ù…Ø² Ø§Ù„Ø®ØµÙ… ØºÙŠØ± ØµØ§Ù„Ø­')
    }
  }

  function handleSubmit() {
    setStep('upload')
  }

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.[0]) {
      setReceiptFile(e.target.files[0])
    }
  }

  function handleConfirm() {
    setStep('success')
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button onClick={onBack} className="text-muted-foreground hover:text-foreground text-sm">
        â† Ø§Ù„Ø¹ÙˆØ¯Ø© Ù„Ù„ÙˆØ­Ø© Ø§Ù„ØªØ­ÙƒÙ…
      </button>

      <h2 className="text-2xl font-semibold">Ø§Ù„Ø¯ÙØ¹ ÙˆØ§Ù„Ø§Ø´ØªØ±Ø§Ùƒ</h2>

      {step === 'select' && (
        <div className="space-y-6">
          {/* Plan Selection */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setPlanType('monthly')}
              className={`p-6 border-2 rounded-lg text-center transition-all ${
                planType === 'monthly' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
              }`}
            >
              <Calendar className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold">Ø§Ù„Ø®Ø·Ø© Ø§Ù„Ø´Ù‡Ø±ÙŠØ©</h3>
              <p className="text-2xl font-bold mt-2">${prices.monthly}</p>
              <p className="text-sm text-muted-foreground">/Ø´Ù‡Ø±</p>
            </button>

            <button
              onClick={() => setPlanType('yearly')}
              className={`p-6 border-2 rounded-lg text-center transition-all relative ${
                planType === 'yearly' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
              }`}
            >
              <TrendingDown className="h-8 w-8 mx-auto mb-3 text-success" />
              <h3 className="font-semibold">Ø§Ù„Ø®Ø·Ø© Ø§Ù„Ø³Ù†ÙˆÙŠØ©</h3>
              <p className="text-2xl font-bold mt-2">${prices.yearly}</p>
              <p className="text-sm text-muted-foreground">/Ø³Ù†Ø© (ÙˆÙÙ‘Ø± 20%)</p>
              {planType === 'yearly' && (
                <span className="absolute top-2 left-2 px-2 py-1 bg-success text-white text-xs rounded-full">
                  Ø§Ù„Ø£ÙƒØ«Ø± Ø´Ø¹Ø¨ÙŠØ©
                </span>
              )}
            </button>
          </div>

          {/* Discount Code */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Ø±Ù…Ø² Ø§Ù„Ø®ØµÙ…</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Ø£Ø¯Ø®Ù„ Ø±Ù…Ø² Ø§Ù„Ø®ØµÙ…"
                className="flex-1 px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                onClick={handleApplyDiscount}
                className="px-4 py-2 border border-border rounded-md hover:bg-accent transition-colors"
              >
                ØªØ·Ø¨ÙŠÙ‚
              </button>
            </div>
            {appliedDiscount && (
              <p className="text-sm text-success flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                ØªÙ… ØªØ·Ø¨ÙŠÙ‚ Ø®ØµÙ… {appliedDiscount}%
              </p>
            )}
          </div>

          {/* Price Summary */}
          <div className="p-4 border border-border rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Ø§Ù„Ø³Ø¹Ø± Ø§Ù„Ø£Ø³Ø§Ø³ÙŠ</span>
              <span>${planType === 'monthly' ? prices.monthly : prices.yearly}</span>
            </div>
            {appliedDiscount && (
              <div className="flex justify-between text-sm text-success">
                <span>Ø§Ù„Ø®ØµÙ… ({appliedDiscount}%)</span>
                <span>-${((planType === 'monthly' ? prices.monthly : prices.yearly) * (appliedDiscount / 100)).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold pt-2 border-t border-border">
              <span>Ø§Ù„Ø¥Ø¬Ù…Ø§Ù„ÙŠ</span>
              <span>${discountedPrice.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <CreditCard className="h-5 w-5" />
            Ù…ØªØ§Ø¨Ø¹Ø© Ù„Ù„Ø¯ÙØ¹
          </button>
        </div>
      )}

      {step === 'upload' && (
        <div className="space-y-6">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">ØªØ£ÙƒÙŠØ¯ Ø§Ù„Ø·Ù„Ø¨</h3>
            <p className="text-sm text-muted-foreground">
              Ø§Ø®ØªØ±Øª Ø§Ù„Ø®Ø·Ø© {planType === 'monthly' ? 'Ø§Ù„Ø´Ù‡Ø±ÙŠØ©' : 'Ø§Ù„Ø³Ù†ÙˆÙŠØ©'} Ø¨Ù‚ÙŠÙ…Ø© ${discountedPrice.toFixed(2)}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Ø±ÙØ¹ Ø¥ÙŠØµØ§Ù„ Ø§Ù„Ø¯ÙØ¹</label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleUpload}
                className="hidden"
                id="receipt-upload"
              />
              <label htmlFor="receipt-upload" className="cursor-pointer">
                <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground">Ø§Ø³Ø­Ø¨ Ø§Ù„Ù…Ù„Ù Ù‡Ù†Ø§ Ø£Ùˆ Ø§Ù†Ù‚Ø± Ù„Ù„Ø§Ø®ØªÙŠØ§Ø±</p>
                {receiptFile && (
                  <p className="text-sm font-medium mt-2 text-primary">{receiptFile.name}</p>
                )}
              </label>
            </div>
            <p className="text-xs text-muted-foreground">
              Ù†Ù†ØµØ­ Ø¨Ø±ÙØ¹ ØµÙˆØ±Ø© ÙˆØ§Ø¶Ø­Ø© Ù„Ù„Ø¥ÙŠØµØ§Ù„ Ø£Ùˆ screenshot ØªØ­ÙˆÙŠÙ„ Ø§Ù„Ø¨Ù†Ùƒ
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep('select')}
              className="flex-1 py-2 px-4 border border-border rounded-md hover:bg-accent transition-colors"
            >
              Ø±Ø¬ÙˆØ¹
            </button>
            <button
              onClick={handleConfirm}
              disabled={!receiptFile}
              className="flex-1 py-2 px-4 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              ØªØ£ÙƒÙŠØ¯ Ø§Ù„Ø·Ù„Ø¨
            </button>
          </div>
        </div>
      )}

      {step === 'success' && (
        <div className="text-center space-y-4 py-12">
          <div className="h-16 w-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
          <h3 className="text-xl font-semibold">ØªÙ… Ø¥Ø±Ø³Ø§Ù„ Ø·Ù„Ø¨ Ø§Ù„Ø¯ÙØ¹ Ø¨Ù†Ø¬Ø§Ø­!</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Ø³ÙŠØªÙ… Ù…Ø±Ø§Ø¬Ø¹Ø© Ø¥ÙŠØµØ§Ù„ Ø§Ù„Ø¯ÙØ¹ Ù…Ù† Ù‚Ø¨Ù„ ÙØ±ÙŠÙ‚ Ø§Ù„Ø¥Ø¯Ø§Ø±Ø© ÙˆØ§Ù„Ø±Ø¯ Ø¹Ù„ÙŠÙƒ Ø®Ù„Ø§Ù„ 24 Ø³Ø§Ø¹Ø© Ø¹Ù…Ù„.
            Ø¹Ù†Ø¯ Ø§Ù„Ù…ÙˆØ§ÙÙ‚Ø©ØŒ Ø³ÙŠØªÙ… ØªÙØ¹ÙŠÙ„ Ø§Ø´ØªØ±Ø§ÙƒÙƒ ØªÙ„Ù‚Ø§Ø¦ÙŠØ§Ù‹.
          </p>
          <button
            onClick={onBack}
            className="px-6 py-2 border border-border rounded-md hover:bg-accent transition-colors"
          >
            Ø§Ù„Ø¹ÙˆØ¯Ø© Ù„Ù„ÙˆØ­Ø© Ø§Ù„ØªØ­ÙƒÙ…
          </button>
        </div>
      )}
    </div>
  )
}
