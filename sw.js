/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2022/11/hexo-Hexo-双线部署到-Coding-Pages-和-GitHub-Pages-并实现全站-HTTPS/index.html","f578aa6bcbdafb83d03cdd3dc6abe414"],["/2024/03/C语言-1-C语言基本概念/index.html","d4257799a9e8dc506a5406d2adc7d774"],["/2024/03/C语言-C语言-C语言解释器的实现/index.html","d7c34e8fc1e7e217a9034408a9b45281"],["/2024/03/ESP32-ESP32cam系列教程002：ESP32cam通过MQTT协议上传图片数据到阿里云IOT平台-巧遇人生-博客园/index.html","0b82d311d3320e39407a330d4247a4de"],["/2024/03/Proteus-Proteus仿真416译码器74HC154-流水灯/index.html","5cb11c342ba0913b44ce9e4c8d1fe96a"],["/2024/03/Proteus-Proteus仿真4X4矩阵按键扫描组成的加减运算/index.html","5ab19ad6402ea89605ca3c6cfe9988ad"],["/2024/03/Proteus-Proteus仿真4X4矩阵按键扫描组成的简易加法器/index.html","cceb85837583e826778855d884d7a324"],["/2024/03/Proteus-Proteus仿真4X4矩阵按键显示0F/index.html","13f3f6c2f4d2c74e5934ef3ace149f9d"],["/2024/03/Proteus-Proteus仿真4x4矩阵键盘中断方式扫描-数码管显示/index.html","53cf7468cac3335fa2e390ad7e4c5f18"],["/2024/03/Proteus-Proteus仿真6位数码管秒计数器0999999S/index.html","8aec0ef233a0fcf5215862bd3cd58566"],["/2024/03/Proteus-Proteus仿真6位数码管计时器0105/index.html","1b75f0f4356f3b20f6f8ea6d2645f746"],["/2024/03/Proteus-Proteus仿真74HC154-四线转12线译码器组成的16路流水灯/index.html","3752a887766e329355e46324509dd11e"],["/2024/03/Proteus-Proteus仿真74HC59574LS154驱动显示16X16点阵/index.html","521d873bde272a81f273db3913eacdf9"],["/2024/03/Proteus-Proteus仿真74LS194组成的8个led流水灯/index.html","5cb87385ee4a3e0c019ec1f86f866e66"],["/2024/03/Proteus-Proteus仿真88LED点阵屏仿电梯数字滚动显示/index.html","278002f9154e7aba1691d0a7d5dd249f"],["/2024/03/Proteus-Proteus仿真8x8Led点阵数字循环显示/index.html","059e063e5f864319d9124395debe5696"],["/2024/03/Proteus-Proteus仿真8位数码管动态扫描显示变化数据/index.html","d999ecdb877527597c2559eb747ddea7"],["/2024/03/Proteus-Proteus仿真8位端口检测8独立按键/index.html","49f2f55e8b606ce0098bc0198748cb14"],["/2024/03/Proteus-Proteus仿真AT24C02数据读写LCD1602显示/index.html","008be382308fff0e1b73e6abe9b828e0"],["/2024/03/Proteus-Proteus仿真BME280温湿度气压传感器数据串口输出/index.html","edc8eb822d6efa15d5b2835702bb2879"],["/2024/03/Proteus-Proteus仿真DHT11和实际硬件的差异以及读不到数据原因分析/index.html","0507b9e2ca74eef863da14455ff13345"],["/2024/03/Proteus-Proteus仿真DS18B20报警温度可调LM016显示/index.html","d7b4b0b69b00c676d57d2a052b915488"],["/2024/03/Proteus-Proteus仿真HCSRF04超声波测距传感器数码管显示/index.html","6d6e2079bc8dd9c89ae95b3f1d79e23b"],["/2024/03/Proteus-Proteus仿真INT0和INT1中断计数/index.html","80a9b3dae11d5ef5566387f75c9e2b4e"],["/2024/03/Proteus-Proteus仿真L297驱动步进电机/index.html","5b2049d071a0a783235ae3a83fc53ae4"],["/2024/03/Proteus-Proteus仿真LCD1602DS1307按键设置简易时钟/index.html","268fdfe107a07d992825f01f966538b9"],["/2024/03/Proteus-Proteus仿真LCD1602字符滚动显示示例/index.html","cddb3ffaf493534e14a086bba6504bf7"],["/2024/03/Proteus-Proteus仿真LCD1602整屏内容信息移动/index.html","fdf669922795402f6f66fc6132c3bd3a"],["/2024/03/Proteus-Proteus仿真NE555延时电路/index.html","54b4b9abe2ecfe8114120747da58aca4"],["/2024/03/Proteus-Proteus仿真PCF8591-AD电压采集8X8点阵显示/index.html","75202d05b01c211cc270ef6ea301e6ff"],["/2024/03/Proteus-Proteus仿真STC15单片机-LCD16025X8点阵字符显示/index.html","fdc43e1117992cd08706d1d94f51d07b"],["/2024/03/Proteus-Proteus仿真T6963C驱动PG12864示例带中英文显示/index.html","489bccf084cd85d03d31867ef3551041"],["/2024/03/Proteus-Proteus仿真TLC5615输出1024点正弦波振幅可调/index.html","0698658104f314436f08297ed42b88f4"],["/2024/03/Proteus-Proteus仿真TLC5615输出256点正弦波振幅可调/index.html","634486223cfc12235c9d6636352ec490"],["/2024/03/Proteus-Proteus仿真uln2003驱动二相四线制步进电机正转/index.html","3d6c6444d1b282ec47a8369980280861"],["/2024/03/Proteus-Proteus仿真三极管组成的H桥驱动直流电机按键正反转控制/index.html","8ef90a98071f5662132714f9ae73ab4f"],["/2024/03/Proteus-Proteus仿真三极管组成的H桥驱动直流电机正反转可控/index.html","16b043c64f3d9cbf9f659388575f9b53"],["/2024/03/Proteus-Proteus仿真利用加法计数器74XX160的级联实现2位计数/index.html","b38eb7ab5ddf7301927ebefa5b3f726f"],["/2024/03/Proteus-Proteus仿真单片机DS18B20LCD1602显示/index.html","2b18f6007f6103fb0e7c2105e9889c1f"],["/2024/03/Proteus-Proteus仿真在AT24C04的连续地址中写入数据并循环读取/index.html","dcd699fb6bbf3276c3d450e2a1ecb06b"],["/2024/03/Proteus-Proteus仿真基于74LS14874LS27974LS48的四路抢答器/index.html","55cf3502c3a94ecafcdc41d8bcea10ca"],["/2024/03/Proteus-Proteus仿真基于VSM-串口printf调试输出示例/index.html","d3addadd884a066293e3f8836d2bcb93"],["/2024/03/Proteus-Proteus仿真外部中断触发倒计时5秒/index.html","c8abd8f96546f6101ec74a0d4c9c4061"],["/2024/03/Proteus-Proteus仿真外部中断通过双继电器控制直流电机正反转/index.html","2a503d1af682ef8e5bb4651851ac1356"],["/2024/03/Proteus-Proteus仿真多路非阻塞延时流水灯演示/index.html","b73cbdc518ee1966f99fe516e271a2d8"],["/2024/03/Proteus-Proteus仿真定时器0作为16位计数器使用示例/index.html","45878c31bf5dd7e2753e23e7e0450a5c"],["/2024/03/Proteus-Proteus仿真定时器1外部计数中断/index.html","77bc4ade4d92138e673defa6ee2fe551"],["/2024/03/Proteus-Proteus仿真按键设置数码管显示/index.html","4945f0e2a99b9c1fc6c1b527d46554b4"],["/2024/03/Proteus-Proteus仿真数码管4x4键盘矩阵按键简易计算器/index.html","1f038e193fae4c874d5cbeaa50fba993"],["/2024/03/Proteus-Proteus仿真数码管递加递减带闪烁消隐显示/index.html","a2a3749e04698b31cd71626f91cb98ba"],["/2024/03/Proteus-Proteus仿真步进电机转速数码管显示/index.html","d7ed0b5b0b0983e5bfb043e59bbc08a7"],["/2024/03/Proteus-Proteus仿真波形信号发生器4种波形可选频率可调/index.html","b2af57f880421109b86def1319320823"],["/2024/03/Proteus-Proteus仿真独立按键数码管显示/index.html","a57f7cfc6314cb47a4e3dc3743f7f7dd"],["/2024/03/Proteus-Proteus仿真用24C04与1602LCD设计的简易加密电子密码锁/index.html","1487f9b717c759d3e642201b1c623ab6"],["/2024/03/Proteus-Proteus仿真直流电机方向和速度按键控制/index.html","35d510dcac5f277b669360d06871651c"],["/2024/03/Proteus-Proteus仿真矩阵键盘中断扫描/index.html","9c1dc3fa7343a5d12796d8424e61cb56"],["/2024/03/Proteus-Proteus仿真简易数码管定时器时钟/index.html","3cbf74c30cc87f100cdef5ec56585699"],["/2024/03/Proteus-Proteus仿真自动量程范围10V切换数字电压表/index.html","c0f791834c0f429bd574b05048651d48"],["/2024/03/Proteus-Proteus仿真计数逻辑组成的数字钟/index.html","ced0d217a5aea52368a1ed898b3b1f8d"],["/2024/03/Proteus-Proteus仿真超声波模块HCSR04测距/index.html","2e590404130c119e7ecb418c0318b2ec"],["/2024/03/Proteus-Proteus仿真键盘矩阵扫描LCD128x64显示/index.html","1583b78331581c94241df41c209bca2a"],["/2024/03/Proteus-Proteus基于VSM-Studio驱动LM016驱动模板/index.html","f0bf928ae77370e559bc5090ae5f6521"],["/2024/03/Proteus-STC15单片机可设置倒计时09999报警器Proteus仿真/index.html","b87d0dbfac8e66b686f4ed1a0494e73f"],["/2024/03/Proteus-STC89C52RC-LCD1602PCF8574转IIC接口屏幕驱动显示Proteus仿真/index.html","c2618ec70d6ae1195ba89635bbf57b74"],["/2024/03/Proteus-蓝桥杯单片机定时器与中断秒表实验Proteus仿真/index.html","34bcfaafd725cb4e085f3ddf80a44c05"],["/2024/03/STC-51单片机LCD1602转IIC接口屏幕驱动显示/index.html","3d33a388224532ed3ea79a1182cb4ec1"],["/2024/03/STC-STC52单片机简单控制直流电机正反转已验证/index.html","450a34866b6772a83164ca6893f3ea2d"],["/2024/03/STC-STC单片机-NRF24L01通讯实验/index.html","90d7fb1eae311d31bd4d6a7b38459e41"],["/2024/03/STC-STC单片机-NRF24L01通讯带状态反馈/index.html","4f764607d42c90e6191801c17fa7dccd"],["/2024/03/Stc15-ESP8266-STC15基于AT指令通过TCP通讯协议控制IO状态/index.html","0fd3e39287a7e263b88f0aade2d93877"],["/2024/03/Stc15-STC15W408AS-LCD1602转IIC接口屏幕驱动显示/index.html","2a606b7a78b1422d0e30b2abdf473429"],["/2024/03/Stc15-STC15W408AS单片机通过ADC端口采集模拟量并从串口打印数值/index.html","cd39f259e468ff68a625e42ebc913190"],["/2024/03/Stc15-STC15W408AS读取DHT11温湿度OLED显示数据串口打印/index.html","fac3e8b3e4448cbcb32288bfa0f383a5"],["/2024/03/Stc15-STC15W408AS读取DHT11温湿度OLED显示数据串口打印修订版/index.html","3ca05870f66e972f520cd9e076d5b3df"],["/2024/03/Stc15-STC15W408AS读取DHT11温湿度数据串口打印详解/index.html","906a8c07798b24e4877864dea2a03d38"],["/2024/03/Stc15-STC15单片机DHT11LCD1602PCF8574转IIC接口温度显示/index.html","60bbe74e29ff4a1f437c946ea42c6f09"],["/2024/03/Stc15-STC15单片机DS18B20LCD1602PCF8574转IIC接口温度显示/index.html","78cd9a68414eb3b8faa59b6524b6837e"],["/2024/03/VSM-VSM-Studio-uln2003驱动步进电机单按键启保停正反转八拍控制/index.html","612c28f45ce700d99ae99b67e71929ba"],["/2024/03/VSM-VSM-Studio-uln2003驱动步进电机单按键启保停正反转四拍控制/index.html","815a0099b37ea3d18901e7c6dfd456d3"],["/2024/03/VSM-VSM-Studio-直流电机H桥驱动PWM-单向控制/index.html","f3a26cc433955b05e62400283f1aa652"],["/2024/03/daily/index.html","01aeb654aa6dca06dec4361ad547e4b0"],["/2024/03/linux-common-cmd/index.html","a474721247a972174066a42a6357b025"],["/2024/03/proteus仿真常用芯片-51单片机利用定时器控制单个led灯闪烁/index.html","e9c0cd5b4329d9530095d030ebf40bfb"],["/2024/03/proteus仿真常用芯片-74HC595驱动2位数码管代码实现和注意事项/index.html","82c97c01ab1da3c2f78e88e5980b78ec"],["/2024/03/proteus仿真常用芯片-8个IO口检测64个按键按键自锁控制方式/index.html","f50250df42900bc37baf4566e720add1"],["/2024/03/proteus仿真常用芯片-8个IO口检测64个按键算法实现和心法要点讲解/index.html","2f7933d119e8c5bdc3206acd6f514afa"],["/2024/03/proteus仿真常用芯片-ADC0809-8通道轮流采样LCD1602显示/index.html","fe421cab164c92b7fcdfe32fefcfdf46"],["/2024/03/proteus仿真常用芯片-Internal-Exception-access-violation-in-module-SPICEINPDLL-000007F9解决办法/index.html","1bcd856a1662877cdf176cfa37085df7"],["/2024/03/proteus仿真常用芯片-LD3320语音识别模块MP3TF16P模块实现语音交互功能/index.html","49352c2918603e08b49b851847edfdd9"],["/2024/03/proteus仿真常用芯片-TLC5615输出256点正弦波振幅和频率可调/index.html","b90099683bd265df6e0ab0e4ec419346"],["/2024/03/proteus仿真常用芯片-TM1638芯片的显存地址详细解读/index.html","59dbd88a5de6c477af6b0b490544c9eb"],["/2024/03/proteus仿真常用芯片-uln2003和2803两个有刷直流电机控制方案/index.html","8bd15b9180ca1e272cbae0fdbc7ef7d2"],["/2024/03/proteus仿真常用芯片-利用74HC138译码器实现数码管显示/index.html","c870173417a5cfb1c0c2ac70e6749ee8"],["/2024/03/proteus仿真常用芯片-标准库intrinsh中的循环指令在多种流水灯方式上的应用/index.html","a733ffbf881c7ac0b73240786b72d735"],["/2024/03/proteus仿真常用芯片-简单粗暴的流水灯仿真和代码/index.html","a4e82c49f1850bef8ab132cce1af55ba"],["/2024/03/proteus仿真常用芯片-经典按键扫描消抖算法实例仿真对比/index.html","365ac5d64b72946bd62d11d22df8188d"],["/2024/03/proteus仿真常用芯片-经典按键扫描程序算法实现方式/index.html","ef868ea046c0a61cfcc448a81dc8d02c"],["/2024/03/proteus仿真常用芯片-通过CD4019设计的电子时钟/index.html","cc340744e0836a6ce203eeace7b477bd"],["/2024/03/python-python-python的requests在网络请求中添加cookies参数/index.html","108f3bdc580d9f0aa74d1de4e8f4471e"],["/2024/03/python-python-使用python揭秘CSDN热门付费专栏惊人真相/index.html","f588f9e110b7e30d185a1c7fad5ed5f0"],["/2024/03/python-python的requests在网络请求中添加cookies参数/index.html","fad89633bac9e66c5473b3def0f0fe48"],["/2024/03/stm32-5-Systick滴答定时器初始化（HAL库）-无OS延时函数/index.html","2811bf732d714ce2b3c0a1aa578bc835"],["/2024/03/stm32-STM32-HAL库驱动DHT11读取温湿度程序/index.html","b385c9b42f8c2ce13643df4f8db2b11f"],["/2024/03/stm32-STM32-实现-44-矩阵键盘扫描（HAL库、标准库-都适用）-白菜没我白-博客园/index.html","f9183b7d115150c94d2799c65b83e4bd"],["/2024/03/stm32-STM32CubeMX-HAL库的ADC多通道数据采集（轮训、DMA、DMA-TIM-、读取内部传感器温度/index.html","cb92c4e253cc0444926f46164b2de9c7"],["/2024/03/stm32-STM32F407使用Helix库软解MP3并通过DAC输出，最精简的STM32-SD卡实现MP3播放器/index.html","2149744a6d4714b3fbac8893df4975d3"],["/2024/03/stm32-STM32HAL库学习笔记（一）——GPIO/index.html","fb3d8b774e88212c6580409104d373c0"],["/2024/03/stm32-stm32-5-Systick滴答定时器初始化（HAL库）-无OS延时函数/index.html","d30ac3773169fdf8b3a82e9efa461b9a"],["/2024/03/stm32-stm32-STM32-HAL库驱动DHT11读取温湿度程序/index.html","1e829975d1f0ea10789c55845bfabe77"],["/2024/03/stm32-stm32-STM32-实现-44-矩阵键盘扫描（HAL库、标准库-都适用）-白菜没我白-博客园/index.html","feec59b3dc07c43125f737ef9fa40973"],["/2024/03/stm32-stm32-STM32CubeMX-HAL库的ADC多通道数据采集（轮训、DMA、DMA-TIM-、读取内部传感器温度/index.html","944de41db38e627d9504e6f44284a7d4"],["/2024/03/stm32-stm32-STM32F407使用Helix库软解MP3并通过DAC输出，最精简的STM32-SD卡实现MP3播放器/index.html","db84fce49f8112de4ce2c18ac51fce45"],["/2024/03/stm32-stm32-【HAL库】STM32-ESP8266-Onenet-MQTT，极简工程，hal库移植。/index.html","12b557004f30cc1ac2f4ad1d26eca053"],["/2024/03/stm32-stm32-【STM32】HAL库-STM32CubeMX教程十三-RTC时钟/index.html","788e9e6837507790c03a7633dff3bae3"],["/2024/03/stm32-stm32-基于STM32F103C8T6（HAL库）的HC-SR501红外人体传感及HC-SR04超声波测距/index.html","f558f73b3cb1d20e8c60349e4a448e2a"],["/2024/03/stm32-stm32-基于STM32HAL库，RC522（RFID）模块读写驱动，无线IC卡读写/index.html","d0de8d1813d72c49b2aceb10cf250c6c"],["/2024/03/stm32-stm32-基于STM32的HC-SR501红外感应模块驱动与应用/index.html","3042b9550e5e0930a0cc5e2fd72f7791"],["/2024/03/stm32-stm32-手把手教你，通过HAL库实现STM32的超声波测距-以SR-04为例/index.html","88a0463b2e81649f8407aea70e7c0754"],["/2024/03/stm32-【HAL库】STM32-ESP8266-Onenet-MQTT，极简工程，hal库移植。/index.html","893be3eba7c401a360d0d133ad03a51e"],["/2024/03/stm32-【STM32】HAL库-STM32CubeMX教程十三-RTC时钟/index.html","878eceed15885384f2218f48c4005bb9"],["/2024/03/stm32-基于STM32F103C8T6（HAL库）的HC-SR501红外人体传感及HC-SR04超声波测距/index.html","c7442554197990c55ecd3f011db860ee"],["/2024/03/stm32-基于STM32HAL库，RC522（RFID）模块读写驱动，无线IC卡读写/index.html","6f3bdb534a30a8afa230295da4d94c90"],["/2024/03/stm32-基于STM32的HC-SR501红外感应模块驱动与应用/index.html","e2324dc7382fcf61e21e688d250ae251"],["/2024/03/stm32-手把手教你，通过HAL库实现STM32的超声波测距-以SR-04为例/index.html","d437b32ffd29a8d9cacf175c2049106c"],["/2024/03/usageOfHexo/index.html","845874cbb2afb96bc4470db2354088a5"],["/2024/03/wsl-使用WSL2时控制台输出“wsl-检测到-localhost-代理配置，但未镜像到-WSL。NAT-模式下的-WSL-不支持-localhost-代理“/index.html","ecef174272ddfe086d999cfb2f0f63d3"],["/2024/03/【STM32】HAL库_STM32CubeMX教程十三---RTC时钟/index.html","ac66c08367c8d31db4e7810eec139ed3"],["/about/index.html","5d68fb4779e0b9bea640f13b00312b86"],["/archives/2022/11/index.html","372a29df0e91fb98deb49cb4febb1984"],["/archives/2022/index.html","779e349b2c44b3445ba8458c0bf9afbb"],["/archives/2024/03/index.html","8423c3629a4f59098512f0c07b7e33a0"],["/archives/2024/03/page/10/index.html","3629dab989ab2adba56f548399729571"],["/archives/2024/03/page/11/index.html","f73681a192bf42dd04ca68b6b28cefbe"],["/archives/2024/03/page/12/index.html","15de0014e039f96ee3fdc2599c42c318"],["/archives/2024/03/page/13/index.html","90c7c2eb56c7266eca2fc59f66fd358f"],["/archives/2024/03/page/2/index.html","095d814885b86cf45ab51903c9d21977"],["/archives/2024/03/page/3/index.html","7e5d167e0929484a4c23a40045681fce"],["/archives/2024/03/page/4/index.html","a7b527f0a8efaf0f84f3865e9717ddf5"],["/archives/2024/03/page/5/index.html","82adb6a452a5a7d9ed0e4ab8c06c9ef3"],["/archives/2024/03/page/6/index.html","4d15f06fa42546f392e26f185d33e5e9"],["/archives/2024/03/page/7/index.html","d577dbf8faadcb595fe5ab3566e0bc70"],["/archives/2024/03/page/8/index.html","66bf93dffca63b971805f9b9303a266d"],["/archives/2024/03/page/9/index.html","016372c6789b193a910c3472ed7eb674"],["/archives/2024/index.html","d5a3637fdefdcb495c443473c5060d07"],["/archives/2024/page/10/index.html","f9f871307027f5cd6dafda199575340a"],["/archives/2024/page/11/index.html","2b17ee929d964edb5f988cbd8c780d03"],["/archives/2024/page/12/index.html","af3a51477bb5dd435b03b1e57771959b"],["/archives/2024/page/13/index.html","d86af0abbc8e3aa93994cbe18aefa196"],["/archives/2024/page/2/index.html","373d81892ea8fa11032f019d91435146"],["/archives/2024/page/3/index.html","0bd04a8202fa739254c63eccc775a42d"],["/archives/2024/page/4/index.html","a1f60cd52187d9ae053af09f4ec7efa3"],["/archives/2024/page/5/index.html","aaa0aec224c639101352678d522ca1b9"],["/archives/2024/page/6/index.html","3b71cd47ea1536564e969017de48ac63"],["/archives/2024/page/7/index.html","bea3a6ba8c4b16a00451ffb32c4a44df"],["/archives/2024/page/8/index.html","44c378a0ff1f597accc57979d8d31217"],["/archives/2024/page/9/index.html","b1c51987229daf37da117a03b9a2ccba"],["/archives/index.html","43a01447cf67306c1a2067c749e1115e"],["/archives/page/10/index.html","d3592b688154713225eaa7498f98989f"],["/archives/page/11/index.html","7e97d79f2b2485132f257485dc6509b6"],["/archives/page/12/index.html","a85facb83713b549b78f4b7df0b2313b"],["/archives/page/13/index.html","658532d64b1b5fe450bc61a0030d7a46"],["/archives/page/2/index.html","bb2aa3a43680200b99958aaef9c3b765"],["/archives/page/3/index.html","ee6b38e1ecf5a2461279ad82d88aa90c"],["/archives/page/4/index.html","95b83f2a0b3315840b31c24adeb2afbf"],["/archives/page/5/index.html","c0ccd23b57adfc63acba2c07a0c23993"],["/archives/page/6/index.html","c1e20357c9a84e2516f91c981e13420c"],["/archives/page/7/index.html","c21e8c750594329952eebf9e1c416dbb"],["/archives/page/8/index.html","330735b40fb442092135a55137ea9e32"],["/archives/page/9/index.html","a5cc6691283f758c255f76f4d332baac"],["/categories/C语言/index.html","fb8cf22031bd52803f2791edb3da755d"],["/categories/C语言/入门/index.html","e7cca15303de322dc522dfbfbc8e20ee"],["/categories/hexo/index.html","b5bfc8dc91901b08d06d19d6533e20d9"],["/categories/index.html","69d864f66238eb6dc97c71a7d0b19789"],["/categories/linux常用命令/index.html","2a359a523863d583ebc37161ec178b25"],["/categories/python/index.html","bc6dd44dbca69a67f62899cd3d95d286"],["/categories/python/requests/index.html","c93c48978620afa49c83a38dbf5fc86a"],["/categories/stm32/index.html","d2721b7268b770c223a4a0730f722e18"],["/categories/stm32/page/2/index.html","694b14c58da421d27b8d21bafe5950d3"],["/categories/stm32/page/3/index.html","5a09227f5fcf1cdd486fc0a2291c5b20"],["/categories/stm32/stm32-hal库开发/index.html","bf30f0ea160810e27bfbeba6875f1028"],["/categories/stm32/stm32hal库开发/index.html","e2d88d4dc32275556813c0b0adf2cceb"],["/categories/stm32/stm32hal库开发/page/2/index.html","811783ebe6f1e4dcf8cbdf9d99418c60"],["/categories/stm32/stm32hal库开发/page/3/index.html","dd73ef5ba511ccc232402741a40070e9"],["/categories/wsl/index.html","cff4cd1b9faccb3ecbe5ea2dba5b0d6f"],["/categories/wsl/报错解决/index.html","6b4ce4c0e4a2b165e60ea2149c7b7e74"],["/categories/w报错解决/index.html","07977e42ecffc3d27d71974ddeaec755"],["/css/index.css","c1f9f0e60847bcfa3aea9c2c217819b7"],["/css/modify.css","b84cf3325e4eb5ce86e4043fdb54e7e1"],["/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["/img/background.jpg","141db8f4899139d02900184132b07710"],["/img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/img/index.jpg","de8272f6c405d4e9ae9d67600513b771"],["/img/top.jpg","b69cc5753fc773bfa0c68ec428175b64"],["/index.html","c22e93f7ff82a1b88fb74730c552a61b"],["/js/custom/foot.js","0c68943056eb42d7aecb3da368ff4393"],["/js/custom/snow.js","abdafbb0471a95535e5e703d174d387d"],["/js/jquery-3.6.1.min.js","00727d1d5d9c90f7de826f1a4a9cc632"],["/js/main.js","960297fafacb19dff1246d71f6dfcf6f"],["/js/search/algolia.js","4491ac1d470a1693a502a9d09034aa21"],["/js/search/local-search.js","9da6b76672a143c8c8449770a8d259f3"],["/js/tw_cn.js","fb4da68124bbafbd2d3da537c80e27ce"],["/js/utils.js","420a15cf446b5670244a9ea05b2bccf0"],["/link/index.html","aa8d7bf0310d45529fd85b1032b03e59"],["/page/10/index.html","5b7cc8e1f7ac460515cfb3e602cf8db8"],["/page/11/index.html","5fe39b54b9178a28a88cdd492d0a12a0"],["/page/12/index.html","119d705fed80d557be5be71177ae6706"],["/page/13/index.html","2401e40fe78aafa879e52f058a7aa159"],["/page/2/index.html","b7c02b5ff0f7c5cdd0f40466f82e85ad"],["/page/3/index.html","caab390abeb1767038b886c9de41ee3f"],["/page/4/index.html","ea93b93997ea8212ed8458586be0b631"],["/page/5/index.html","f1f08daf487b2765772309aba8eaa9fd"],["/page/6/index.html","9926cbd0a300ec767761393efcf017ee"],["/page/7/index.html","c92e9c9bd1351a42f86232820422f73a"],["/page/8/index.html","59f6a827b27a8c061b0db0a06647e907"],["/page/9/index.html","8bf3be4b06b06a6e2b90ddb5a303ba08"],["/resources/index.html","254d6a20c6757ff3e023e3b7d53676eb"],["/styles/main.css","dcdbf93a47b27e97646b75c1f4cb9d38"],["/sw-register.js","5acf914cec7de43b2267c0adb2a3b84f"],["/tags/C语言/index.html","174ca91a7af01b8484b7b5b6a74e0f57"],["/tags/hexo/index.html","94a2316936bce390bd558a39af8300f0"],["/tags/index.html","259da510c1d77bec7785d2203f94c604"],["/tags/linux/index.html","2b22b2942aec63f5ff48a4e242761e60"],["/tags/python/index.html","04ab2f96b9f68b77b4ca1a04e51a3158"],["/tags/stm32/index.html","8e1c3b77b40522be839685e1927dcf3b"],["/tags/stm32/page/2/index.html","518af040cfe4c97e9805b82edb3e6454"],["/tags/stm32/page/3/index.html","5a7f2608a060627fa8c4da5749e3e058"],["/tags/ubuntu/index.html","a0b6d48864b762bc9757594add56ca40"],["/tags/wsl/index.html","f5730eaba7013f48e3f26b4e6492f553"],["/tags/入门/index.html","04d3b6d07c61035f41a417b7ec98ad23"],["/tags/外设/index.html","8875c038a073f7f4c82f6e27c15bd6ee"],["/tags/外设/page/2/index.html","4a708fad84742be87847ff29e3b5fd94"],["/tags/外设/page/3/index.html","f6385edcbb854ca822509bdbd9d3060c"],["/tags/报错解决/index.html","63e334d2294c980faf10c7f095519b49"]];
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
