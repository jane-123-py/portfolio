const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  created_at: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const notifyEmail = Deno.env.get("NOTIFY_EMAIL");
  if (!resendApiKey || !notifyEmail) {
    return new Response("Missing secrets", { status: 500, headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    const record: ContactMessage | undefined = payload.record;
    if (!record) {
      return new Response("No record in payload", { status: 400, headers: corsHeaders });
    }

    const subject = record.subject
      ? `New contact: ${record.subject}`
      : `New contact message from ${record.name}`;

    const body = `You received a new message from your portfolio contact form.

Name: ${record.name}
Email: ${record.email}
Subject: ${record.subject || "(none)"}
Submitted: ${new Date(record.created_at).toLocaleString()}

Message:
${record.message}

---
Reply directly to ${record.name} at ${record.email}.`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        to: notifyEmail,
        reply_to: record.email,
        subject,
        text: body,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return new Response(`Resend error: ${errText}`, { status: 502, headers: corsHeaders });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(`Error: ${String(err)}`, { status: 500, headers: corsHeaders });
  }
});
