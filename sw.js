/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2024/03/daily/index.html","c2dda2128c57821450f73f2b4b134a1f"],["/2024/03/linux-common-cmd/index.html","95f1646cabe9628bfe2a656c0fb1b178"],["/2024/03/python-python的requests在网络请求中添加cookies参数/index.html","11ddd157934d5ec87d1148c51bc839ce"],["/2024/03/stm32-5-Systick滴答定时器初始化（HAL库）-无OS延时函数/index.html","ad3c16f620630501b2e4a45beab9cafc"],["/2024/03/stm32-STM32-HAL库驱动DHT11读取温湿度程序/index.html","8ae6ac505eda8561ba32ce208ebe367c"],["/2024/03/stm32-STM32CubeMX-HAL库的ADC多通道数据采集（轮训、DMA、DMA-TIM-、读取内部传感器温度/index.html","4e76d34d3b2fe13326f4ee1d31d35c72"],["/2024/03/stm32-STM32HAL库学习笔记（一）——GPIO/index.html","6dd56b32f3b57ead6e7f49c8b41038df"],["/2024/03/stm32-【HAL库】STM32-ESP8266-Onenet-MQTT，极简工程，hal库移植。/index.html","1c50bbc817f33ca2df7fec2ebd11fdbe"],["/2024/03/stm32-【STM32】HAL库-STM32CubeMX教程十三-RTC时钟/index.html","0142d99b83b40e0d3622f7d63f88d755"],["/2024/03/stm32-基于STM32F103C8T6（HAL库）的HC-SR501红外人体传感及HC-SR04超声波测距/index.html","2be85185560b6508211227b6d292e1e3"],["/2024/03/stm32-基于STM32HAL库，RC522（RFID）模块读写驱动，无线IC卡读写/index.html","5324121a5058452090a2250797e428e6"],["/2024/03/stm32-基于STM32的HC-SR501红外感应模块驱动与应用/index.html","7c2400ffb19bbef350e397ad883c6657"],["/2024/03/stm32-手把手教你，通过HAL库实现STM32的超声波测距-以SR-04为例/index.html","bbaeb76930d3f3478972299f0abf0ee3"],["/2024/03/usageOfHexo/index.html","3e89f4c4aaa32e7eb0560460c028fafa"],["/2024/03/【STM32】HAL库_STM32CubeMX教程十三---RTC时钟/index.html","bde5011239bda32aea62cbbba1b5536d"],["/about/index.html","d486101d042a8471bbc50c6192c1f273"],["/archives/2024/03/index.html","fbb7be89fadbc08a8251126917687ce5"],["/archives/2024/03/page/2/index.html","ce3a2456a936a398340445665db4dec8"],["/archives/2024/index.html","228daccaa0138cec8feeae94c6195338"],["/archives/2024/page/2/index.html","6d3f90d53307bb30df309ace17e16129"],["/archives/index.html","26b9166cc369e7cde53016ea5dab2f1c"],["/archives/page/2/index.html","94cff08a8835db53ddc4faa9e69b198c"],["/categories/hexo/index.html","cdf33daa15cf27f7d17b1a95664b6485"],["/categories/index.html","d3b3ee44c34521526e7ba00b7934e91f"],["/categories/linux常用命令/index.html","f45ada2783d3b2aa12768b589d1f9c99"],["/categories/python/index.html","1aa5075fd136d0575559a9255a436ee6"],["/categories/python/requests/index.html","e157457e0d34a4500f557c229cd5fb64"],["/categories/stm32/index.html","eb8b04a64736dc46747d797e794f0a4b"],["/categories/stm32/page/2/index.html","bc94ab855797a2a8984cff6697f77785"],["/categories/stm32/stm32-hal库开发/index.html","ed9047406cd671926afcf12f1eaa2712"],["/categories/stm32/stm32-hal库开发/page/2/index.html","f6236b4c385e1ee44e0d51a5448484cd"],["/css/index.css","c1f9f0e60847bcfa3aea9c2c217819b7"],["/css/modify.css","b84cf3325e4eb5ce86e4043fdb54e7e1"],["/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["/img/background.jpg","141db8f4899139d02900184132b07710"],["/img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/img/index.jpg","de8272f6c405d4e9ae9d67600513b771"],["/img/top.jpg","b69cc5753fc773bfa0c68ec428175b64"],["/index.html","7e2f3e83c04d7d6c3c77958fc34665cd"],["/js/custom/foot.js","0c68943056eb42d7aecb3da368ff4393"],["/js/custom/snow.js","abdafbb0471a95535e5e703d174d387d"],["/js/jquery-3.6.1.min.js","00727d1d5d9c90f7de826f1a4a9cc632"],["/js/main.js","960297fafacb19dff1246d71f6dfcf6f"],["/js/search/algolia.js","4491ac1d470a1693a502a9d09034aa21"],["/js/search/local-search.js","9da6b76672a143c8c8449770a8d259f3"],["/js/tw_cn.js","fb4da68124bbafbd2d3da537c80e27ce"],["/js/utils.js","420a15cf446b5670244a9ea05b2bccf0"],["/link/index.html","c03d52264d5928bb8c813fa3461aec9d"],["/page/2/index.html","12aafa9d425967daec999e82c999a40c"],["/resources/index.html","0dcbac9872ca49de739de8066db2b9fb"],["/styles/main.css","dcdbf93a47b27e97646b75c1f4cb9d38"],["/sw-register.js","916c5274df04d9228806569de6e500eb"],["/tags/hexo/index.html","40915673c40b72f13808a004f6cdc48b"],["/tags/index.html","58948b707185fca0d5f885db3c64a32d"],["/tags/linux/index.html","896fb38778f9220079a9752ec18d3373"],["/tags/python/index.html","cda6c529afd259beff7879c26ac654d7"],["/tags/stm32/index.html","e0c84f59400ab108e56c0a3656303b9e"],["/tags/stm32/page/2/index.html","277203d414b6acac52da33662eb63d39"],["/tags/ubuntu/index.html","d5389f9b32cc2b74762adde76f1af4e8"]];
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
