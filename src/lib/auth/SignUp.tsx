// Bootstraps the authenticated user on mount and gates the dashboard behind
// a minimal Sanctum SPA login form. While unauthenticated, the rest of the
// app is hidden; once a session is established, children render normally.

import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { useAuth } from './store'

interface Props {
  children: ReactNode
}

export function AuthGate({ children }: Props) {
  const { user, loading, initialized, fetchMe, login } = useAuth()
  const [email, setEmail] = useState('admin@risenetworks.org')
  const [password, setPassword] = useState('Password123!')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!initialized) void fetchMe()
  }, [initialized, fetchMe])

  if (!initialized || (loading && !user)) {
    return (
      <div className="min-h-screen w-full grid place-items-center bg-black text-white/70 font-lexend text-sm">
        Loading session…
      </div>
    )
  }

  if (user) return <>{children}</>

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      await login(email, password)
    } catch (err) {
      const msg =
        (err as { response?: { data?: { message?: string } }; message?: string })
          ?.response?.data?.message ??
        (err as { message?: string })?.message ??
        'Login failed'
      setError(msg)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col gap-10 justify-center items-center bg-black px-4 signup-bg">
      <div className="flex flex-col gap-1 items-center">
          <h1 className="text-white font-lexend text-2xl font-semibold">
            Welcome to, IL-DASH!
          </h1>
          <p className="text-white/60 font-lexend text-xs">
            Sign up with your control room credentials.
          </p>
        </div>
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm border border-white/15 rounded-2xl p-7 flex flex-col gap-5 bg-white/5 backdrop-blur"
      >
        

        <label className="flex flex-col gap-2">
          <span className="text-white/80 font-lexend text-xs">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
            className="bg-black/40 border border-white/20 rounded px-3 py-2 text-white font-lexend text-sm outline-none focus:border-white/50"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-white/80 font-lexend text-xs">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className="bg-black/40 border border-white/20 rounded px-3 py-2 text-white font-lexend text-sm outline-none focus:border-white/50"
          />
        </label>

        {error ? (
          <div className="text-red-300 font-lexend text-xs">{error}</div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="bg-linear-to-r from-purple600 to-purple700 text-white font-lexend text-sm font-semibold py-2.5 rounded disabled:opacity-60"
        >
          {loading ? 'Signing up…' : 'Sign up'}
        </button>
      </form>
    </div>
  )
}
