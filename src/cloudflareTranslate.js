import { CF_ACCOUNT_ID, CF_API_TOKEN } from "./config";

export async function translateText(text, sourceLang, targetLang) {
  const url = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/ai/run/@cf/meta/m2m100-1.2b`;

  const body = {
    text,
    source_lang: sourceLang,
    target_lang: targetLang,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${CF_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return data.result.translated_text;
}
