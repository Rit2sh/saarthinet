const mongoose = require("mongoose");

const voiceRequestSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    inputText: { type: String, required: true },
    intent: { type: String },
    response: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("VoiceRequest", voiceRequestSchema);