// /api/lead.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyjw-Lr8BtGKQk2cN5JBZHjds9j8Zg1-BDmSsV3Yi3XGW420CdYA5DwmnqlUXK3uzpr/exec";

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: new URLSearchParams(req.body), // Google Script expects form-urlencoded
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const text = await response.text(); // get raw text first
    let json;
    try {
      json = JSON.parse(text); // try parsing JSON if script returns JSON
    } catch {
      json = { success: true, message: text }; // fallback: wrap raw text
    }

    return res.status(200).json(json);
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
