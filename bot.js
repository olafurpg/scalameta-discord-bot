var Discord = require("discord.js");
var auth = require("./auth.json");

// Configure logger settings
const winston = require("winston");
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" })
  ]
});
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

// Initialize Discord Bot
var client = new Discord.Client();
client.on("ready", () => {
  logger.info(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  logger.info(msg.author.avatar);
  logger.info(msg.author.avatarURL);
  switch (msg.channel.name) {
    case "experiment":
      if (msg.content == "ping") {
        msg.reply("pong");
      }
    default:
  }
});

client.login(auth.token);
