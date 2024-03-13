/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2024/03/daily/index.html","bd113b74691140af4396756fdf0eed1f"],["/2024/03/linux-common-cmd/index.html","a0326ca5ecbefebf3a4f2863f0634692"],["/2024/03/python-python的requests在网络请求中添加cookies参数/index.html","ccaf23681b01467c44d20d4aabfe62aa"],["/2024/03/stm32-5-Systick滴答定时器初始化（HAL库）-无OS延时函数/index.html","79d01f1b961929f9a5d5e84812127dd3"],["/2024/03/stm32-STM32-HAL库驱动DHT11读取温湿度程序/index.html","0761a7aff5a164dd48d8ad7a6f4b9604"],["/2024/03/stm32-STM32-实现-44-矩阵键盘扫描（HAL库、标准库-都适用）-白菜没我白-博客园/index.html","bd4063a65e75e9ab2a68bd4b995f3673"],["/2024/03/stm32-STM32CubeMX-HAL库的ADC多通道数据采集（轮训、DMA、DMA-TIM-、读取内部传感器温度/index.html","90364081e8479113b93dfcad0883e6d4"],["/2024/03/stm32-STM32F407使用Helix库软解MP3并通过DAC输出，最精简的STM32-SD卡实现MP3播放器/index.html","594da3614cf34a8ee7b07f9467a028ae"],["/2024/03/stm32-STM32HAL库学习笔记（一）——GPIO/index.html","75b015ba855adfe4a14a6024cae08bdf"],["/2024/03/stm32-【HAL库】STM32-ESP8266-Onenet-MQTT，极简工程，hal库移植。/index.html","937aacad17d6f55aadc2c33d14be8fb6"],["/2024/03/stm32-【STM32】HAL库-STM32CubeMX教程十三-RTC时钟/index.html","8f3a8fbbe197a0e4431c4df341a952d2"],["/2024/03/stm32-基于STM32F103C8T6（HAL库）的HC-SR501红外人体传感及HC-SR04超声波测距/index.html","764d3cf6e5fb87fc6d031cc4b1f8db29"],["/2024/03/stm32-基于STM32HAL库，RC522（RFID）模块读写驱动，无线IC卡读写/index.html","19b573c269837b583178fd835abbebb8"],["/2024/03/stm32-基于STM32的HC-SR501红外感应模块驱动与应用/index.html","d1b74fdbe03baa6597c0c247bd9251cd"],["/2024/03/stm32-手把手教你，通过HAL库实现STM32的超声波测距-以SR-04为例/index.html","434597a5e1574ba9784621fc5706999c"],["/2024/03/usageOfHexo/index.html","73f0dc355c97dd05074ef901a4e28998"],["/2024/03/【STM32】HAL库_STM32CubeMX教程十三---RTC时钟/index.html","8b1404ff07649ea03dcc1cde496bea71"],["/about/index.html","9efd755882baf0f66948a7c13a225393"],["/archives/2024/03/index.html","159a6d7547f58e8b3bd96e5402cc4a87"],["/archives/2024/03/page/2/index.html","f11940c2c47dc183199eccd3eecddd32"],["/archives/2024/index.html","9c9f27da91e0dbfb8133fa1741dca6c2"],["/archives/2024/page/2/index.html","4da43828d1b0df2bef0219f5fab7c1ba"],["/archives/index.html","589308afeedb3b5cf21371dd6743f358"],["/archives/page/2/index.html","a15213890bd2fc893dc3bd2c65f93cbd"],["/categories/hexo/index.html","f0b02ff39055512da1f301b1a193fe26"],["/categories/index.html","20cc9cb937aff34a73deb0e8acd88d4f"],["/categories/linux常用命令/index.html","3ac827047f8c767398b111a2998ecc87"],["/categories/python/index.html","dc607d890dd184bd2e467a3c896f1aad"],["/categories/python/requests/index.html","453beb70e13c3e15633147afb54effd2"],["/categories/stm32/index.html","2445deb5e184cb5b3359149f1e1f4b33"],["/categories/stm32/page/2/index.html","9e57e7e070d4fab94f1665d393492ad2"],["/categories/stm32/stm32-hal库开发/index.html","a551aae775a0083e1d3e684a4834207d"],["/categories/stm32/stm32hal库开发/index.html","42e31d29f0443ea117a60c3d76172a64"],["/categories/stm32/stm32hal库开发/page/2/index.html","65573d0d78f4dda8ac9438974ab852a0"],["/css/index.css","c1f9f0e60847bcfa3aea9c2c217819b7"],["/css/modify.css","b84cf3325e4eb5ce86e4043fdb54e7e1"],["/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["/img/background.jpg","141db8f4899139d02900184132b07710"],["/img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/img/index.jpg","de8272f6c405d4e9ae9d67600513b771"],["/img/top.jpg","b69cc5753fc773bfa0c68ec428175b64"],["/index.html","9db0ee02520eccff117d240babd1a2ff"],["/js/custom/foot.js","0c68943056eb42d7aecb3da368ff4393"],["/js/custom/snow.js","abdafbb0471a95535e5e703d174d387d"],["/js/jquery-3.6.1.min.js","00727d1d5d9c90f7de826f1a4a9cc632"],["/js/main.js","960297fafacb19dff1246d71f6dfcf6f"],["/js/search/algolia.js","4491ac1d470a1693a502a9d09034aa21"],["/js/search/local-search.js","9da6b76672a143c8c8449770a8d259f3"],["/js/tw_cn.js","fb4da68124bbafbd2d3da537c80e27ce"],["/js/utils.js","420a15cf446b5670244a9ea05b2bccf0"],["/link/index.html","8fc5dfe2f4c40b15254f6e49906e9ee7"],["/page/2/index.html","d2e4059d99c7f74e5d2173082080ce0d"],["/resources/index.html","e4d196fde91b66ae8ecb07913d619508"],["/styles/main.css","dcdbf93a47b27e97646b75c1f4cb9d38"],["/sw-register.js","ac6a3de2c386285ee524a1ca3137661d"],["/tags/hexo/index.html","e804fec2726bc5cdb1e9b3d2194abf08"],["/tags/index.html","64896652baa6cbfb27bedb8c0ecace18"],["/tags/linux/index.html","cef937a75af3c9e3f8da32601630f3bf"],["/tags/python/index.html","137ee43697af2f6de08d5d3e2f10ef96"],["/tags/stm32/index.html","0491d4f7bebc6c3262c40f48b4dbdcd2"],["/tags/stm32/page/2/index.html","e883591c5a5c180c7af6c34d5006a5e4"],["/tags/ubuntu/index.html","db9a5ed937baa4a838e5b75671eb00f7"],["/tags/外设/index.html","48bd2ea93eb7484349e403db928692fe"],["/tags/外设/page/2/index.html","446026df0615bf50720a0b1defa25b40"]];
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
