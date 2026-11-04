import { corsHeaders } from 'npm:@supabase/supabase-js@^2/cors'

console.log(`Function "browser-with-cors" up and running!`)

export default {
  fetch: async (req) => {
    // Handle the CORS preflight request.
    if (req.method === 'OPTIONS') {
      return Response.json({ ok: true }, { headers: corsHeaders })
    }

    try {
      const { name } = await req.json()
      return Response.json({ message: `Hello ${name}!` }, { headers: corsHeaders })
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return Response.json({ error: message }, { status: 400, headers: corsHeaders })
    }
  },
}
