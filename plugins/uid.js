module.exports = {
    config: {
        name: 'uid',
        aliases: ['id', 'userid'],
        permission: 0,
        prefix: 'both',
        categorie: 'Utilities',
        credit: 'Developed by Mohammad Nayan',
        usages: [
            `${global.config.PREFIX}uid - Get your WhatsApp number.`,
            `${global.config.PREFIX}id - Alias for getting your WhatsApp number.`,
            `${global.config.PREFIX}userid - Another alias for getting your WhatsApp number.`
        ]
    },
    start: async ({ event, api, message}) => {
        try {
            let senderNumber;

            if (event.senderId.endsWith('@g.us')) {
                senderNumber = event.senderId
                    ? event.senderId.split('@')[0]
                    : 'Unknown';
            } else {
                senderNumber = event.senderId.split('@')[0];
            }

            const userToMention = event.senderId;
            await api.sendMessage(event.threadId, { text: `@${userToMention.split('@')[0]}, 📌 Your UID: ${senderNumber}`,
        mentions: [userToMention],
      }, { quoted: event.message });

        } catch (error) {
            console.log(error)
            await api.sendMessage(event.threadId, { text: 'An error occurred while getting UID.' }, { quoted: event.message });
        }
    }
};
