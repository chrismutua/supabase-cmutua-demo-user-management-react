import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type",
};

console.log(`Function "hello-world-cors-error" up and running!`);

export default {
  fetch: async (req) => {
    if (req.method === "OPTIONS") {
      return Response.json({ ok: true }, { headers: corsHeaders });
    }

    try {
      const { name } = await req.json();
      return Response.json(
        { message: `Hello ${name}!` },
        { headers: corsHeaders },
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return Response.json(
        { error: message },
        { status: 400, headers: corsHeaders },
      );
    }
  },
};
