const axios = require('axios');

async function getDynamicList(bili_id) {
    try {
        const response = await axios({
            method: 'get',
            url: 'https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/space',
            params: {
                host_mid: bili_id,
                timezone_offset: '-480',
                platform: 'web',
                features: 'itemOpusStyle,listOnlyfans,opusBigCover,onlyfansVote,forwardListHidden,decorationCard,commentsNewVersion,onlyfansAssetsV2,ugcDelete,onlyfansQaCard',
                web_location: '333.1387'
            },
            headers: {
                'authority': 'api.bilibili.com',
                'accept': '*/*',
                'accept-language': 'zh,en-US;q=0.9,en;q=0.8,zh-TW;q=0.7,zh-CN;q=0.6',
                'cookie': 'buvid3=B5B5DD1E-1F1A-BF4D-31CE-4CC7AEC68C7C80397infoc; bili_jct=51067935941af45f04262bd5999d6f42; SESSDATA=d85bab7c%2C1756442648%2Caf9f3%2A31CjAVRZDcuhKp-for3exWXuXYThu64NFRF0meKDK4fvG0ddFJPkgAImkOaFv_szzOaskSVlBhajl6amp0ZWRaYmMxZ2lLb0xCbTZ2QWNqd3hhSE9nbUZ0bUhNRHFWZ2RvZ2tCT0pWMDZWRHQtdFN5aDBZV3pRZGpacHYydzZ6Tml5QVlUcUVlTGRnIIEC',
                'origin': 'https://space.bilibili.com',
                'referer': `https://space.bilibili.com/${bili_id}/dynamic`,
                'sec-ch-ua': '"Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-site',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
            }
        });
        return response.data;
    } catch (error) {
        console.error('获取动态列表失败:', error);
        return null;
    }
}

// 导出函数
module.exports = getDynamicList;

// 执行并提取动态ID
getDynamicList().then(data => {
    if (data && data.data && data.data.items) {
        const ids = data.data.items.map(item => ({
            dyn_id_str: item.id_str,
            dyn_type: item.type === 'DYNAMIC_TYPE_FORWARD' ? 1 : 
                      item.type === 'DYNAMIC_TYPE_DRAW' ? 2 :
                      item.type === 'DYNAMIC_TYPE_WORD' ? 4 : 1,
            rid_str: item.basic.rid_str
        }));
        console.log('动态ID列表:');
        console.log(JSON.stringify(ids, null, 2));
    }
});