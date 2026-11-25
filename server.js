// Start server

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

require("dotenv").config();
const openai = new OpenAI();

const app = express();

// Middleware
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173"
}));

// GET API
app.get("/api/health", (req, res) => {
  res.send("AI Code Explainer API is working!");
});

// POST API
app.post("/api/explain", async (req, res) => {
  const { code } = req.body;

//   console.log("Code received from React:", code);
//   const aiResponse = await openai.responses.create({
//   model: "gpt-5.5",
//   instructions: "You are an expert JavaScript teacher. Explain code in simple beginner-friendly language, step by step.",
//   input: code
// });

//   res.json({
//     message: "Code explained successfully!",
//     receivedCode: code,
//     explanation: aiResponse.output_text
  //   });
  res.json({
  message: "Code explained successfully!",
  receivedCode: code,
  explanation: `Here is your code:

  ${code}

  This code was received successfully by our backend.
  A real AI explanation will be generated when we connect the OpenAI API again.`
});
});

// Start server
app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
