// Start server

const express = require("express");
const cors = require("cors");

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
app.post("/api/explain", (req, res) => {
  const { code } = req.body;

  console.log("Code received from React:", code);

  res.json({
    message: "Code received successfully!",
    receivedCode: code
  });
});

// Start server
app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
