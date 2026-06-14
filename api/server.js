import express from "express";
import OpenAI from "openai";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/assistant", async (req, res) => {
  try {
    const { question } = req.body;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `You are Cyberdyne Assistant. Answer clearly and briefly: ${question}`,
    });

    res.json({ answer: response.output_text });
  } catch (err) {
    res.status(500).json({ answer: "Cyberdyne Assistant is offline." });
  }
});

app.listen(process.env.PORT || 3001);
