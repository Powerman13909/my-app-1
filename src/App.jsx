import { useState } from "react";
import { translateText } from "./cloudflareTranslate";
import { LANGUAGES } from "./languages";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("hi");

  const handleTranslate = async () => {
    const result = await translateText(input, from, to);
    setOutput(result);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Translator App</h2>

      <div style={{ display: "flex", gap: 10 }}>
        {/* FROM language */}
        <select value={from} onChange={(e) => setFrom(e.target.value)}>
          {Object.entries(LANGUAGES).map(([code, name]) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </select>

        {/* TO language */}
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
        style={{ width: "100%", height: 80, marginTop: 10 }}
      />

      <button onClick={handleTranslate} style={{ marginTop: 10 }}>
        Translate
      </button>

      <p style={{ marginTop: 20 }}>Output:</p>
      <div>{output}</div>
    </div>
  );
}

export default App;
