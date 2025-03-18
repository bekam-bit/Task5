import { useState, useMemo, useCallback } from "react";

// Character limit
const CHAR_LIMIT = 200;

// Custom hook for character count
const UseCharacterCount = () => {
  const [text, setText] = useState("");

  const charCount = useMemo(() => text.length, [text]);

  const updateText = useCallback((e) => {
    if (e.target.value.length <= CHAR_LIMIT) {
      setText(e.target.value);
    }
  }, []);

  const clearText = useCallback(() => {
    setText("");
  }, []);

  return { text, charCount, updateText, clearText };
};

const CharacterCounter = () => {
  const { text, charCount, updateText, clearText } = UseCharacterCount();
  const progress = (charCount / CHAR_LIMIT) * 100;
  const isWarning = progress >= 90;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "20px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>Real-Time Character Counter</h2>
      <textarea
        rows="12"
        value={text}
        onChange={updateText}
        placeholder="Type your text here... "
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: isWarning ? "2px solid red" : "1px solid #ccc",
        }}
      />
      {/* Progress Bar */}
      <div
        style={{
          marginTop: "10px",
          height: "10px",
          background: "#e0e0e0",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: isWarning ? "orange" : "green",
            borderRadius: "10px",
            transition: "width 0.3s ease-in-out",
          }}
        />
      </div>

      <p
        style={{
          textAlign: "center",
          marginTop: "5px",
          color: isWarning ? "red" : "black",
        }}
      >
        {charCount}/{CHAR_LIMIT} characters
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <button
          onClick={copyToClipboard}
          style={{ padding: "5px 10px", cursor: "pointer" }}
        >
          Copy
        </button>
        <button
          onClick={clearText}
          style={{ padding: "5px 10px", cursor: "pointer" }}
        >
          Clear Text
        </button>
      </div>
    </div>
  );
};

export default CharacterCounter;
