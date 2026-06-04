import { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/lib/auth/store'
import { Loader } from 'lucide-react'

interface ProtectedRouteProps {
  children: ReactNode
  requiredRoles?: Array<'super_admin' | 'admin' | 'operator'>
}

export function ProtectedRoute({ children, requiredRoles = [] }: ProtectedRouteProps) {
  const user = useAuth((s) => s.user)
  const loading = useAuth((s) => s.loading)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-cyan-500" />
      </div>
    )
  }

  // Not authenticated at all
  if (!user) {
    return <Navigate to="/" replace />
  }

  // If specific roles are required, check if user has one
  if (requiredRoles.length > 0 && !(user.roles || []).some(r => requiredRoles.includes(r as any))) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
