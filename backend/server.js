require("dotenv").config();

const express = require("express");
const cors = require("cors");
const rateLimit = require("./rateLimit");
const auth = require("./auth");
const getAIResponse = require("./ai");

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimit);

// Home route
app.get("/", (req, res) => {
  res.send("✅ SaarthiNet backend is running");
});

// REAL AI API
app.post("/ask", auth, async (req, res) => {
  try {
    const userText = req.body.message;

    if (!userText) {
      return res.status(400).json({ error: "Message is required" });
    }

    const aiReply = await getAIResponse(userText);
    return res.json({ reply: aiReply });

  } catch (error) {
    console.error("❌ /ask route error:", error.message);

    // ALWAYS return JSON
    return res.status(500).json({
      error: "Internal Server Error",
      reply: "माफ़ कीजिए, अभी सिस्टम में समस्या आ रही है।"
    });
  }
});

app.listen(3000, () => {
  console.log("✅ SaarthiNet backend running at http://localhost:3000");
});
