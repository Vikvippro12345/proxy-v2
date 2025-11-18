import fetch from "node-fetch";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).send("Missing URL");

  let decoded;
  try {
    decoded = Buffer.from(url, "base64").toString("utf8");
  } catch {
    return res.status(400).send("Invalid URL");
  }

  // SSRF Protection
  if (!/^https?:\/\//.test(decoded)) return res.status(400).send("Invalid URL");
  if (/localhost|127\.0\.0\.1|0\.0\.0\.0/.test(decoded)) return res.status(400).send("Blocked");

  try {
    const response = await fetch(decoded);
    const html = await response.text();
    res.setHeader("Content-Type", "text/html");
    res.send(html);
  } catch (e) {
    res.status(500).send("Failed to fetch");
  }
}
