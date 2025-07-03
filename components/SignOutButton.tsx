// components/SignOutButton.tsx
'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'

export default function SignOutButton() {
  const supabase = createClient()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login') // Redirect to login after sign out
    router.refresh() // Important to refresh server components
  }

  return (
    <Button variant='outline' onClick={handleSignOut}>
      Sign Out
    </Button>
  )
}