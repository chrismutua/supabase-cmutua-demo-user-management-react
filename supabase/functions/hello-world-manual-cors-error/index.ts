import "jsr:@supabase/functions-js/edge-runtime.d.ts";

console.log(`Function "hello-world-manual-cors-error" up and running!`);

export default {
  fetch: async (req) => {
    if (req.method === "OPTIONS") {
      return Response.json({ ok: true });
    }

    try {
      const { name } = await req.json();
      return Response.json({ message: `Hello ${name}!` });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return Response.json({ error: message }, { status: 400 });
    }
  },
};
