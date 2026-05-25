// Bootstraps the authenticated user on mount and gates the dashboard behind
// a minimal Sanctum SPA signup/login form. While unauthenticated, the rest of the
// app is hidden; once a session is established, children render normally.

import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './store'
import { Eye, EyeClosed } from 'lucide-react'

interface Props {
  children: ReactNode
}

export function AuthGate({ children }: Props) {
  const navigate = useNavigate()
  const { user, loading, initialized, fetchMe, signup } = useAuth()
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

  // Redirect to /investlagos when user is authenticated
  useEffect(() => {
    if (user && initialized) {
      navigate('/investlagos')
    }
  }, [user, initialized, navigate])

  if (!initialized || (loading && !user)) {
    return (
      <div className="min-h-screen w-full grid place-items-center bg-black text-white/70 font-lexend text-sm">
        Loading session…
      </div>
    )
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)
    
    if (password !== passwordConfirm) {
      setError('Passwords do not match')
      return
    }

    try {
      await signup(fullName, email, password)
      setSuccessMessage('Account created successfully! Redirecting to sign in...')
      // Redirect to signin after successful signup
      setTimeout(() => {
        navigate('/signin')
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

  return (
    <div className="min-h-screen w-full flex flex-col gap-10 justify-center items-center bg-black px-4 signup-bg">
      <div className="flex flex-col gap-1 items-center">
          <h1 className="text-white font-lexend text-2xl font-semibold">
            Welcome to IL-DASH
          </h1>
          <p className="text-white/60 font-lexend text-xs">
            Create your account to get started
          </p>
        </div>
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm border border-white/15 rounded-2xl p-7 flex flex-col gap-5 bg-white/5 backdrop-blur"
      >
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

        <label className="flex flex-col gap-2">
          <span className="text-white/80 font-lexend text-xs">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
            placeholder="john@example.com"
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
          {loading ? 'Creating account…' : 'Sign Up'}
        </button>

        <div className="flex gap-1 justify-center text-white/60 font-lexend text-xs">
          <span>Already have an account?</span>
          <button
            type="button"
            onClick={() => navigate('/signin')}
            className="text-cyan hover:text-cyan/80 cursor-pointer"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  )
}
