require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const { getRandomWish } = require("./wish");

// replace the value below with the Telegram token you receive from @BotFather

// Create a bot that uses 'polling' to fetch new updates
const bot =
  process.env.BOT_MODE === "hook"
    ? new TelegramBot(process.env.TOKEN)
    : new TelegramBot(process.env.TOKEN, { polling: true });

// Matches "/echo [whatever]"

const currencies = {
  евро: 74,
  доллара: 68,
  рубля: 1,
};
const countries = {
  Франции: "Париж",
  России: "Москва",
  Китая: "Пекин",
};
const advices = [
  "Предлагаю съесть что-то вкусное!",
  "Вам следует найти и погладить кота!",
  "Вам необходимо прогуляться!",
  "Вам необходимо поваляться в снегу)",
];

bot.on("message", (msg) => {
  // console.log(msg)
  const chatId = msg.chat.id;
  const words = msg.text.split(" ");
  const [word1, word2] = words;
  console.log(msg.from);
  if (word1 === "совет") {
    const index = Math.floor(Math.random() * advices.length);
    bot.sendMessage(chatId, advices[index]);
  }

  if (word1 === "курс") {
    if (currencies[word2]) {
      bot.sendMessage(chatId, currencies[word2] + " руб.");
    } else {
      bot.sendMessage(chatId, "не знаю такой валюты");
    }
  }
  if (msg.text.toLowerCase().indexOf("поздрав") !== -1) {
    bot.sendMessage(chatId, `${msg.from.first_name}, ${getRandomWish()}`);
  }

  /* if (msg.text==="курс евро") {
    bot.sendMessage(chatId, "74 руб.")
  } else if (msg.text==="курс доллара") {
    bot.sendMessage(chatId, "68 руб.")
  } else if (msg.text.indexOf("курс")===0) {
    bot.sendMessage(chatId, "не знаю такой валюты")
  } 
  */
  if (word1 === "столица") {
    if (countries[word2]) {
      bot.sendMessage(chatId, countries[word2]);
    } else {
      bot.sendMessage(chatId, "не знаю такой страны");
    }
  }

  // send a message to the chat acknowledging receipt of their message
  // bot.sendMessage(chatId, msg.text+" "+msg.from.first_name);
});

module.exports = bot;
