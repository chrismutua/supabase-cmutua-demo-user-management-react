import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './Auth'
import Account from './Account'

function App() {
  const [claims, setClaims] = useState(null)
  const [fnResult, setFnResult] = useState(null)

  async function testEdgeFunction(fnName) {
    const { data, error } = await supabase.functions.invoke(fnName, {
      body: { name: 'test' },
    })
    setFnResult(
      error
        ? `[${fnName}] ${error.name}: ${error.message}`
        : `[${fnName}] ${data.message}`,
    )
  }

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
      <button
        type="button"
        className="button block"
        onClick={() => testEdgeFunction('hello-world-auto-cors-error')}
      >
        Test hello-world Auto cors error
      </button>
      <button
        type="button"
        className="button block"
        onClick={() => testEdgeFunction('hello-world-auto-cors-success')}
      >
        Test hello-world Auto cors success
      </button>
      <button
        type="button"
        className="button block"
        onClick={() => testEdgeFunction('hello-world-manual-cors-success')}
      >
        Test hello-world-manual cors success
      </button>
      <button
        type="button"
        className="button block"
        onClick={() => testEdgeFunction('hello-world-manual-cors-error')}
      >
        Test hello-world-cors-error error
      </button>
      {fnResult && <pre>{fnResult}</pre>}
      {!claims ? (
        <Auth />
      ) : (
        <Account key={claims.sub} user={{ id: claims.sub, email: claims.email }} />
      )}
    </div>
  )
}

export default App
