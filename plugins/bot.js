const axios = require("axios");
const selectionData = {};

module.exports = {
    config: {
      name: "bot",
      aliases: ["sim"],
      permission: 0,
      prefix: "both",
      categorie: "AI Chat",
      cooldowns: 5,
      credit: "Developed by Mohammad Nayan",
      usages: [
        `${global.config.PREFIX}bot <message> - Start a chat with the bot.`,
        `${global.config.PREFIX}bot - Receive a random greeting from the bot.`,
      ],
      description: "Engage in conversations with an AI-powered bot!",
    },

  event: async ({ event, api, body }) => {
    const { threadId, senderId, replyMessage, message} = event;

  
    if (!selectionData[threadId]) return;
    const { n, userId } = selectionData[threadId];

    
    if (userId !== senderId || !n) return;

    

    const quotedMessage =
      n.message?.extendedTextMessage?.text || null;

    if (!quotedMessage || replyMessage !== quotedMessage) return;
    

    try {

        const apis = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json');
      const apiss = apis.data.api;
      
      const response = await axios.get(
        `${apiss}/sim?type=ask&ask=${encodeURIComponent(body)}`
      );

      const replyText = response.data.data?.msg || "I'm not sure how to respond to that.";

      
      const botReply = await api.sendMessage(threadId, { text: replyText }, { quoted: message });

      
      selectionData[threadId] = {
        userId: senderId,
        n: botReply,
      };
    } catch (error) {
      console.error("Error while contacting the API:", error);
      await api.sendMessage(threadId, {
        text: "An error occurred while processing your request. Please try again later.",
      });
    }
  },

  start: async ({ event, api, args }) => {
    const usermsg = args.join(" ");
    const { threadId, senderId, message} = event;

    
    if (!usermsg) {
      const greetings = [
        "হুম জান তোমার অইখানে উম্মমাহ😷",
        "jang bal falaba🙂",
          "কি গো সোনা আমাকে ডাকছ কেনো",
        "বার বার আমাকে ডাকস কেন😡",
        "আমাকে এতো না ডেকে বস মুস্তাফিজুর কে একটা গফ দে 🙄",
        "jang hanga korba",
          "বস মুস্তাফিজুর তুমাকে রাতে ভালোবাসে",
          "আমাকে না ডেকে মুস্তাফিজুর বস কে ummmmmah 💋দে",
          "Eto dakis na.Mustafizur boss cipay ace 😘😘",
          "আর ডাকিস না। বস মুস্তাফিজুর রেগে গেছে",
          "এতো ডেকে লাভ নাই। মুস্তাফিজুর বস কারো সাথে ফিরিত করে না। শুধু বাসর করে",
          "কিরে ডাকস কেন। বস মুস্তাফিজুর কে লাগবে নাকি",
          " বান্ধবী ললিতা। কিছু বলবা । এখানে বলবা নাকি ইনবক্সে বলবা",
          "আর যাবো না বেগুল তুলিতে ও ললিতে আর যাবো না বেগুন তুলিতে",
          " চুপ কথা নাই তর সাথে । ",
          " মুস্তাফিজুর বস কে i love you বল । নিশি রাতের বাজনা শুনতে পাবি",
          " এখন তো ডাকবি । যখন বাসর করবি তখন তো ডাকবি না।",
          "কাগজের নোটের কাছে হেরে গেছে,সকালের ঘুম বিকেলের খেলা-ধুলা.!",
          "কতদিন হয়ে গেলো বিছনায় মুতি না-😿-মিস ইউ নেংটা কাল-🥺🤧",
          "তুই ছেলে হলে আস্সালামু আলাইকুম । মেয়ে হলে i love you 😘",
      ];

      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
      const userToMention = senderId;

      const greetingMessage = await api.sendMessage(threadId, {
        text: `@${userToMention.split('@')[0]}, ${randomGreeting}`,
        mentions: [userToMention],
      }, { quoted: message });

      
      selectionData[threadId] = {
        userId: senderId,
        n: greetingMessage,
      };
      return;
    }

    try {
        const apis = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json');
      const apiss = apis.data.api;
      
      const response = await axios.get(
        `${apiss}/sim?type=ask&ask=${encodeURIComponent(usermsg)}`
      );

      const replyText = response.data.data?.msg || "I'm not sure how to respond to that.";

      
      const botReply = await api.sendMessage(threadId, { text: replyText }, { quoted: message });

      
      selectionData[threadId] = {
        userId: senderId,
        n: botReply,
      };
    } catch (error) {
      console.error("Error while contacting the API:", error);
      await api.sendMessage(threadId, {
        text: "An error occurred while processing your request. Please try again later.",
      });
    }
  },
};
