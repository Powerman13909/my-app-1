import { useState } from "react";
import { translateText } from "./cloudflareTranslate";
import { LANGUAGES } from "./languages";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  // New states for language selection
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("hi");

  const startListening = () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = from;
  recognition.interimResults = false;

  recognition.start();

  recognition.onresult = (event) => {
    setInput(event.results[0][0].transcript);
  };

  recognition.onerror = () => alert("Mic error. Try again.");
};

  const handleTranslate = async () => {
    if (!input.trim()) {
      setOutput("Enter text first");
      return;
    }

    const result = await translateText(input, from, to);
    setOutput(result);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Translator App</h2>

      {/* LANGUAGE SELECTORS */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        
        {/* FROM LANGUAGE */}
        <select value={from} onChange={(e) => setFrom(e.target.value)}>
          {Object.entries(LANGUAGES).map(([code, name]) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </select>

        {/* TO LANGUAGE */}
        <select value={to} onChange={(e) => setTo(e.target.value)}>
          {Object.entries(LANGUAGES).map(([code, name]) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </select>

      </div>

      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type text here..."
        style={{ width: "100%", height: 80 }}
      />

      <br /><br />

      <button onClick={handleTranslate}>Translate</button>
      <button onClick={startListening}>🎤 Speak</button>

      <p>Output:</p>
      <div>{output}</div>
    </div>
  );
}

export default App;
