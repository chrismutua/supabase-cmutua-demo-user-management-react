import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './Auth'
import Account from './Account'

function App() {
  const [claims, setClaims] = useState(null)

  useEffect(() => {
    const loadClaims = async () => {
      const {
        data: { claims },
      } = await supabase.auth.getClaims()
      setClaims(claims)
    }

    loadClaims()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadClaims()
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!claims ? (
        <Auth />
      ) : (
        <Account key={claims.sub} user={{ id: claims.sub, email: claims.email }} />
      )}
    </div>
  )
}

export default App
