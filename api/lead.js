import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const googleFormUrl = "https://script.google.com/macros/s/AKfycbw9J-T8zHJd4qstUJBh-qh9AsarXaNgvELs_8EJqUJeObdOav8k8XhrXUeqKPPAnVzb/exec";

      const formData = new URLSearchParams(req.body).toString();
      const response = await fetch(googleFormUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData,
      });

      const text = await response.text();
      res.status(200).json({ success: true, message: text });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
}
