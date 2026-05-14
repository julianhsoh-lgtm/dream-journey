export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const body = await req.json();
    const apiKey = process.env.ANTHROPIC_API_KEY;

    console.log("API Key exists:", !!apiKey);
    console.log("API Key prefix:", apiKey ? apiKey.substring(0, 10) : "MISSING");

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: body.system,
        messages: body.messages,
      }),
    });

    const data = await response.json();
    console.log("Response status:", response.status);
    console.log("Response type:", data.type);
    if (data.error) console.log("API Error:", JSON.stringify(data.error));

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log("Function error:", err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const config = { path: "/api/claude" };
