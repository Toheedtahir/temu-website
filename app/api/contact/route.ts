import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, whatsapp, store_type, message } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    const supabase = await createServerSupabaseClient()
    const { error } = await supabase.from('inquiries').insert({
      name,
      email,
      whatsapp: whatsapp || null,
      store_type: store_type || null,
      message: message || null,
    })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Failed to save inquiry' }, { status: 500 })
  }
}
