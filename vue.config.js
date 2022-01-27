let publicPath = process.env.NODE_ENV === 'production' ? './' : '/';

module.exports = {
    publicPath,
    // productionSourceMap: false,
    lintOnSave: false,
    devServer: {
        port: 5050, // 端口号
        proxy: {
            '/socket':{
                target:'ws://127.0.0.1:8086/websocket/test',
                changeOrigin: true,
                ws: true, // 是否启用websockets
                pathRewrite: {
                    '^/socket': ''
                }
            },
            '/internal': {
                target: 'https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=chinaDayList,chinaDayAddList',
                changeOrigin: true,
                ws: true, // 是否启用websockets
                secure: true,
                pathRewrite: {
                    '^/internal': ''
                }
            },
            '/apihlj': {
                target: 'https://api.inews.qq.com/newsqa/v1/query/pubished/daily/list?province=%E9%BB%91%E9%BE%99%E6%B1%9F',
                changeOrigin: true,
                ws: true, // 是否启用websockets
                secure: true,
                pathRewrite: {
                    '^/apihlj': ''
                }
            },
            '/hrbbaidupai': {//查找哈尔滨历史疫情数据
                target: 'https://voice.baidu.com/newpneumonia/getv2?from=mola-virus&stage=publish&target=trendCity&area=%E9%BB%91%E9%BE%99%E6%B1%9F-%E5%93%88%E5%B0%94%E6%BB%A8',
                changeOrigin: true,
                ws: true, // 是否启用websockets
                secure: true,
                pathRewrite: {
                    '^/hrbbaidupai': ''
                }
            },
            '/baidu': {//查找新闻信息https://opendata.baidu.com/data/inner?tn=reserved_all_res_tn&dspName=iphone&from_sf=1&dsp=iphone&resource_id=28565&alr=1&query=%E5%9B%BD%E5%86%85%E6%96%B0%E5%9E%8B%E8%82%BA%E7%82%8E%E6%9C%80%E6%96%B0%E5%8A%A8%E6%80%81国内
                target: 'https://opendata.baidu.com/data/inner?tn=reserved_all_res_tn&dspName=iphone&from_sf=1&dsp=iphone&resource_id=28565&alr=1&query=%E5%9B%BD%E5%86%85%E6%96%B0%E5%9E%8B%E8%82%BA%E7%82%8E%E6%9C%80%E6%96%B0%E5%8A%A8%E6%80%81',
                changeOrigin: true,
                ws: true, // 是否启用websockets
                secure: true,
                pathRewrite: {
                    '^/baidu': ''
                }
            },
            '/msghrb':{
                target: 'https://opendata.baidu.com/data/inner?tn=reserved_all_res_tn&dspName=iphone&from_sf=1&dsp=iphone&resource_id=28565&alr=1&query=%E9%BB%91%E9%BE%99%E6%B1%9F%E5%93%88%E5%B0%94%E6%BB%A8%E6%96%B0%E5%9E%8B%E8%82%BA%E7%82%8E%E6%9C%80%E6%96%B0%E5%8A%A8%E6%80%81',
                changeOrigin: true,
                ws: true, // 是否启用websockets
                secure: true,
                pathRewrite: {
                    '^/msghrb': ''
                }
            },
            '/tencent': {
                target: 'https://view.inews.qq.com/g2',
                changeOrigin: true,
                ws: true, // 是否启用websockets
                secure: true,
                pathRewrite: {
                    '^/tencent': ''
                }
            },
            '/hljuapi': {
                target: 'http://127.0.0.1:8086',
                changeOrigin: true, //是否跨域
                pathRewrite: {
                    '^/hljuapi': ''
                },
                // ws: true, //用于支持websocket
                // changeOrigin: true //用于控制请求头中的host值
                /*  */
            },
        },

    }
};