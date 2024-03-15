/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2022/11/hexo-Hexo-双线部署到-Coding-Pages-和-GitHub-Pages-并实现全站-HTTPS/index.html","59c372633527ecb96532f79da7d42f56"],["/2024/03/C语言-1-C语言基本概念/index.html","05b6640fa036ccb383a647f0fdb9b54d"],["/2024/03/C语言-C语言-C语言解释器的实现/index.html","a557f209952578e5ab09a08b0cccaa49"],["/2024/03/ESP32-ESP32cam系列教程002：ESP32cam通过MQTT协议上传图片数据到阿里云IOT平台-巧遇人生-博客园/index.html","f142d474cb5331c80049cb1009fca032"],["/2024/03/Proteus-Proteus仿真416译码器74HC154-流水灯/index.html","23af6fd9631e1ea48970e6fa958a00f4"],["/2024/03/Proteus-Proteus仿真4X4矩阵按键扫描组成的加减运算/index.html","45a5df85ae50d984f29cb4747837ab0e"],["/2024/03/Proteus-Proteus仿真4X4矩阵按键扫描组成的简易加法器/index.html","5d154f70bc8f6f579e3014b9cb3f0971"],["/2024/03/Proteus-Proteus仿真4X4矩阵按键显示0F/index.html","34e3e21d59cc60be0841b4e20cef092b"],["/2024/03/Proteus-Proteus仿真4x4矩阵键盘中断方式扫描-数码管显示/index.html","084ad496162c7812722f616c2384e545"],["/2024/03/Proteus-Proteus仿真6位数码管秒计数器0999999S/index.html","9d476f22d5627017d07fe30701d922c9"],["/2024/03/Proteus-Proteus仿真6位数码管计时器0105/index.html","5c3af2a5377b999355332d1a7644fd68"],["/2024/03/Proteus-Proteus仿真74HC154-四线转12线译码器组成的16路流水灯/index.html","9bd171f7d008b4b90474d42debb665eb"],["/2024/03/Proteus-Proteus仿真74HC59574LS154驱动显示16X16点阵/index.html","61443b66ad1628400412c0d664c7af67"],["/2024/03/Proteus-Proteus仿真74LS194组成的8个led流水灯/index.html","075812b8b9c06cb7cef5866fa166c3fe"],["/2024/03/Proteus-Proteus仿真88LED点阵屏仿电梯数字滚动显示/index.html","5952d48c56ae2e507ade4df99f7a97a2"],["/2024/03/Proteus-Proteus仿真8x8Led点阵数字循环显示/index.html","ccefdd781d35d37ec8c5d30048ee4e19"],["/2024/03/Proteus-Proteus仿真8位数码管动态扫描显示变化数据/index.html","1b4183e9b09259017fb0f05e2e78fa79"],["/2024/03/Proteus-Proteus仿真8位端口检测8独立按键/index.html","0ef6de5853717f52eba1a397d8f8aa09"],["/2024/03/Proteus-Proteus仿真AT24C02数据读写LCD1602显示/index.html","60061a6a4d179bce775a2398369b71b4"],["/2024/03/Proteus-Proteus仿真BME280温湿度气压传感器数据串口输出/index.html","73e87b28fc0fbbd8b502fe56f958b908"],["/2024/03/Proteus-Proteus仿真DHT11和实际硬件的差异以及读不到数据原因分析/index.html","29c9af59244dd03caff94a0f889351d5"],["/2024/03/Proteus-Proteus仿真DS18B20报警温度可调LM016显示/index.html","4a7f182da348713c641ab20548368511"],["/2024/03/Proteus-Proteus仿真HCSRF04超声波测距传感器数码管显示/index.html","04323269974ac52afa8ad6359af660e2"],["/2024/03/Proteus-Proteus仿真INT0和INT1中断计数/index.html","dc1a4df8879e8e01a4e13e2e3b871b69"],["/2024/03/Proteus-Proteus仿真L297驱动步进电机/index.html","395596cac2f5bf83fe1052d4954d97e6"],["/2024/03/Proteus-Proteus仿真LCD1602DS1307按键设置简易时钟/index.html","1395a736112e0fc9331181a6a7cde8e8"],["/2024/03/Proteus-Proteus仿真LCD1602字符滚动显示示例/index.html","c0c16b57052cd3ce4e2af8f59e7f897e"],["/2024/03/Proteus-Proteus仿真LCD1602整屏内容信息移动/index.html","db87bb84122821ba9ed416afc634af1d"],["/2024/03/Proteus-Proteus仿真NE555延时电路/index.html","08319e339a4c98156ca5dc78d00de70f"],["/2024/03/Proteus-Proteus仿真PCF8591-AD电压采集8X8点阵显示/index.html","8d90dc8addfa21483a3ac9fa13678da5"],["/2024/03/Proteus-Proteus仿真STC15单片机-LCD16025X8点阵字符显示/index.html","aa6f6839a02c4e038447b6576e556cac"],["/2024/03/Proteus-Proteus仿真T6963C驱动PG12864示例带中英文显示/index.html","a5f14f013e5b8fc90bee9cfccdcb47c0"],["/2024/03/Proteus-Proteus仿真TLC5615输出1024点正弦波振幅可调/index.html","d5727d57518de6e7a1d143b092ace827"],["/2024/03/Proteus-Proteus仿真TLC5615输出256点正弦波振幅可调/index.html","08c1f7b5547d6c20b466fb54d94b5390"],["/2024/03/Proteus-Proteus仿真uln2003驱动二相四线制步进电机正转/index.html","8d5c9ccc3a4a81484d75d2c6435d0787"],["/2024/03/Proteus-Proteus仿真三极管组成的H桥驱动直流电机按键正反转控制/index.html","d7b3d7195f9cc4d0c65e74cca2d04956"],["/2024/03/Proteus-Proteus仿真三极管组成的H桥驱动直流电机正反转可控/index.html","258dddd5e423363aae7af767ee0eae05"],["/2024/03/Proteus-Proteus仿真利用加法计数器74XX160的级联实现2位计数/index.html","6418bb4f2cd45e02d66343c0dfe5730c"],["/2024/03/Proteus-Proteus仿真单片机DS18B20LCD1602显示/index.html","5b3c07230319921285703ee3279426e8"],["/2024/03/Proteus-Proteus仿真在AT24C04的连续地址中写入数据并循环读取/index.html","3024bda7a02025be20cdcad237d523b3"],["/2024/03/Proteus-Proteus仿真基于74LS14874LS27974LS48的四路抢答器/index.html","5cd88ba05f34bf27deb1d7a7dcf329c4"],["/2024/03/Proteus-Proteus仿真基于VSM-串口printf调试输出示例/index.html","15624c9c85b1a0ecaf615d1928307202"],["/2024/03/Proteus-Proteus仿真外部中断触发倒计时5秒/index.html","f4cf8d80554cb44c4e84a0ddd70236a9"],["/2024/03/Proteus-Proteus仿真外部中断通过双继电器控制直流电机正反转/index.html","1b866c41800dee510e309b2ab8cbca04"],["/2024/03/Proteus-Proteus仿真多路非阻塞延时流水灯演示/index.html","ae62920187ce1da65c7fc331ff34d9fa"],["/2024/03/Proteus-Proteus仿真定时器0作为16位计数器使用示例/index.html","88dfbdd0b8eeb06b1c7d5502fe13c3eb"],["/2024/03/Proteus-Proteus仿真定时器1外部计数中断/index.html","635aeae5a35ed37a45e194dc9cae1afd"],["/2024/03/Proteus-Proteus仿真按键设置数码管显示/index.html","04b647309d7d91d9f7a97f8b0976a4f1"],["/2024/03/Proteus-Proteus仿真数码管4x4键盘矩阵按键简易计算器/index.html","7ee220444dda801d06bc653df0f1f778"],["/2024/03/Proteus-Proteus仿真数码管递加递减带闪烁消隐显示/index.html","b7915c4af3d49985b26e8fe29e53b1fa"],["/2024/03/Proteus-Proteus仿真步进电机转速数码管显示/index.html","6c630ff596253752939a0a8a789d0bda"],["/2024/03/Proteus-Proteus仿真波形信号发生器4种波形可选频率可调/index.html","a53ba0f0e27dfd1bb742e9138185c5d7"],["/2024/03/Proteus-Proteus仿真独立按键数码管显示/index.html","c85f1baca1113eb8c6e435d2f1ac51a4"],["/2024/03/Proteus-Proteus仿真用24C04与1602LCD设计的简易加密电子密码锁/index.html","8f05acd249969fb35aec2f682dd6e507"],["/2024/03/Proteus-Proteus仿真直流电机方向和速度按键控制/index.html","6871615b9c7a1564432e4be788aed25f"],["/2024/03/Proteus-Proteus仿真矩阵键盘中断扫描/index.html","43363a977164af3af3636ddfd40d2293"],["/2024/03/Proteus-Proteus仿真简易数码管定时器时钟/index.html","253c1ec3d4f6eb699fc7bbe8204adb9c"],["/2024/03/Proteus-Proteus仿真自动量程范围10V切换数字电压表/index.html","0bea6b43baf31aa52377b5e71e28ff62"],["/2024/03/Proteus-Proteus仿真计数逻辑组成的数字钟/index.html","988f0f4bdafd3cfa12a1c561ee0c2b55"],["/2024/03/Proteus-Proteus仿真超声波模块HCSR04测距/index.html","65f56f2e8a9901d04556e241557a1fcd"],["/2024/03/Proteus-Proteus仿真键盘矩阵扫描LCD128x64显示/index.html","64b996e29b1f5c9873b6a8a9d4044a48"],["/2024/03/Proteus-Proteus基于VSM-Studio驱动LM016驱动模板/index.html","665ccbb15d8f089b4617d1ae6f3806e0"],["/2024/03/Proteus-STC15单片机可设置倒计时09999报警器Proteus仿真/index.html","ba10ea491c72e3682d41dfaaef4338e9"],["/2024/03/Proteus-STC89C52RC-LCD1602PCF8574转IIC接口屏幕驱动显示Proteus仿真/index.html","fcc1bed253b2bfadaabf911f507468ff"],["/2024/03/Proteus-蓝桥杯单片机定时器与中断秒表实验Proteus仿真/index.html","7cddc0bc9b5a44068c2da22045e12a05"],["/2024/03/STC-51单片机LCD1602转IIC接口屏幕驱动显示/index.html","da4ae34c1d63f90e30b657e19ae8c20c"],["/2024/03/STC-STC52单片机简单控制直流电机正反转已验证/index.html","86ccd279e36845aa58d376d06fe37042"],["/2024/03/STC-STC单片机-NRF24L01通讯实验/index.html","9c87d2db40abfb573bffb876c93810eb"],["/2024/03/STC-STC单片机-NRF24L01通讯带状态反馈/index.html","cea0492e7484343e8a7a866745b4b4cd"],["/2024/03/Stc15-ESP8266-STC15基于AT指令通过TCP通讯协议控制IO状态/index.html","f51c5f1417db67a89e66af281666889b"],["/2024/03/Stc15-STC15W408AS-LCD1602转IIC接口屏幕驱动显示/index.html","a47cd04e8a462065c76a65a8acad58b7"],["/2024/03/Stc15-STC15W408AS单片机通过ADC端口采集模拟量并从串口打印数值/index.html","6e4ebad4a70682e36de7bef8fba3a75d"],["/2024/03/Stc15-STC15W408AS读取DHT11温湿度OLED显示数据串口打印/index.html","d9e8d1632dcfdfcfad326389996da92c"],["/2024/03/Stc15-STC15W408AS读取DHT11温湿度OLED显示数据串口打印修订版/index.html","0520edc1e39f2aa77d43757692263fb9"],["/2024/03/Stc15-STC15W408AS读取DHT11温湿度数据串口打印详解/index.html","67961cc0ea7ddf620ee8945b83537c33"],["/2024/03/Stc15-STC15单片机DHT11LCD1602PCF8574转IIC接口温度显示/index.html","5323d70d910f51f328488102660ffa98"],["/2024/03/Stc15-STC15单片机DS18B20LCD1602PCF8574转IIC接口温度显示/index.html","272c2c0293ace287e2a686c1131f2cd2"],["/2024/03/VSM-VSM-Studio-uln2003驱动步进电机单按键启保停正反转八拍控制/index.html","895db5aa9cb7dd8463945421ab307e9b"],["/2024/03/VSM-VSM-Studio-uln2003驱动步进电机单按键启保停正反转四拍控制/index.html","4f53119a448dc087f445eb6b5b808c0a"],["/2024/03/VSM-VSM-Studio-直流电机H桥驱动PWM-单向控制/index.html","52badeb1ca972f4f55b0d3363df4474c"],["/2024/03/daily/index.html","e11474359c912af9d4eb983f43c98d5e"],["/2024/03/linux-common-cmd/index.html","68f65a0712ae9b3c25305ebe04d96b05"],["/2024/03/proteus仿真常用芯片-51单片机利用定时器控制单个led灯闪烁/index.html","fc81c79da79a7c7cef390fdb97ff6f48"],["/2024/03/proteus仿真常用芯片-74HC595驱动2位数码管代码实现和注意事项/index.html","19b82cb11b3aa522166cb5d92d262693"],["/2024/03/proteus仿真常用芯片-8个IO口检测64个按键按键自锁控制方式/index.html","765a5d7ab0fca3135e39faa282c69be3"],["/2024/03/proteus仿真常用芯片-8个IO口检测64个按键算法实现和心法要点讲解/index.html","743756f7f930a21df62d1b717d7f256c"],["/2024/03/proteus仿真常用芯片-ADC0809-8通道轮流采样LCD1602显示/index.html","949b19b9b8fbeb1256d70113bc273cd1"],["/2024/03/proteus仿真常用芯片-Internal-Exception-access-violation-in-module-SPICEINPDLL-000007F9解决办法/index.html","0a19d641015e4bbfd166aeead9efd60a"],["/2024/03/proteus仿真常用芯片-LD3320语音识别模块MP3TF16P模块实现语音交互功能/index.html","949007ef869db6555c245dde3ec073d1"],["/2024/03/proteus仿真常用芯片-TLC5615输出256点正弦波振幅和频率可调/index.html","1fc08807b222ae64eb0423c5dd4e6d1c"],["/2024/03/proteus仿真常用芯片-TM1638芯片的显存地址详细解读/index.html","4fe8d58566ca0efb8df93ecffe85f8d6"],["/2024/03/proteus仿真常用芯片-uln2003和2803两个有刷直流电机控制方案/index.html","7d4211b88b8b74fe913661951e4806db"],["/2024/03/proteus仿真常用芯片-利用74HC138译码器实现数码管显示/index.html","a46c3f3dace70294d06d1e392846ecec"],["/2024/03/proteus仿真常用芯片-标准库intrinsh中的循环指令在多种流水灯方式上的应用/index.html","086f8d3002d0ebdd5adba963d434fb2f"],["/2024/03/proteus仿真常用芯片-简单粗暴的流水灯仿真和代码/index.html","2c874d0c1f9b278941eb30aaf8336e8f"],["/2024/03/proteus仿真常用芯片-经典按键扫描消抖算法实例仿真对比/index.html","fd18d1909f1b83c33646796f8b7dbbe7"],["/2024/03/proteus仿真常用芯片-经典按键扫描程序算法实现方式/index.html","b2a2d06b787254e1bdb811cebbdc0be3"],["/2024/03/proteus仿真常用芯片-通过CD4019设计的电子时钟/index.html","48586ece290b9892c744cc2b96f69f1b"],["/2024/03/python-python-python的requests在网络请求中添加cookies参数/index.html","28a4cb2d996ad8d61005738ac040ea12"],["/2024/03/python-python-使用python揭秘CSDN热门付费专栏惊人真相/index.html","322dd3ea385105c0a0a241a90523d7bc"],["/2024/03/python-python的requests在网络请求中添加cookies参数/index.html","7f8de647f0d583b6003d8da87b01fe31"],["/2024/03/stm32-5-Systick滴答定时器初始化（HAL库）-无OS延时函数/index.html","111a6fb407df66c3eddbe0c2eeff5af8"],["/2024/03/stm32-STM32-HAL库驱动DHT11读取温湿度程序/index.html","daa45a00a382c66432175cc4b1438091"],["/2024/03/stm32-STM32-实现-44-矩阵键盘扫描（HAL库、标准库-都适用）-白菜没我白-博客园/index.html","cb6d1e88d927a3d556f3ac243711e98b"],["/2024/03/stm32-STM32CubeMX-HAL库的ADC多通道数据采集（轮训、DMA、DMA-TIM-、读取内部传感器温度/index.html","fa0296961e6a5799ec6234a0eecc2383"],["/2024/03/stm32-STM32F407使用Helix库软解MP3并通过DAC输出，最精简的STM32-SD卡实现MP3播放器/index.html","c960d580b60e71c0699930b586e798ee"],["/2024/03/stm32-STM32HAL库学习笔记（一）——GPIO/index.html","06ad48fd067724d390bbbb126fd413c8"],["/2024/03/stm32-stm32-5-Systick滴答定时器初始化（HAL库）-无OS延时函数/index.html","31e803c3553ef42ba871d0752bd45165"],["/2024/03/stm32-stm32-STM32-HAL库驱动DHT11读取温湿度程序/index.html","4aae04923924105e05723083a5983567"],["/2024/03/stm32-stm32-STM32-实现-44-矩阵键盘扫描（HAL库、标准库-都适用）-白菜没我白-博客园/index.html","509d74b1e2920c659bf325200d157cf4"],["/2024/03/stm32-stm32-STM32CubeMX-HAL库的ADC多通道数据采集（轮训、DMA、DMA-TIM-、读取内部传感器温度/index.html","ca60bd7b420a869d38da7b4c93d46224"],["/2024/03/stm32-stm32-STM32F407使用Helix库软解MP3并通过DAC输出，最精简的STM32-SD卡实现MP3播放器/index.html","42746fdacbe99fd926a71619b994f5db"],["/2024/03/stm32-stm32-【HAL库】STM32-ESP8266-Onenet-MQTT，极简工程，hal库移植。/index.html","bb89db3c9c98a321d84a9a63b1b98a76"],["/2024/03/stm32-stm32-【STM32】HAL库-STM32CubeMX教程十三-RTC时钟/index.html","d203e1a1e21baa70e2b6bcc338652726"],["/2024/03/stm32-stm32-基于STM32F103C8T6（HAL库）的HC-SR501红外人体传感及HC-SR04超声波测距/index.html","a025f8855585aa0290a2827fab72457a"],["/2024/03/stm32-stm32-基于STM32HAL库，RC522（RFID）模块读写驱动，无线IC卡读写/index.html","20d847ef3b719af14b5b21347a86d13f"],["/2024/03/stm32-stm32-基于STM32的HC-SR501红外感应模块驱动与应用/index.html","948b70e09ce789a230f16f4089a09c77"],["/2024/03/stm32-stm32-手把手教你，通过HAL库实现STM32的超声波测距-以SR-04为例/index.html","b96d9e82c20b6ce0b590dca40e0683dc"],["/2024/03/stm32-【HAL库】STM32-ESP8266-Onenet-MQTT，极简工程，hal库移植。/index.html","5a841e66b6f2bbdb030738d7e55026e1"],["/2024/03/stm32-【STM32】HAL库-STM32CubeMX教程十三-RTC时钟/index.html","39ce648fe8083cff27d2307f7d9aefde"],["/2024/03/stm32-基于STM32F103C8T6（HAL库）的HC-SR501红外人体传感及HC-SR04超声波测距/index.html","d25f40354d583694019283f66fa3903b"],["/2024/03/stm32-基于STM32HAL库，RC522（RFID）模块读写驱动，无线IC卡读写/index.html","90b306c732edf27fdd45ecc9b4c8662b"],["/2024/03/stm32-基于STM32的HC-SR501红外感应模块驱动与应用/index.html","46df249fbfa685fa0c09b986f5aca002"],["/2024/03/stm32-手把手教你，通过HAL库实现STM32的超声波测距-以SR-04为例/index.html","f058d42cddff13affe1eeec431c19aaa"],["/2024/03/usageOfHexo/index.html","21e7789b70d75a70f2d7d7efc4f1b61e"],["/2024/03/wsl-使用WSL2时控制台输出“wsl-检测到-localhost-代理配置，但未镜像到-WSL。NAT-模式下的-WSL-不支持-localhost-代理“/index.html","261a61dc171619eb2a98ad04f44dfd5c"],["/2024/03/【STM32】HAL库_STM32CubeMX教程十三---RTC时钟/index.html","d33b65eb7af1820cb8de0d0fc28f6b95"],["/about/index.html","4e508d3095b1103ab26aad2406e343ef"],["/archives/2022/11/index.html","f80dbc428972f96d75f7a0343b94afac"],["/archives/2022/index.html","e7e693b8f68137103ee7cb7753ad736e"],["/archives/2024/03/index.html","c13f5c91e67667a71d24559edace2b8b"],["/archives/2024/03/page/10/index.html","f22b45aa17e6b535f21e3c60b4bc4117"],["/archives/2024/03/page/11/index.html","09c62c5ad340643bd08340aced64daeb"],["/archives/2024/03/page/12/index.html","9764cce9530c24fa5c46b2e8cfdd7230"],["/archives/2024/03/page/13/index.html","7a5727da2114013b233313bfbe15ca5c"],["/archives/2024/03/page/2/index.html","4b2fd80b190e80b9540d31ef64e7c8a2"],["/archives/2024/03/page/3/index.html","9a44977e422b04150151b499130f9a86"],["/archives/2024/03/page/4/index.html","200d2f3effdc7b890bc04651d40f637d"],["/archives/2024/03/page/5/index.html","301c5cf6be742599cd3210c58452710b"],["/archives/2024/03/page/6/index.html","4f141f966997f7e10dce4f976b92e1c0"],["/archives/2024/03/page/7/index.html","9db1ea63190b564c00e7acbfb1a8825a"],["/archives/2024/03/page/8/index.html","f7c69eb14cfaf67281045673b3a70868"],["/archives/2024/03/page/9/index.html","6fcfc027c5fcf71fd559caf11a0cc856"],["/archives/2024/index.html","13aaf812bd9587a3f7d73f6fc3a5353d"],["/archives/2024/page/10/index.html","c694b54b3e7a3a8f2b934423866e4044"],["/archives/2024/page/11/index.html","42e390d4e64e36e44a9d58e2f1ddd6a7"],["/archives/2024/page/12/index.html","034dfefba8d19ee23cc52572ea0a20c9"],["/archives/2024/page/13/index.html","1c411265ceaa186bc132a2b195c28957"],["/archives/2024/page/2/index.html","c6070ab27ad3718772ecdbbe89d42337"],["/archives/2024/page/3/index.html","3473182c72e41e5feb16711fbcae6629"],["/archives/2024/page/4/index.html","4473c1c03e6a2e74b1b7f7bf5614d59d"],["/archives/2024/page/5/index.html","4bd516b696f1ddd3848340b3f0e3edd5"],["/archives/2024/page/6/index.html","f9682f2d81ef9c872d193a1640171394"],["/archives/2024/page/7/index.html","421a9dd90f3485aca1d637112213ff4e"],["/archives/2024/page/8/index.html","8a10d42859df3332663a4e3c31a30728"],["/archives/2024/page/9/index.html","88987047aa037a53c94a6c18ae6b8a4c"],["/archives/index.html","2f75a8c698193a83c49fcd70c4fede4e"],["/archives/page/10/index.html","5cc084021159d7d2318fb4f443181800"],["/archives/page/11/index.html","40703f3bca7ddd6582d98baabd52da52"],["/archives/page/12/index.html","952753c11ab751872324403d2ad1867d"],["/archives/page/13/index.html","4b5ddab46b2ce3a8b437716e1de71a5b"],["/archives/page/2/index.html","ba82a63cedac93c949fe05ccf13a29b7"],["/archives/page/3/index.html","81be12f41f1dd277808f5c90a79a2513"],["/archives/page/4/index.html","7583a0a7e0db75e6277a718bfc63499f"],["/archives/page/5/index.html","91d0290e9f0006778b3890dd3f03eae1"],["/archives/page/6/index.html","5279ee2217f8c9af1d85bc82e95bcc6a"],["/archives/page/7/index.html","7a4a90d9753f4f68641634a2356113af"],["/archives/page/8/index.html","3faa1773473a8ab0c878c44514e68c41"],["/archives/page/9/index.html","ba458cbf617c1de9891bab2a86a5ba9e"],["/categories/C语言/index.html","0bec09793ee8167d849a47ab1c9da0d1"],["/categories/C语言/入门/index.html","e01c6e6cd22006c98e8caa18e626437d"],["/categories/hexo/index.html","6a41689dbff012ee8d00fe3a2bc8a65a"],["/categories/index.html","3de107bdeeac26329bf895324b7c337a"],["/categories/linux常用命令/index.html","ae3b0819c013900e87e74a40b46e382f"],["/categories/python/index.html","f20033e478ebc28c27e0d55a3b86b275"],["/categories/python/requests/index.html","3acd65d85d7ced8852714a94129e9228"],["/categories/stm32/index.html","8ef9ab6ec656ed56df3fde490b7bf91b"],["/categories/stm32/page/2/index.html","4c16e8365f05014247457ceb2f010126"],["/categories/stm32/page/3/index.html","33a450abd52013fd15dc87511bf1ac86"],["/categories/stm32/stm32-hal库开发/index.html","ed5f47e54722d9d06d4aa4866a8314c3"],["/categories/stm32/stm32hal库开发/index.html","eea75c52876401390a3d3f6d9c87383a"],["/categories/stm32/stm32hal库开发/page/2/index.html","483abae48ad178949173f375ff509686"],["/categories/stm32/stm32hal库开发/page/3/index.html","e98f36fca0ebe772c645b63bfea93934"],["/categories/wsl/index.html","ec0edabf2e808588e6064a2dcc036981"],["/categories/wsl/报错解决/index.html","4b21f9280c0423d47c2346fde9306c46"],["/categories/w报错解决/index.html","01e8d24ffdd2031073086ba350674bde"],["/css/index.css","c1f9f0e60847bcfa3aea9c2c217819b7"],["/css/modify.css","b84cf3325e4eb5ce86e4043fdb54e7e1"],["/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["/img/background.jpg","141db8f4899139d02900184132b07710"],["/img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/img/index.jpg","de8272f6c405d4e9ae9d67600513b771"],["/img/top.jpg","b69cc5753fc773bfa0c68ec428175b64"],["/index.html","48e41fc2a10ea7a89b1537258f1b3375"],["/js/custom/foot.js","0c68943056eb42d7aecb3da368ff4393"],["/js/custom/snow.js","abdafbb0471a95535e5e703d174d387d"],["/js/jquery-3.6.1.min.js","00727d1d5d9c90f7de826f1a4a9cc632"],["/js/main.js","960297fafacb19dff1246d71f6dfcf6f"],["/js/search/algolia.js","4491ac1d470a1693a502a9d09034aa21"],["/js/search/local-search.js","9da6b76672a143c8c8449770a8d259f3"],["/js/tw_cn.js","fb4da68124bbafbd2d3da537c80e27ce"],["/js/utils.js","420a15cf446b5670244a9ea05b2bccf0"],["/link/index.html","f17640cfc94b11914a519d65052cfac0"],["/page/10/index.html","b72b709fa11c2d4684d1cbdba02df566"],["/page/11/index.html","c6406601400fdf74b9970e99c0d14663"],["/page/12/index.html","538a4b62db8fcbd8b772b97fa2bd2d54"],["/page/13/index.html","9b7906c055b583d2cc59aff33b7cb262"],["/page/2/index.html","8c397f33fee2f4fed88d768ee3e80be0"],["/page/3/index.html","44d3eee3af86ee2a66850181774a14df"],["/page/4/index.html","9a0e26fe2bf00bd495e8f55cc75bf97f"],["/page/5/index.html","184099d83e861f0c792a3864f83c1902"],["/page/6/index.html","381990333e7449214cfcd6ed035e32c5"],["/page/7/index.html","f4dd4d1c42818afea8ab2ba7cc99e916"],["/page/8/index.html","e1ae0f481108a473e7079328fe75d268"],["/page/9/index.html","1d92c0b6dd37b2c646209332e022f152"],["/resources/index.html","279800ec495a91919a9988649a66e5c2"],["/styles/main.css","dcdbf93a47b27e97646b75c1f4cb9d38"],["/sw-register.js","470a8adf7193c8fbb216829498fa36c0"],["/tags/C语言/index.html","5d4a03d906bdf60b0a796aba7f62ec1d"],["/tags/hexo/index.html","55a3864b62c7736a022809e0e592190c"],["/tags/index.html","cb8b02dfddab0002f2a54770406644ea"],["/tags/linux/index.html","e31a17593262eec65a9d22571552812a"],["/tags/python/index.html","a14b81b8b2e5f08b92183deaf79e441f"],["/tags/stm32/index.html","8969db24a1b10d8855421707bf667243"],["/tags/stm32/page/2/index.html","56d2f7b2a48dac8ed0e622a745199dca"],["/tags/stm32/page/3/index.html","6ef8c160384d2359364e58b14d548805"],["/tags/ubuntu/index.html","c63d1ca8062d50a0eb0227fa286fffcd"],["/tags/wsl/index.html","186ed1172087fbe2a738d9c05c6e4102"],["/tags/入门/index.html","4dcf8c5c52505c2af9ee594817f0b725"],["/tags/外设/index.html","f4c53caa1df8ee734d0a65452c9b46d1"],["/tags/外设/page/2/index.html","8dcd98d4cb3a5e534b60a2a320eed59b"],["/tags/外设/page/3/index.html","012ff3d5049f196a68721f607387e56d"],["/tags/报错解决/index.html","ae719b178253f1988a4e89f8268df029"]];
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
