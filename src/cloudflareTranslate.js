export async function translateText(text, from, to) {
  const url = "https://translator-worker.aadilmj2023.workers.dev";

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text, from, to })
  });

  if (!res.ok) return "Error contacting worker";

  const data = await res.json();
  return data.translated_text;
}
