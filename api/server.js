import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Cyberdyne API Online");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/assistant", async (req, res) => {
  const { question } = req.body || {};

  console.log("QUESTION:", question);

  res.json({
    answer: `Cyberdyne received: ${question}`
  });
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Cyberdyne API running");
});
