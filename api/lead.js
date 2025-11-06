import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const body = new URLSearchParams(req.body);

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwj85TA0WyMDgsvwdIOcADY-N0kYH_gcsB3ULs90p-CygW1wubX1JX-L5to9TxPfre0/exec",
      {
        method: "POST",
        body,
      }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}
