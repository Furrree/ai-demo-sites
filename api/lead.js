import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ success: false, error: "Method not allowed" });

  try {
    const rawBody = await new Promise((resolve, reject) => {
      let data = [];
      req.on("data", chunk => data.push(chunk));
      req.on("end", () => resolve(Buffer.concat(data).toString()));
      req.on("error", reject);
    });

    const scriptRes = await fetch(
      "https://script.google.com/macros/s/AKfycbz8zQPgQJ83XMQ8439G--Nc_Pgs_7U-gheyA-ZURb7iPv3WW5VOqDlLosHJPDQfc98/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: rawBody
      }
    );

    const text = await scriptRes.text();
    let data;
    try { data = JSON.parse(text); } 
    catch { return res.status(500).json({ success: false, error: text }); }

    return res.status(200).json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}
