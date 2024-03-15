const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const { OpenAI } = require("openai");
const openai = new OpenAI();

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("hgeeee");

  res.json("Hello World!");
});
app.post("/askAssistant", async (req, res) => {
  const { question } = req.body;
  console.log(question);
  const openAIUrl = "https://api.openai.com/v1/engines/davinci/completions";
  const openAIKey = process.env.OPENAI_API_KEY;

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
  console.log(completion.choices[0].message.content);

  res.json(completion.choices[0].message.content);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
