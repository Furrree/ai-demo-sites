import fetch from "node-fetch";

export const config = {
  api: {
    bodyParser: false, // disable built-in parser to handle URLSearchParams
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  try {
    // Read raw body
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const rawBody = Buffer.concat(buffers).toString();

    // Send raw URLSearchParams to Google Apps Script
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwj85TA0WyMDgsvwdIOcADY-N0kYH_gcsB3ULs90p-CygW1wubX1JX-L5to9TxPfre0/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: rawBody,
      }
    );

    const data = await response.json(); // Apps Script now returns valid JSON
    res.status(200).json(data);

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}
