import { CF_ACCOUNT_ID, CF_API_TOKEN } from "./config";

export async function speakText(text, lang) {
  const url = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/ai/run/@cf/openai/whisper-tts`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${CF_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      voice: lang === "en" ? "emma" : "alloy",
    }),
  });

  const result = await response.json();
  const audioBase64 = result.result.audio;

  const audio = new Audio(`data:audio/mp3;base64,${audioBase64}`);
  audio.play();
}
