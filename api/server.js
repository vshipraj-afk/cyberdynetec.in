import express from "express";
import OpenAI from "openai";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

console.log("KEY PRESENT:", !!process.env.OPENAI_API_KEY);

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req,res)=>{
  res.send("Cyberdyne API Online");
});

app.get("/health",(req,res)=>{
  res.json({status:"ok"});
});

app.post("/api/assistant", async (req,res)=>{
  try{
    const { question } = req.body;

    console.log("QUESTION:", question);

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: "You are Cyberdyne Assistant."
        },
        {
          role: "user",
          content: question
        }
      ]
    });

    console.log("OPENAI SUCCESS");

    res.json({
      answer: response.choices[0].message.content
    });

  }catch(err){

    console.error("OPENAI ERROR:");
    console.error(err);

    res.status(500).json({
      answer: "OpenAI error. Check Render logs."
    });
  }
});

app.listen(process.env.PORT || 3001);
