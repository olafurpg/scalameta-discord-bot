var Discord = require("discord.js");

const token = process.env["DISCORD_TOKEN"];
if (!token) {
  throw new Error("missing environment variable: DISCORD_TOKEN");
}

// Configure logger settings
const winston = require("winston");
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
    new winston.transports.Console({ format: winston.format.simple() })
  ]
});

var client = new Discord.Client();
client.on("ready", () => {
  logger.info(`Logged in as ${client.user.tag}!`);
});

const isWarnedAboutMissingProfilePicture = new Set();

client.on("message", msg => {
  switch (msg.channel.name) {
    case "experiment":
      if (msg.content == "ping") {
        msg.reply("pong");
      }

      if (
        !msg.author.avatarURL &&
        !isWarnedAboutMissingProfilePicture.has(msg.author.id)
      ) {
        isWarnedAboutMissingProfilePicture.add(msg.author.id);
        msg.reply("Can you please upload a profile picture?");
      }
    default:
  }
});

client.login(token);
