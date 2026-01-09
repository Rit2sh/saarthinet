const axios = require("axios");

async function getAIResponse(userMessage) {
  console.log("🧠 AI received:", userMessage);

  if (!process.env.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) {
    console.error("❌ OPENAI_API_KEY missing");
    return "AI key set nahi hai. Backend configuration incomplete hai.";
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are Saarthi AI. Reply in simple Hindi or Hinglish for Indian users."
          },
          {
            role: "user",
            content: userMessage
          }
        ],
        temperature: 0.5
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {
    console.error(
      "❌ OpenAI Error:",
      error.response?.data || error.message
    );
    return "AI service abhi available nahi hai.";
  }
}

module.exports = getAIResponse;
