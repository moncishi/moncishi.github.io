/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2024/03/daily/index.html","2b6c263f3e52cdb5bb23db955091a227"],["/2024/03/linux-common-cmd/index.html","91885a98f164c4be9a9c8f938eaeaec3"],["/2024/03/python-python的requests在网络请求中添加cookies参数/index.html","5f637dca53931a6690cbee8dac921e98"],["/2024/03/stm32-5-Systick滴答定时器初始化（HAL库）-无OS延时函数/index.html","acb3e05c31cf5cb1336bbcb81e4de26f"],["/2024/03/stm32-STM32-HAL库驱动DHT11读取温湿度程序/index.html","328a3f200cd61e8494aac08f7d5d71f4"],["/2024/03/stm32-STM32-实现-44-矩阵键盘扫描（HAL库、标准库-都适用）-白菜没我白-博客园/index.html","f47ea23b826b088e9c758d74332505d0"],["/2024/03/stm32-STM32CubeMX-HAL库的ADC多通道数据采集（轮训、DMA、DMA-TIM-、读取内部传感器温度/index.html","e4378c82683c961a4ed7f878fdb9d1e2"],["/2024/03/stm32-STM32F407使用Helix库软解MP3并通过DAC输出，最精简的STM32-SD卡实现MP3播放器/index.html","574c311b16e1f5f9e993d24c63141d3e"],["/2024/03/stm32-STM32HAL库学习笔记（一）——GPIO/index.html","f6ca1cf8b495a009ad9e4e094875a4fe"],["/2024/03/stm32-【HAL库】STM32-ESP8266-Onenet-MQTT，极简工程，hal库移植。/index.html","5398e52656cb057a04cbc604943db604"],["/2024/03/stm32-【STM32】HAL库-STM32CubeMX教程十三-RTC时钟/index.html","c15a5bead9239798edfb31f47337ea27"],["/2024/03/stm32-基于STM32F103C8T6（HAL库）的HC-SR501红外人体传感及HC-SR04超声波测距/index.html","127615a39386b4b3c935a62fb8046d45"],["/2024/03/stm32-基于STM32HAL库，RC522（RFID）模块读写驱动，无线IC卡读写/index.html","758e773022f9c5ef147f01c7dfaf0743"],["/2024/03/stm32-基于STM32的HC-SR501红外感应模块驱动与应用/index.html","2237c26f54de1c374beafcd15c4c40a0"],["/2024/03/stm32-手把手教你，通过HAL库实现STM32的超声波测距-以SR-04为例/index.html","a7d015fdf281ba351a61b6baa7d35f58"],["/2024/03/usageOfHexo/index.html","1b5f509e223ddec6d623e85be97f0477"],["/2024/03/【STM32】HAL库_STM32CubeMX教程十三---RTC时钟/index.html","71f60acd34bd81604e3da2a12c4e4696"],["/about/index.html","b26275aab69a2929e506fdbcc0534c6d"],["/archives/2024/03/index.html","b9e6b025e819ba886dd8c3e45883fcc5"],["/archives/2024/03/page/2/index.html","479cd9bfbf331acf992600fef250125b"],["/archives/2024/index.html","d6996d1a9123ea011bb52ec15d239b04"],["/archives/2024/page/2/index.html","2ec3702949ba8e48246d17fd93f39925"],["/archives/index.html","4f2c63c8e541b4439dfc035a8071fae0"],["/archives/page/2/index.html","911b79195e8d29c2aec6aed0c84c4a43"],["/categories/hexo/index.html","be981aeb8478ac8605d10eafaf47031d"],["/categories/index.html","e676eca54b8b4d300e4b16698496a040"],["/categories/linux常用命令/index.html","26d14c5377393d59fb153a86b8c1461e"],["/categories/python/index.html","35660752c38edb32fc0682f10e478a93"],["/categories/python/requests/index.html","7811d2c5679b327dcf0e95f5b5cd392a"],["/categories/stm32/index.html","64310b993d407c96e3aabcf7a9b281aa"],["/categories/stm32/page/2/index.html","2e609facc8c9850892d37f143951de55"],["/categories/stm32/stm32-hal库开发/index.html","eb16106c84984bfcdea6cc961dcd972a"],["/categories/stm32/stm32hal库开发/index.html","5e3fa79f40866682f4e6456afe73ae94"],["/categories/stm32/stm32hal库开发/page/2/index.html","a1a553cc4a52883605b38d257d89ddfe"],["/css/index.css","c1f9f0e60847bcfa3aea9c2c217819b7"],["/css/modify.css","b84cf3325e4eb5ce86e4043fdb54e7e1"],["/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["/img/background.jpg","141db8f4899139d02900184132b07710"],["/img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/img/index.jpg","de8272f6c405d4e9ae9d67600513b771"],["/img/top.jpg","b69cc5753fc773bfa0c68ec428175b64"],["/index.html","57052b4d3077b37246a6392bb2bfcc45"],["/js/custom/foot.js","0c68943056eb42d7aecb3da368ff4393"],["/js/custom/snow.js","abdafbb0471a95535e5e703d174d387d"],["/js/jquery-3.6.1.min.js","00727d1d5d9c90f7de826f1a4a9cc632"],["/js/main.js","960297fafacb19dff1246d71f6dfcf6f"],["/js/search/algolia.js","4491ac1d470a1693a502a9d09034aa21"],["/js/search/local-search.js","9da6b76672a143c8c8449770a8d259f3"],["/js/tw_cn.js","fb4da68124bbafbd2d3da537c80e27ce"],["/js/utils.js","420a15cf446b5670244a9ea05b2bccf0"],["/link/index.html","9b7ff5d8d6c2b5496d6bd9eae7c40171"],["/page/2/index.html","8668b7b2c4543eaf207ff4d8f8eb4da6"],["/resources/index.html","1ca7c7a92c12596e9bc0f7fa96484cda"],["/styles/main.css","dcdbf93a47b27e97646b75c1f4cb9d38"],["/sw-register.js","306abacddaa71b75c142e6f0b1483280"],["/tags/hexo/index.html","0f07563c8e3f9d7db17e64082c1d81f3"],["/tags/index.html","00e38875c1cc4ae821f6390f7f47232a"],["/tags/linux/index.html","cf7968243ef5d09901c656c2c0ed3b7d"],["/tags/python/index.html","db23faf5803cc9873157344bdc917fa0"],["/tags/stm32/index.html","a714d05831eaa13ab06bfd37e16f8dce"],["/tags/stm32/page/2/index.html","e9e542fadbd08396c388249a58bf424e"],["/tags/ubuntu/index.html","ef916f3db98c240fd8e0781ad18689ff"],["/tags/外设/index.html","ee401af0970e087c7dea60493c6a2a08"],["/tags/外设/page/2/index.html","2044b097bce2e8693bc40dd03e72a6bf"]];
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
