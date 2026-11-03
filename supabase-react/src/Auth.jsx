import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')

  const handleSendOtp = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email })

    if (error) {
      alert(error.error_description || error.message)
    } else {
      alert('Check your email for the magic link or 6-digit code!')
    }
    setLoading(false)
  }

  const handleVerifyOtp = async () => {
    setLoading(true)
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: 'email',
    })

    if (error) {
      alert(error.error_description || error.message)
    }
    setLoading(false)
  }

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Supabase + React</h1>
        <p className="description">Sign in via magic link or email OTP below</p>
        <form className="form-widget" onSubmit={(e) => e.preventDefault()}>
          <div>
            <input
              className="inputField"
              type="email"
              placeholder="Your email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className="inputField"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder="6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div>
            <button
              type="button"
              className="button block primary"
              onClick={handleSendOtp}
              disabled={loading}
            >
              {loading ? <span>Loading</span> : <span>Send OTP</span>}
            </button>
          </div>
          <div>
            <button
              type="button"
              className="button block"
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? <span>Loading</span> : <span>Verify OTP</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
