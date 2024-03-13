/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2024/03/C语言-1-C语言基本概念/index.html","865af75bf11e0db36919daa048067e04"],["/2024/03/daily/index.html","43871fd303c6b97cbae9e7cebccfa385"],["/2024/03/linux-common-cmd/index.html","286e0b3830a9d0d36bb91266a1281564"],["/2024/03/python-python的requests在网络请求中添加cookies参数/index.html","a5f5bfc010fc67cb1f9b2d8ea284ea93"],["/2024/03/stm32-5-Systick滴答定时器初始化（HAL库）-无OS延时函数/index.html","3a834b85bfada89ec2e0ea7933930aa7"],["/2024/03/stm32-STM32-HAL库驱动DHT11读取温湿度程序/index.html","0b01488c4d32c042f7113523d1c6779f"],["/2024/03/stm32-STM32-实现-44-矩阵键盘扫描（HAL库、标准库-都适用）-白菜没我白-博客园/index.html","1956838dc66c915d3123a548b42259db"],["/2024/03/stm32-STM32CubeMX-HAL库的ADC多通道数据采集（轮训、DMA、DMA-TIM-、读取内部传感器温度/index.html","7e2d0470f01131f2b96cc89b308b44ca"],["/2024/03/stm32-STM32F407使用Helix库软解MP3并通过DAC输出，最精简的STM32-SD卡实现MP3播放器/index.html","0087cab2895cdf3a7b1a860ed92e1430"],["/2024/03/stm32-STM32HAL库学习笔记（一）——GPIO/index.html","8a91dd6d4c3861f546c7d160b06494ba"],["/2024/03/stm32-【HAL库】STM32-ESP8266-Onenet-MQTT，极简工程，hal库移植。/index.html","cb3592184c97db554a2836baf7f870a0"],["/2024/03/stm32-【STM32】HAL库-STM32CubeMX教程十三-RTC时钟/index.html","2b1283ac299002e52024ab921875a88a"],["/2024/03/stm32-基于STM32F103C8T6（HAL库）的HC-SR501红外人体传感及HC-SR04超声波测距/index.html","88ae8c6a1483ac9f77fdd2bfcdd15111"],["/2024/03/stm32-基于STM32HAL库，RC522（RFID）模块读写驱动，无线IC卡读写/index.html","6028f46c64fce770f79b32d622b88446"],["/2024/03/stm32-基于STM32的HC-SR501红外感应模块驱动与应用/index.html","dfcc28f4cef8ca6e689fa05494c31783"],["/2024/03/stm32-手把手教你，通过HAL库实现STM32的超声波测距-以SR-04为例/index.html","26d1e5cc33123a48265cfa0a3f275b6d"],["/2024/03/usageOfHexo/index.html","c454f7f3142d667598dda25ec657ab78"],["/2024/03/【STM32】HAL库_STM32CubeMX教程十三---RTC时钟/index.html","6bad24d21f48314a0546241089882240"],["/about/index.html","19cef1dc1d3fb3b8d506be1882ddf15b"],["/archives/2024/03/index.html","82b7be4af32eebbd1af1613f46f48216"],["/archives/2024/03/page/2/index.html","853fc8b374ccd52c1ac22437a32693fc"],["/archives/2024/03/page/3/index.html","69e26dcdbba0ad30fe7a7e4272be9225"],["/archives/2024/index.html","251de3b2e258c4768be5e310182012ad"],["/archives/2024/page/2/index.html","360304a6afe36cb22b10029980e015b3"],["/archives/2024/page/3/index.html","dbfc180211b0e36411a4382abbd42390"],["/archives/index.html","22b75f071f4c988250184573123aa28b"],["/archives/page/2/index.html","70399f9af2eb808493019af4fc9726c0"],["/archives/page/3/index.html","153d67609ef0fc4e071eaf539504cbf8"],["/categories/C语言/index.html","78be7ec807d64c5426da45f69f96aec0"],["/categories/C语言/入门/index.html","3cdafb948371c2e533b15bfd1fcd5844"],["/categories/hexo/index.html","c3fdd29cdc36da9f9e664c741d0f5852"],["/categories/index.html","0f67b27b4a41716686d113cbc5847481"],["/categories/linux常用命令/index.html","0578c406a54ae2b550273b436c607edd"],["/categories/python/index.html","a014aa6a26861461bd125eba3d1a0204"],["/categories/python/requests/index.html","186bbb4a303084478b4313a728cb8c2f"],["/categories/stm32/index.html","f0a96a29c4df44b8c3b9abe8609fac6c"],["/categories/stm32/page/2/index.html","3727ecf0e90c55f041aef3f1e7ed3070"],["/categories/stm32/stm32-hal库开发/index.html","bbf60ff2cf5d9e4f60c11d7875c85d85"],["/categories/stm32/stm32hal库开发/index.html","ffd4b8ca2395deb5f13e4f5c97d26e99"],["/categories/stm32/stm32hal库开发/page/2/index.html","926607b76311d69aca6f85247c333094"],["/css/index.css","c1f9f0e60847bcfa3aea9c2c217819b7"],["/css/modify.css","b84cf3325e4eb5ce86e4043fdb54e7e1"],["/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["/img/background.jpg","141db8f4899139d02900184132b07710"],["/img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/img/index.jpg","de8272f6c405d4e9ae9d67600513b771"],["/img/top.jpg","b69cc5753fc773bfa0c68ec428175b64"],["/index.html","f500fbfdbf5a5017ecd9180dce3f8935"],["/js/custom/foot.js","0c68943056eb42d7aecb3da368ff4393"],["/js/custom/snow.js","abdafbb0471a95535e5e703d174d387d"],["/js/jquery-3.6.1.min.js","00727d1d5d9c90f7de826f1a4a9cc632"],["/js/main.js","960297fafacb19dff1246d71f6dfcf6f"],["/js/search/algolia.js","4491ac1d470a1693a502a9d09034aa21"],["/js/search/local-search.js","9da6b76672a143c8c8449770a8d259f3"],["/js/tw_cn.js","fb4da68124bbafbd2d3da537c80e27ce"],["/js/utils.js","420a15cf446b5670244a9ea05b2bccf0"],["/link/index.html","2a9ac2bd082a51ba5c3c15b0bac04263"],["/page/2/index.html","77ceb0417c750abe2c46eed7347dc86f"],["/page/3/index.html","f47169d4fd772889ac672a7fc3d13a5a"],["/resources/index.html","8cb904008c5237360bd4407d38be95c3"],["/styles/main.css","dcdbf93a47b27e97646b75c1f4cb9d38"],["/sw-register.js","dcd4b3cba1de35138bc6937842c3906c"],["/tags/C语言/index.html","09f04495a5428aed695a139f5894b4d2"],["/tags/hexo/index.html","cf7c0f8b6ef2808cc1770c6bb91bfcbe"],["/tags/index.html","a0e75dc12422f732e5d6f38ea141fd3b"],["/tags/linux/index.html","bef7046a07575f144d03d58e62da8a21"],["/tags/python/index.html","9b64f9914d5abb37c28e7cc78575c8c5"],["/tags/stm32/index.html","39875180527e9b84b4820ed6a4db400d"],["/tags/stm32/page/2/index.html","3a6c51a1141cbad161a91d145313b1f9"],["/tags/ubuntu/index.html","499c54becfeb58a317fece86ea29cf52"],["/tags/入门/index.html","d3a5c1d956b7a71b271dc97b5c7a1fba"],["/tags/外设/index.html","23650174259b186b263cf3a4eb65547b"],["/tags/外设/page/2/index.html","2ce5848121e745ec5cf494bfcfe196a7"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');
var firstRegister = 1; // 默认1是首次安装SW， 0是SW更新


var ignoreUrlParametersMatching = [/^utm_/];


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var cleanResponse = function (originalResponse) {
    // 如果没有重定向响应，不需干啥
    if (!originalResponse.redirected) {
        return Promise.resolve(originalResponse);
    }

    // Firefox 50 及以下不知处 Response.body 流, 所以我们需要读取整个body以blob形式返回。
    var bodyPromise = 'body' in originalResponse ?
        Promise.resolve(originalResponse.body) :
        originalResponse.blob();

    return bodyPromise.then(function (body) {
        // new Response() 可同时支持 stream or Blob.
        return new Response(body, {
            headers: originalResponse.headers,
            status: originalResponse.status,
            statusText: originalResponse.statusText
        });
    });
};

var createCacheKey = function (originalUrl, paramName, paramValue,
    dontCacheBustUrlsMatching) {

    // 创建一个新的URL对象，避免影响原始URL
    var url = new URL(originalUrl);

    // 如果 dontCacheBustUrlsMatching 值没有设置，或是没有匹配到，将值拼接到url.serach后
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
        url.search += (url.search ? '&' : '') +
            encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
};

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // 如果 whitelist 是空数组，则认为全部都在白名单内
    if (whitelist.length === 0) {
        return true;
    }

    // 否则逐个匹配正则匹配并返回
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function (whitelistedPathRegex) {
        return path.match(whitelistedPathRegex);
    });
};

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // 移除 hash; 查看 https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // 是否包含 '?'
        .split('&') // 分割成数组 'key=value' 的形式
        .map(function (kv) {
            return kv.split('='); // 分割每个 'key=value' 字符串成 [key, value] 形式
        })
        .filter(function (kv) {
            return ignoreUrlParametersMatching.every(function (ignoredRegex) {
                return !ignoredRegex.test(kv[0]); // 如果 key 没有匹配到任何忽略参数正则，就 Return true
            });
        })
        .map(function (kv) {
            return kv.join('='); // 重新把 [key, value] 格式转换为 'key=value' 字符串
        })
        .join('&'); // 将所有参数 'key=value' 以 '&' 拼接

    return url.toString();
};


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
    precacheConfig.map(function (item) {
        var relativeUrl = item[0];
        var hash = item[1];
        var absoluteUrl = new URL(relativeUrl, self.location);
        var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
        return [absoluteUrl.toString(), cacheKey];
    })
);

function setOfCachedUrls(cache) {
    return cache.keys().then(function (requests) {
        // 如果原cacheName中没有缓存任何收，就默认是首次安装，否则认为是SW更新
        if (requests && requests.length > 0) {
            firstRegister = 0; // SW更新
        }
        return requests.map(function (request) {
            return request.url;
        });
    }).then(function (urls) {
        return new Set(urls);
    });
}

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return setOfCachedUrls(cache).then(function (cachedUrls) {
                return Promise.all(
                    Array.from(urlsToCacheKeys.values()).map(function (cacheKey) {
                        // 如果缓存中没有匹配到cacheKey，添加进去
                        if (!cachedUrls.has(cacheKey)) {
                            var request = new Request(cacheKey, { credentials: 'same-origin' });
                            return fetch(request).then(function (response) {
                                // 只要返回200才能继续，否则直接抛错
                                if (!response.ok) {
                                    throw new Error('Request for ' + cacheKey + ' returned a ' +
                                        'response with status ' + response.status);
                                }

                                return cleanResponse(response).then(function (responseToCache) {
                                    return cache.put(cacheKey, responseToCache);
                                });
                            });
                        }
                    })
                );
            });
        })
            .then(function () {
            
            // 强制 SW 状态 installing -> activate
            return self.skipWaiting();
            
        })
    );
});

self.addEventListener('activate', function (event) {
    var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.keys().then(function (existingRequests) {
                return Promise.all(
                    existingRequests.map(function (existingRequest) {
                        // 删除原缓存中相同键值内容
                        if (!setOfExpectedUrls.has(existingRequest.url)) {
                            return cache.delete(existingRequest);
                        }
                    })
                );
            });
        }).then(function () {
            
            return self.clients.claim();
            
        }).then(function () {
                // 如果是首次安装 SW 时, 不发送更新消息（是否是首次安装，通过指定cacheName 中是否有缓存信息判断）
                // 如果不是首次安装，则是内容有更新，需要通知页面重载更新
                if (!firstRegister) {
                    return self.clients.matchAll()
                        .then(function (clients) {
                            if (clients && clients.length) {
                                clients.forEach(function (client) {
                                    client.postMessage('sw.update');
                                })
                            }
                        })
                }
            })
    );
});



    self.addEventListener('fetch', function (event) {
        if (event.request.method === 'GET') {

            // 是否应该 event.respondWith()，需要我们逐步的判断
            // 而且也方便了后期做特殊的特殊
            var shouldRespond;


            // 首先去除已配置的忽略参数及hash
            // 查看缓存简直中是否包含该请求，包含就将shouldRespond 设为true
            var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
            shouldRespond = urlsToCacheKeys.has(url);

            // 如果 shouldRespond 是 false, 我们在url后默认增加 'index.html'
            // (或者是你在配置文件中自行配置的 directoryIndex 参数值)，继续查找缓存列表
            var directoryIndex = 'index.html';
            if (!shouldRespond && directoryIndex) {
                url = addDirectoryIndex(url, directoryIndex);
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 仍是 false，检查是否是navigation
            // request， 如果是的话，判断是否能与 navigateFallbackWhitelist 正则列表匹配
            var navigateFallback = '';
            if (!shouldRespond &&
                navigateFallback &&
                (event.request.mode === 'navigate') &&
                isPathWhitelisted([], event.request.url)
            ) {
                url = new URL(navigateFallback, self.location).toString();
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 被置为 true
            // 则 event.respondWith()匹配缓存返回结果，匹配不成就直接请求.
            if (shouldRespond) {
                event.respondWith(
                    caches.open(cacheName).then(function (cache) {
                        return cache.match(urlsToCacheKeys.get(url)).then(function (response) {
                            if (response) {
                                return response;
                            }
                            throw Error('The cached response that was expected is missing.');
                        });
                    }).catch(function (e) {
                        // 如果捕获到异常错误，直接返回 fetch() 请求资源
                        console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
                        return fetch(event.request);
                    })
                );
            }
        }
    });









/* eslint-enable */
