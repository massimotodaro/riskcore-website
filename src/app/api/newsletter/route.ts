import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY
const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID
const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY
const RESEND_API_KEY = process.env.RESEND_API_KEY
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'hello@riskcore.io'

// Initialize clients
const supabase = SUPABASE_URL && SUPABASE_SERVICE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
  : null

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null

export async function POST(request: Request) {
  try {
    const { email, website, type = 'demo' } = await request.json() // website is honeypot field, type is 'demo' or 'newsletter'
    const headers = request.headers
    const ip = headers.get('x-forwarded-for') || headers.get('x-real-ip') || 'unknown'
    const userAgent = headers.get('user-agent') || 'unknown'

    // Bot detection: honeypot field should be empty
    if (website) {
      console.log('Bot detected (honeypot filled):', { email, ip })
      // Return success to fool the bot, but don't process
      return NextResponse.json({ success: true, message: 'Subscribed successfully!' })
    }

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Save to Supabase (our source of truth)
    if (supabase) {
      // Save to website_subscribers (legacy)
      const { error: dbError } = await supabase
        .from('website_subscribers')
        .upsert({
          email,
          ip_address: ip,
          user_agent: userAgent,
          source: 'website'
        }, {
          onConflict: 'email'
        })

      if (dbError) {
        console.error('Supabase subscribers error:', dbError)
      }

      // Also save to leads table (CRM)
      const { error: leadsError } = await supabase
        .from('leads')
        .insert({
          email,
          source: type === 'demo' ? 'website_demo_request' : 'website_newsletter',
          status: 'new',
          ip_address: ip,
          user_agent: userAgent
        })

      if (leadsError && !leadsError.message?.includes('duplicate')) {
        console.error('Supabase leads error:', leadsError)
      } else {
        console.log('Saved to Supabase leads:', email)
      }
    }

    // Also send to MailerLite for email campaigns
    if (MAILERLITE_API_KEY) {
      const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
        },
        body: JSON.stringify({
          email,
          groups: MAILERLITE_GROUP_ID ? [MAILERLITE_GROUP_ID] : [],
          status: 'active',
        }),
      })

      if (!response.ok && response.status !== 409) {
        const error = await response.json()
        console.error('MailerLite error:', error)
      }
    }

    // Send notification email via Resend
    if (resend) {
      try {
        const isDemo = type === 'demo'
        await resend.emails.send({
          from: 'RISKCORE <notifications@riskcore.io>',
          to: NOTIFICATION_EMAIL,
          subject: isDemo ? '📅 New Demo Request!' : '📧 New Newsletter Signup!',
          html: `
            <h2>${isDemo ? 'New Demo Request' : 'New Newsletter Signup'}</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Type:</strong> ${isDemo ? 'Demo Request' : 'Newsletter Subscription'}</p>
            <p><strong>Time:</strong> ${new Date().toISOString()}</p>
            <p><strong>IP:</strong> ${ip}</p>
            <p><strong>Source:</strong> Website form</p>
            <hr>
            <p><a href="https://supabase.com/dashboard">View in Supabase</a></p>
          `
        })
        console.log('Notification email sent for:', email, 'type:', type)
      } catch (emailError) {
        console.error('Resend error:', emailError)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Subscribed successfully!'
    })
  } catch (error) {
    console.error('Newsletter error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
