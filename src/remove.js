const axios = require('axios');
const getDynamicList = require('./getList');


async function removeDynamic(params) {
    const CSRF = "";// 请替换为你的 CSRF 令牌
    const API_URL = "https://api.bilibili.com/x/dynamic/feed/operate/remove";
    const bili_id = 123;
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}?platform=web&csrf=${CSRF}`,
            headers: {
                'authority': 'api.bilibili.com',
                'accept': '*/*',
                'accept-language': 'zh,en-US;q=0.9,en;q=0.8,zh-TW;q=0.7,zh-CN;q=0.6',
                'content-type': 'application/json',
                'origin': 'https://space.bilibili.com',
                'referer': `https://space.bilibili.com/${bili_id}/dynamic`,
                'sec-ch-ua': '"Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-site',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
                'cookie': 'buvid3=B5B5DD1E-1F1A-BF4D-31CE-4CC7AEC68C7C80397infoc; bili_jct=51067935941af45f04262bd5999d6f42; SESSDATA=d85bab7c%2C1756442648%2Caf9f3%2A31CjAVRZDcuhKp-for3exWXuXYThu64NFRF0meKDK4fvG0ddFJPkgAImkOaFv_szzOaskSVlBhajl6amp0ZWRaYmMxZ2lLb0xCbTZ2QWNqd3hhSE9nbUZ0bUhNRHFWZ2RvZ2tCT0pWMDZWRHQtdFN5aDBZV3pRZGpacHYydzZ6Tml5QVlUcUVlTGRnIIEC'
            },
            data: params
        });
        return response.data;
    } catch (error) {
        console.error('删除动态失败:', error);
        return null;
    }
}


// 获取动态列表并逐个删除
async function removeAllDynamics() {
    try {
        const data = await getDynamicList(bili_id);
        if (data && data.data && data.data.items) {
            console.log(`获取到 ${data.data.items.length} 条动态`);
            
            for (const item of data.data.items) {
                const params = {
                    dyn_id_str: item.id_str,
                    dyn_type: item.type === 'DYNAMIC_TYPE_FORWARD' ? 1 : 
                             item.type === 'DYNAMIC_TYPE_DRAW' ? 2 :
                             item.type === 'DYNAMIC_TYPE_WORD' ? 4 : 1,
                    rid_str: item.basic.rid_str
                };
                
                console.log(`正在删除动态: ${params.dyn_id_str}`);
                const result = await removeDynamic(params);
                
                if (result && result.code === 0) {
                    console.log('删除成功');
                } else {
                    console.log('删除失败:', result);
                }
                
                // 添加延时，避免请求过快
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            await removeAllDynamics();
        }
    } catch (error) {
        console.error('批量删除失败:', error);
    }
}


// 执行批量删除
removeAllDynamics();