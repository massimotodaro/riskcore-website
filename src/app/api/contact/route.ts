import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

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
    const { name, email, message } = await request.json()
    const headers = request.headers
    const ip = headers.get('x-forwarded-for') || headers.get('x-real-ip') || 'unknown'
    const userAgent = headers.get('user-agent') || 'unknown'

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
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

    // Save to Supabase leads table
    if (supabase) {
      const { error: leadsError } = await supabase
        .from('leads')
        .insert({
          email,
          name,
          message,
          source: 'website_contact_form',
          status: 'new',
          ip_address: ip,
          user_agent: userAgent
        })

      if (leadsError && !leadsError.message?.includes('duplicate')) {
        console.error('Supabase leads error:', leadsError)
      } else {
        console.log('Saved contact to Supabase leads:', email)
      }
    }

    // Send notification email via Resend
    if (resend) {
      try {
        await resend.emails.send({
          from: 'RISKCORE <notifications@riskcore.io>',
          to: NOTIFICATION_EMAIL,
          subject: '💬 New Contact Form Submission!',
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <blockquote style="background: #f5f5f5; padding: 15px; border-left: 4px solid #3b82f6; margin: 10px 0;">
              ${message.replace(/\n/g, '<br>')}
            </blockquote>
            <hr>
            <p><strong>Time:</strong> ${new Date().toISOString()}</p>
            <p><strong>IP:</strong> ${ip}</p>
            <p><strong>Source:</strong> Website contact modal</p>
            <hr>
            <p><a href="mailto:${email}">Reply to ${name}</a></p>
          `
        })
        console.log('Contact notification email sent for:', email)
      } catch (emailError) {
        console.error('Resend error:', emailError)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!'
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
