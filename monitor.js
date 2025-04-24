const axios = require('axios');

// 配置参数
const config = {
  targetUrl: 'https://www.777723.xyz',
  botToken: process.env.BOT_TOKEN,
  chatId: process.env.CHAT_ID
};

async function main() {
  try {
    console.log('开始执行监控任务');
    
    // 获取目标页面
    console.log('正在请求目标网站...');
    const response = await axios.get(config.targetUrl, {
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
      }
    });
    
    console.log(`HTTP状态码: ${response.status}`);
    
    // 解析HTML
    const $ = require('cheerio').load(response.data);
    const value = $('m[style*="2.8rem"]').text().trim();
    
    if (!value) {
      throw new Error('未找到目标元素');
    }
    
    console.log(`提取到值: ${value}`);
    
    // 发送到Telegram
    const telegramUrl = `https://api.telegram.org/bot${config.botToken}/sendMessage`;
    const payload = {
      chat_id: config.chatId,
      text: `监控值：${value}`
    };
    
    console.log('正在发送到Telegram...');
    const tgResponse = await axios.post(telegramUrl, payload, {
      timeout: 10000
    });
    
    console.log(`Telegram响应：${JSON.stringify(tgResponse.data)}`);
    
  } catch (error) {
    console.error('执行出错：', error.message);
    process.exit(1);  // 确保非零退出码
  }
}

main();
