import { Check, ScrollText } from 'lucide-react'

interface TermsPageProps {
  onAccept: () => void
  onDecline: () => void
}

export default function TermsPage({ onAccept, onDecline }: TermsPageProps) {
  const [accepted, setAccepted] = useState(false)

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-8">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center space-y-2">
          <ScrollText className="h-12 w-12 mx-auto text-primary" />
          <h2 className="text-3xl font-semibold">Ø´Ø±ÙˆØ· Ø§Ù„Ø§Ø³ØªØ®Ø¯Ø§Ù… ÙˆØ³ÙŠØ§Ø³Ø© Ø§Ù„Ø®ØµÙˆØµÙŠØ©</h2>
          <p className="text-muted-foreground">ÙŠØ±Ø¬Ù‰ Ù‚Ø±Ø§Ø¡Ø© Ø§Ù„Ø´Ø±ÙˆØ· Ø¨Ø¹Ù†Ø§ÙŠØ© Ù‚Ø¨Ù„ Ø§Ù„Ù…ØªØ§Ø¨Ø¹Ø©</p>
        </div>

        <div className="border border-border rounded-lg p-6 max-h-96 overflow-y-auto space-y-4 text-sm leading-relaxed">
          <section>
            <h3 className="font-semibold mb-2">1. Ù‚Ø¨ÙˆÙ„ Ø§Ù„Ø´Ø±ÙˆØ·</h3>
            <p className="text-muted-foreground">
              Ø¨Ø§Ø³ØªØ®Ø¯Ø§Ù…Ùƒ Ù„Ù…Ù†ØµØ© "Ø¬Ø¯ÙˆÙ„ ØªÙ†Ø¸ÙŠÙ…"ØŒ ÙØ¥Ù†Ùƒ ØªÙˆØ§ÙÙ‚ Ø¹Ù„Ù‰ Ù‡Ø°Ù‡ Ø§Ù„Ø´Ø±ÙˆØ· ÙˆØ£Ø­ÙƒØ§Ù… Ø§Ù„Ø§Ø³ØªØ®Ø¯Ø§Ù….
              Ø¥Ø°Ø§ Ù„Ù… ØªÙˆØ§ÙÙ‚ Ø¹Ù„Ù‰ Ø£ÙŠ Ù…Ù† Ù‡Ø°Ù‡ Ø§Ù„Ø´Ø±ÙˆØ·ØŒ ÙŠØ±Ø¬Ù‰ Ø¹Ø¯Ù… Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø§Ù„Ø®Ø¯Ù…Ø©.
            </p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">2. Ø§Ù„Ù…ØªØ·Ù„Ø¨Ø§Øª Ø§Ù„Ø¹Ù…Ø±ÙŠØ©</h3>
            <p className="text-muted-foreground">
              ÙŠØ¬Ø¨ Ø£Ù† ÙŠÙƒÙˆÙ† Ø¹Ù…Ø±Ùƒ 18 Ø³Ù†Ø© Ø¹Ù„Ù‰ Ø§Ù„Ø£Ù‚Ù„ Ù„Ø§Ø³ØªØ®Ø¯Ø§Ù… Ù‡Ø°Ù‡ Ø§Ù„Ø®Ø¯Ù…Ø©.
              Ù†Ø­Ù† Ù†Ø­Ø§ÙØ¸ Ø¹Ù„Ù‰ Ø®ØµÙˆØµÙŠØªÙƒ ÙˆÙ†Ù„ØªØ²Ù… Ø¨Ø§Ù„Ù‚ÙˆØ§Ù†ÙŠÙ† Ø§Ù„Ù…Ø­Ù„ÙŠØ© ÙˆØ§Ù„Ø¯ÙˆÙ„ÙŠØ© Ù„Ø­Ù…Ø§ÙŠØ© Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª.
            </p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">3. Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ø­Ø³Ø§Ø¨</h3>
            <p className="text-muted-foreground">
              Ø£Ù†Øª Ù…Ø³Ø¤ÙˆÙ„ Ø¹Ù† Ø§Ù„Ø­ÙØ§Ø¸ Ø¹Ù„Ù‰ Ø³Ø±ÙŠØ© Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ø­Ø³Ø§Ø¨Ùƒ ÙˆÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ±.
              Ù†ØªØ¹Ù‡Ø¯ Ø¨Ø­Ù…Ø§ÙŠØ© Ø¨ÙŠØ§Ù†Ø§ØªÙƒ Ø§Ù„Ø´Ø®ØµÙŠØ© ÙˆØªØ£Ù…ÙŠÙ† Ø­Ø³Ø§Ø¨Ùƒ Ø¶Ø¯ Ø§Ù„ÙˆØµÙˆÙ„ ØºÙŠØ± Ø§Ù„Ù…ØµØ±Ø­ Ø¨Ù‡.
            </p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">4. Ø§Ù„Ø®Ø¯Ù…Ø§Øª Ø§Ù„Ù…Ø¯ÙÙˆØ¹Ø©</h3>
            <p className="text-muted-foreground">
              Ø¨Ø¹Ø¶ Ø§Ù„Ù…ÙŠØ²Ø§Øª ÙÙŠ Ø§Ù„Ù…Ù†ØµØ© ØªØªØ·Ù„Ø¨ Ø§Ø´ØªØ±Ø§ÙƒØ§Ù‹ Ù…Ø¯ÙÙˆØ¹Ø§Ù‹. ÙŠÙ…ÙƒÙ†Ùƒ Ø§Ù„Ø§Ø®ØªÙŠØ§Ø± Ø¨ÙŠÙ†
              Ø§Ù„Ø®Ø·Ø© Ø§Ù„Ø´Ù‡Ø±ÙŠØ© Ø£Ùˆ Ø§Ù„Ø³Ù†ÙˆÙŠØ© Ø­Ø³Ø¨ Ø§Ø­ØªÙŠØ§Ø¬Ø§ØªÙƒ. Ù†ÙˆÙØ± Ø®ÙŠØ§Ø±Ø§Øª Ø¯ÙØ¹ Ù…ØªØ¹Ø¯Ø¯Ø©
              Ø¨Ù…Ø§ ÙÙŠ Ø°Ù„Ùƒ Ø§Ù„Ø¯ÙØ¹ Ø§Ù„ÙŠØ¯ÙˆÙŠ Ø¨Ø¹Ø¯ Ø§Ù„Ù…ÙˆØ§ÙÙ‚Ø© Ø§Ù„Ø¥Ø¯Ø§Ø±ÙŠØ©.
            </p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">5. Ø³ÙŠØ§Ø³Ø© Ø§Ù„Ø®ØµÙˆØµÙŠØ©</h3>
            <p className="text-muted-foreground">
              Ù†Ø¬Ù…Ø¹ ÙÙ‚Ø· Ø§Ù„Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ø§Ù„Ù„Ø§Ø²Ù…Ø© Ù„ØªÙ‚Ø¯ÙŠÙ… Ø§Ù„Ø®Ø¯Ù…Ø©. Ù†Ø³ØªØ®Ø¯Ù… Ø¨ÙŠØ§Ù†Ø§ØªÙƒ Ù„ØªØ­Ø³ÙŠÙ†
              ØªØ¬Ø±Ø¨ØªÙƒ ÙˆÙ„Ø§ Ù†Ø´Ø§Ø±ÙƒÙ‡Ø§ Ù…Ø¹ Ø£Ø·Ø±Ø§Ù Ø«Ø§Ù„Ø«Ø© Ø¥Ù„Ø§ Ø¹Ù†Ø¯ Ø§Ù„Ø¶Ø±ÙˆØ±Ø© Ø§Ù„Ù‚Ø§Ù†ÙˆÙ†ÙŠØ©.
            </p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">6. Ø§Ù„Ø­Ø¯ Ù…Ù† Ø§Ù„Ù…Ø³Ø¤ÙˆÙ„ÙŠØ©</h3>
            <p className="text-muted-foreground">
              Ù†Ù‚Ø¯Ù… Ø§Ù„Ø®Ø¯Ù…Ø© "ÙƒÙ…Ø§ Ù‡ÙŠ" Ø¯ÙˆÙ† Ø¶Ù…Ø§Ù†Ø§Øª ØµØ±ÙŠØ­Ø© Ø£Ùˆ Ø¶Ù…Ù†ÙŠØ©. Ù„Ø§ Ù†ØªØ­Ù…Ù„ Ø§Ù„Ù…Ø³Ø¤ÙˆÙ„ÙŠØ©
              Ø¹Ù† Ø£ÙŠ Ø®Ø³Ø§Ø¦Ø± Ù…Ø¨Ø§Ø´Ø±Ø© Ø£Ùˆ ØºÙŠØ± Ù…Ø¨Ø§Ø´Ø±Ø© Ù†Ø§ØªØ¬Ø© Ø¹Ù† Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø§Ù„Ø®Ø¯Ù…Ø©.
            </p>
          </section>
        </div>

        <div className="flex items-center gap-3 p-4 bg-muted rounded-md">
          <input
            type="checkbox"
            id="acceptTerms"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="h-5 w-5 rounded border-border"
          />
          <label htmlFor="acceptTerms" className="text-sm font-medium cursor-pointer">
            Ø£ÙˆØ§ÙÙ‚ Ø¹Ù„Ù‰ Ø´Ø±ÙˆØ· Ø§Ù„Ø§Ø³ØªØ®Ø¯Ø§Ù… ÙˆØ³ÙŠØ§Ø³Ø© Ø§Ù„Ø®ØµÙˆØµÙŠØ©
          </label>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onDecline}
            className="flex-1 py-2 px-4 border border-border rounded-md font-medium hover:bg-accent transition-colors"
          >
            Ø±ÙØ¶ ÙˆØ§Ù„Ù…ØªØ§Ø¨Ø¹Ø©
          </button>
          <button
            onClick={onAccept}
            disabled={!accepted}
            className="flex-1 py-2 px-4 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Check className="h-5 w-5" />
            Ù‚Ø¨ÙˆÙ„ ÙˆØ§Ù„Ù…ØªØ§Ø¨Ø¹Ø©
          </button>
        </div>
      </div>
    </div>
  )
}
