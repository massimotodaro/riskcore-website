import { NextResponse } from 'next/server'

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY
const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

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

    // If MailerLite is not configured, just log and return success
    // This allows the form to work in development without API keys
    if (!MAILERLITE_API_KEY) {
      console.log('Newsletter signup (MailerLite not configured):', email)
      return NextResponse.json({
        success: true,
        message: 'Subscribed successfully (development mode)'
      })
    }

    // MailerLite API v2 endpoint
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

    if (!response.ok) {
      const error = await response.json()
      console.error('MailerLite error:', error)

      // Handle already subscribed case
      if (response.status === 409) {
        return NextResponse.json({
          success: true,
          message: 'Already subscribed'
        })
      }

      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      )
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
