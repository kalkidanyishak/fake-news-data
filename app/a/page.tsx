// Example client component
'use client'
import { useAuth } from '@/components/AuthProvider'

export default function MyClientComponent() {
  const { user, isLoading } = useAuth()

  if (isLoading) return <p>Loading user...</p>
  if (!user) return <p>Not logged in.</p>

  return <p>Client component sees user: {user.email}</p>
}