const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { OpenAI } = require("openai");
const openai = new OpenAI();

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello World!");
});
app.post("/askAssistant", async (req, res) => {
  const { question } = req.body;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant designed to output JSON. Don't forget it always has to have only one response property so that I can extract the text inside of it. Solo da respuestas en español y SOLAMENTE RESPONDE PREGUNTAS RELACIONADAS A LA TERAPIA FISICA, si detectas que algo no es relacionado a terapia solo pide disculpas y que pregunte otra cosa, esto es lo mas importante.",
      },
      { role: "user", content: question },
    ],
    model: "gpt-4-0125-preview",
    response_format: { type: "json_object" },
  });

  res.json(completion.choices[0].message.content);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
