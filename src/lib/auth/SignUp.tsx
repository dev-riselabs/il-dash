// Bootstraps the authenticated user on mount and gates the dashboard behind
// a minimal Sanctum SPA signup/login form. While unauthenticated, the rest of the
// app is hidden; once a session is established, children render normally.

import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { useAuth } from './store'
import { Eye, EyeClosed } from 'lucide-react'

interface Props {
  children: ReactNode
}

export function AuthGate({ children }: Props) {
  const { user, loading, initialized, fetchMe, signup, login } = useAuth()
  const [mode, setMode] = useState<'signup' | 'signin'>('signup')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  function toggleShowPassword(){
    setShowPassword(prev => !prev)
  }

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

  async function onSignupSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)
    
    if (password !== passwordConfirm) {
      setError('Passwords do not match')
      return
    }

    try {
      await signup(fullName, email, password)
      setSuccessMessage('Account created successfully! Please sign in with your credentials.')
      // Switch to signin mode after successful signup
      setTimeout(() => {
        setMode('signin')
        setFullName('')
        setPassword('')
        setPasswordConfirm('')
        setSuccessMessage(null)
      }, 2000)
    } catch (err) {
      const msg =
        (err as { response?: { data?: { message?: string } }; message?: string })
          ?.response?.data?.message ??
        (err as { message?: string })?.message ??
        'Signup failed'
      setError(msg)
    }
  }

  async function onSigninSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)

    try {
      await login(email, password)
    } catch (err) {
      const msg =
        (err as { response?: { data?: { message?: string } }; message?: string })
          ?.response?.data?.message ??
        (err as { message?: string })?.message ??
        'Sign in failed'
      setError(msg)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col gap-10 justify-center items-center bg-black px-4 signup-bg">
      <div className="flex flex-col gap-1 items-center">
          <h1 className="text-white font-lexend text-2xl font-semibold">
            Welcome to IL-DASH
          </h1>
          <p className="text-white/60 font-lexend text-xs">
            {mode === 'signup' ? 'Create your account to get started' : 'Sign in to your account'}
          </p>
        </div>
      <form
        onSubmit={mode === 'signup' ? onSignupSubmit : onSigninSubmit}
        className="w-full max-w-sm border border-white/15 rounded-2xl p-7 flex flex-col gap-5 bg-white/5 backdrop-blur"
      >
        {mode === 'signup' && (
          <label className="flex flex-col gap-2">
            <span className="text-white/80 font-lexend text-xs">Full Name</span>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="John Doe"
              className="bg-black/40 border border-white/20 rounded px-3 py-2 text-white font-lexend text-sm outline-none focus:border-white/50"
            />
          </label>
        )}

        <label className="flex flex-col gap-2">
          <span className="text-white/80 font-lexend text-xs">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete={mode === 'signup' ? 'username' : 'email'}
            required
            placeholder={mode === 'signup' ? 'john@example.com' : 'your@email.com'}
            className="bg-black/40 border border-white/20 rounded px-3 py-2 text-white font-lexend text-sm outline-none focus:border-white/50"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-white/80 font-lexend text-xs">Password</span>
          <div className='bg-black/40 border border-white/20 focus:border-white/50 rounded px-3 py-2 flex gap-2 items-center'>
            <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
            required
            placeholder="••••••••"
            className="bg-transparent text-white font-lexend text-sm outline-none flex-1"
          />
          <button type="button" onClick={toggleShowPassword} className='cursor-pointer shrink-0'>
            { showPassword ? <EyeClosed className='text-white/60 w-5 h-5'/> : <Eye className='text-white/60 w-5 h-5'/>}
          </button>
          </div>
        </label>

        {mode === 'signup' && (
          <label className="flex flex-col gap-2">
            <span className="text-white/80 font-lexend text-xs">Confirm Password</span>
            <div className='bg-black/40 border border-white/20 focus:border-white/50 rounded px-3 py-2 flex gap-2 items-center'>
              <input
              type={showPassword ? 'text' : 'password'}
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              autoComplete="new-password"
              required
              placeholder="••••••••"
              className="bg-transparent text-white font-lexend text-sm outline-none flex-1"
            />
            <button type="button" onClick={toggleShowPassword} className='cursor-pointer shrink-0'>
              { showPassword ? <EyeClosed className='text-white/60 w-5 h-5'/> : <Eye className='text-white/60 w-5 h-5'/>}
            </button>
            </div>
          </label>
        )}

        {successMessage ? (
          <div className="text-green-300 font-lexend text-xs">{successMessage}</div>
        ) : null}

        {error ? (
          <div className="text-red-300 font-lexend text-xs">{error}</div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="bg-cyan text-white font-lexend text-sm font-semibold py-2.5 rounded disabled:opacity-60"
        >
          {loading ? (mode === 'signup' ? 'Creating account…' : 'Signing in…') : (mode === 'signup' ? 'Sign Up' : 'Sign In')}
        </button>

        <div className="flex gap-1 justify-center text-white/60 font-lexend text-xs">
          <span>{mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}</span>
          <button
            type="button"
            onClick={() => {
              setMode(mode === 'signup' ? 'signin' : 'signup')
              setError(null)
              setSuccessMessage(null)
              setFullName('')
              setEmail('')
              setPassword('')
              setPasswordConfirm('')
            }}
            className="text-cyan hover:text-cyan/80 cursor-pointer"
          >
            {mode === 'signup' ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </form>
    </div>
  )
}
