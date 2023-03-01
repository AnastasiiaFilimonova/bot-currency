require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bot = require("./bot");
const PORT = process.env.PORT;
const API_URL = process.env.API_URL;

bot.setWebHook(`${API_URL}/bot${process.env.TOKEN}`);
const app = express();
app.use(cors());
app.use(express.json());
app.post(`/bot${process.env.TOKEN}`, (req, res, next) => {
  try {
    bot.processUpdate(req.body);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
app.use("*", (req, res) => {
  res.status(404).json({
    message: "404 Not Found",
  });
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  console.log({ err });
  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
