const axios = require('axios');

const config = {
    targetUrl: 'https://www.777723.xyz',
    botToken: process.env.BOT_TOKEN,
    chatId: process.env.CHAT_ID
};

async function sendToTelegram(message) {
    const telegramUrl = `https://api.telegram.org/bot${config.botToken}/sendMessage`;
    try {
        await axios.post(telegramUrl, {
            chat_id: config.chatId,
            text: message
        });
        console.log('Message sent successfully');
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

async function fetchTargetData() {
    try {
        const response = await axios.get(config.targetUrl);
        const html = response.data;
        const match = html.match(/<m style="font-size: 2.8rem;color: red;">(.*?)<\/m>/);
        const value = match ? match[1] : '未找到值';
        return value;
    } catch (error) {
        console.error('Error fetching data:', error);
        return '获取数据失败';
    }
}

async function main() {
    const value = await fetchTargetData();
    await sendToTelegram(value);
}

main();
