import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY
const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID
const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

// Initialize Supabase client
const supabase = SUPABASE_URL && SUPABASE_SERVICE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
  : null

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    const headers = request.headers
    const ip = headers.get('x-forwarded-for') || headers.get('x-real-ip') || 'unknown'
    const userAgent = headers.get('user-agent') || 'unknown'

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
        console.error('Supabase error:', dbError)
      } else {
        console.log('Saved to Supabase:', email)
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
