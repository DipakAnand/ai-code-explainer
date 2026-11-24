import { useState } from "react";

function App() {
  const [code, setCode] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState("");

  function getData(val) {
    setCode(val);
  }

  function handleExplain() {
    if (!code.trim()) {
    alert("Please enter some code first!");
    return;
  }
      
      fetch("http://localhost:5001/api/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          code: "console.log('Hello World')"
        })
      })
    .then((response) => response.json())
        .then((data) => {
      console.log("Code received successfully!");
    });
  }
  
const checkBackend = async () => {
  const response = await fetch(
    "http://localhost:5001/api/health"
  );

  const data = await response.text();

  console.log(data);
};
  
  const sendCodeToBackend = async () => {
    setLoading(true);
    try {
      if (!code.trim()) {
        setResponse("Please enter some code first!");
        return;
      }
      const response = await fetch("http://localhost:5001/api/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          code: code
        })
      });

      const data = await response.json();
      setResponse(data.message);
      setExplanation(data.explanation);
    }
    catch (error) {
      console.log("Error:", error);
      setResponse("Something went wrong. Please try again.");
    }
    finally {
      setLoading(false);
    }
};

  return (
    <div>
      <h1>AI Code Explainer</h1>
      <p>Understand your code with AI</p>

      <textarea
        placeholder="Paste your JavaScript or React code here..."
        rows="10"
        cols="60"
        onChange={(e) => getData(e.target.value)}
        value = {code}
      />
      {/* {  console.log(code)} */}
      <br />

      <button onClick={handleExplain}>Explain My Code</button>
      <p>Code entered: {code}</p>
      <p>Backend Response: {response}</p>
      
      <button onClick={checkBackend}>
        Check Backend
      </button>
      <button onClick={sendCodeToBackend}  disabled={loading}>
        {loading ? "Processing..." : "Send Code to Backend"}
      </button>
      <p>{response}</p>
          {explanation && (
            <div>
              <h3>Code Explanation</h3>
              <p>{explanation}</p>
            </div>
          )}
      {loading && <p>Processing...</p>}
    </div>
  );
}

export default App;
