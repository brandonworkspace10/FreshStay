import { NextResponse } from "next/server";

// Receives a qualified lead from the survey popup (or signup form) and forwards
// it to the configured automation (n8n) webhook for an instant callback.
// Set LEAD_WEBHOOK_URL in your Vercel project env to your n8n webhook URL.
export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  const lead = {
    ...(typeof payload === "object" && payload ? payload : { raw: payload }),
    receivedAt: new Date().toISOString(),
    userAgent: req.headers.get("user-agent") ?? undefined,
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) {
        return NextResponse.json(
          { ok: false, error: "webhook rejected" },
          { status: 502 }
        );
      }
    } catch {
      return NextResponse.json(
        { ok: false, error: "webhook unreachable" },
        { status: 502 }
      );
    }
  } else {
    // No webhook configured yet — log so the lead isn't silently lost.
    console.log("[lead] LEAD_WEBHOOK_URL not set; lead:", JSON.stringify(lead));
  }

  return NextResponse.json({ ok: true });
}
