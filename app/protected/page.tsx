// app/protected/page.tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function ProtectedPage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/login?message=Please log in to view this page.')
  }

  return (
    <div>
      <h2>Protected Page</h2>
      <p>Hello, {data.user.email}! This content is only for logged-in users.</p>
      <p><Link href="/">Go back to Home</Link></p>
    </div>
  )
}