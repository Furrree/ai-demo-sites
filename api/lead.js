import fetch from "node-fetch";

export const config = {
  api: {
    bodyParser: false, // disable automatic parsing
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    // Read raw request body
    const buffers = [];
    for await (const chunk of req) buffers.push(chunk);
    const rawBody = Buffer.concat(buffers).toString();

    // Send to Google Apps Script
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwj85TA0WyMDgsvwdIOcADY-N0kYH_gcsB3ULs90p-CygW1wubX1JX-L5to9TxPfre0/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: rawBody,
      }
    );

    // Parse Apps Script response safely
    let data;
    try {
      data = await response.json();
    } catch (err) {
      // If it's not valid JSON, still capture the message
      const text = await response.text();
      return res.status(500).json({ success: false, error: text });
    }

    res.status(200).json(data);

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}
