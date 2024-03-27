/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2022/11/hexo-Hexo-双线部署到-Coding-Pages-和-GitHub-Pages-并实现全站-HTTPS/index.html","59fe5e1245307b6362543c0184012e6f"],["/2024/03/C语言-1-C语言基本概念/index.html","3cefb05cd4a277540aaaa7d65eb58b89"],["/2024/03/C语言-C语言-C语言解释器的实现/index.html","d0730bf50a9dca721ca249f31f76a088"],["/2024/03/ESP32-ESP32cam系列教程002：ESP32cam通过MQTT协议上传图片数据到阿里云IOT平台-巧遇人生-博客园/index.html","455180b4f1a0c7fd0f4c5d4dd35e62ca"],["/2024/03/Proteus-Proteus仿真416译码器74HC154-流水灯/index.html","bc20ca9d69948cdbbffbf2e5a69006c3"],["/2024/03/Proteus-Proteus仿真4X4矩阵按键扫描组成的加减运算/index.html","cadf71d1eb8be4b965b0b6a6bf1e835d"],["/2024/03/Proteus-Proteus仿真4X4矩阵按键扫描组成的简易加法器/index.html","9e87d07f593fcdfbba85a78cb5a9b80c"],["/2024/03/Proteus-Proteus仿真4X4矩阵按键显示0F/index.html","6e1f6001aec9b8b8a93e61fd184948f8"],["/2024/03/Proteus-Proteus仿真4x4矩阵键盘中断方式扫描-数码管显示/index.html","a92da94c4cfaad84e0d2ba37d51dc9e7"],["/2024/03/Proteus-Proteus仿真6位数码管秒计数器0999999S/index.html","9e6356bb27257e2520b29d290dc0b4f9"],["/2024/03/Proteus-Proteus仿真6位数码管计时器0105/index.html","1e8cc8100cf5055d87386c2d53bbce33"],["/2024/03/Proteus-Proteus仿真74HC154-四线转12线译码器组成的16路流水灯/index.html","f5cd13588882ba873c74c4b4af3e7b65"],["/2024/03/Proteus-Proteus仿真74HC59574LS154驱动显示16X16点阵/index.html","4d203fed9e1de4e2b7e402a544e7bffb"],["/2024/03/Proteus-Proteus仿真74LS194组成的8个led流水灯/index.html","b599545986fb0fca55abe011c8f370e5"],["/2024/03/Proteus-Proteus仿真88LED点阵屏仿电梯数字滚动显示/index.html","d69c40acb4cc5f3f7f3721812ecc3079"],["/2024/03/Proteus-Proteus仿真8x8Led点阵数字循环显示/index.html","ea8dfa23198d5bbd1efe2c59f99d529e"],["/2024/03/Proteus-Proteus仿真8位数码管动态扫描显示变化数据/index.html","147f563883494796ea61ac81254cde62"],["/2024/03/Proteus-Proteus仿真8位端口检测8独立按键/index.html","134014768989a1ed7d7ea079580ac4be"],["/2024/03/Proteus-Proteus仿真AT24C02数据读写LCD1602显示/index.html","0520583a2820e93a045ecb385a799153"],["/2024/03/Proteus-Proteus仿真BME280温湿度气压传感器数据串口输出/index.html","5ff37b88b51b59574f94b4d31ffd8c73"],["/2024/03/Proteus-Proteus仿真DHT11和实际硬件的差异以及读不到数据原因分析/index.html","01db6002fd2411b8aecd158e9dbaed65"],["/2024/03/Proteus-Proteus仿真DS18B20报警温度可调LM016显示/index.html","f310224df90b6890e6bc07a6f8614196"],["/2024/03/Proteus-Proteus仿真HCSRF04超声波测距传感器数码管显示/index.html","fc764f922d7425b22055948e946fda47"],["/2024/03/Proteus-Proteus仿真INT0和INT1中断计数/index.html","5865ef663188423eab18a9b881690f38"],["/2024/03/Proteus-Proteus仿真L297驱动步进电机/index.html","8f018bb917dc14095da42c48f00d1cbb"],["/2024/03/Proteus-Proteus仿真LCD1602DS1307按键设置简易时钟/index.html","d38d6d9c1c7721ce7bf64e09263a5e40"],["/2024/03/Proteus-Proteus仿真LCD1602字符滚动显示示例/index.html","0494b915724999f3fd1accf0ba02231e"],["/2024/03/Proteus-Proteus仿真LCD1602整屏内容信息移动/index.html","fe3358962f4135534093637336bd63c6"],["/2024/03/Proteus-Proteus仿真NE555延时电路/index.html","95955c3507fc94604d315deb59fd29be"],["/2024/03/Proteus-Proteus仿真PCF8591-AD电压采集8X8点阵显示/index.html","ebb79057c9b3e4fd5cbb45749501ac3b"],["/2024/03/Proteus-Proteus仿真STC15单片机-LCD16025X8点阵字符显示/index.html","ef19d6dfeed510f8763f5fb4b415fbe5"],["/2024/03/Proteus-Proteus仿真T6963C驱动PG12864示例带中英文显示/index.html","c148c3a9639d991d6f08fca5b29a0225"],["/2024/03/Proteus-Proteus仿真TLC5615输出1024点正弦波振幅可调/index.html","33df86d6557d4076198c6fe60d89dff3"],["/2024/03/Proteus-Proteus仿真TLC5615输出256点正弦波振幅可调/index.html","54d6a9a96261ba06e345a1d15a93f1da"],["/2024/03/Proteus-Proteus仿真uln2003驱动二相四线制步进电机正转/index.html","6ca1bc5fd1e69d7e84c8aca0aec8bd8f"],["/2024/03/Proteus-Proteus仿真三极管组成的H桥驱动直流电机按键正反转控制/index.html","4c2039c6122a06b335dc6b05c788b638"],["/2024/03/Proteus-Proteus仿真三极管组成的H桥驱动直流电机正反转可控/index.html","1142c03391ae54e2e91a5cfa7aa11596"],["/2024/03/Proteus-Proteus仿真利用加法计数器74XX160的级联实现2位计数/index.html","203b7c9b610fa260fea334ad47020e51"],["/2024/03/Proteus-Proteus仿真单片机DS18B20LCD1602显示/index.html","1e995efc2baa187121a554419fb8c7cc"],["/2024/03/Proteus-Proteus仿真在AT24C04的连续地址中写入数据并循环读取/index.html","bb2772da1d954bf6064be3e92122ccbf"],["/2024/03/Proteus-Proteus仿真基于74LS14874LS27974LS48的四路抢答器/index.html","6b5f46f17e55b4c90c94b2ac578b249d"],["/2024/03/Proteus-Proteus仿真基于VSM-串口printf调试输出示例/index.html","300d3f13220294df4a653417e9497a94"],["/2024/03/Proteus-Proteus仿真外部中断触发倒计时5秒/index.html","364b8487b1db5d5c6e48c96d6a666ae6"],["/2024/03/Proteus-Proteus仿真外部中断通过双继电器控制直流电机正反转/index.html","01c14b82c0ab28a86a35c81b498fb70d"],["/2024/03/Proteus-Proteus仿真多路非阻塞延时流水灯演示/index.html","8daf95c6155363d9c7c4c5e5402aa0d0"],["/2024/03/Proteus-Proteus仿真定时器0作为16位计数器使用示例/index.html","548a1cee01db49c87fbb92fa9feba211"],["/2024/03/Proteus-Proteus仿真定时器1外部计数中断/index.html","5a57af1f89fb6ab7f215f152aea19ada"],["/2024/03/Proteus-Proteus仿真按键设置数码管显示/index.html","f00151b47171d062e76d9abff7bf0f32"],["/2024/03/Proteus-Proteus仿真数码管4x4键盘矩阵按键简易计算器/index.html","b72ab63026394424b6e088ac7d195cd8"],["/2024/03/Proteus-Proteus仿真数码管递加递减带闪烁消隐显示/index.html","be6d1859497995255d393caae09b4579"],["/2024/03/Proteus-Proteus仿真步进电机转速数码管显示/index.html","429d6c060dc80d05ee6f4e33a4de01f6"],["/2024/03/Proteus-Proteus仿真波形信号发生器4种波形可选频率可调/index.html","db513f542f29f32e50d0e9c76a7bc6b3"],["/2024/03/Proteus-Proteus仿真独立按键数码管显示/index.html","b11ccb0acd811852a7fbcaa27d361f1a"],["/2024/03/Proteus-Proteus仿真用24C04与1602LCD设计的简易加密电子密码锁/index.html","7b68728cd43478e96cd91fe76858db9f"],["/2024/03/Proteus-Proteus仿真直流电机方向和速度按键控制/index.html","439be7c18a895cfaf5a3fc632e41d4de"],["/2024/03/Proteus-Proteus仿真矩阵键盘中断扫描/index.html","92d1782481d3e99b19a9c2bdf6242a48"],["/2024/03/Proteus-Proteus仿真简易数码管定时器时钟/index.html","a3b0c44367996b0acccbc903026cf2cc"],["/2024/03/Proteus-Proteus仿真自动量程范围10V切换数字电压表/index.html","b1eb3074b8241ff6e2bb9e585b81018c"],["/2024/03/Proteus-Proteus仿真计数逻辑组成的数字钟/index.html","bc8f99982bed94647df7d29e5af75c11"],["/2024/03/Proteus-Proteus仿真超声波模块HCSR04测距/index.html","1e950184ef236d0fad9d462af396d902"],["/2024/03/Proteus-Proteus仿真键盘矩阵扫描LCD128x64显示/index.html","a5bc592ea07f8bfa8b7d88cd0ce6611a"],["/2024/03/Proteus-Proteus基于VSM-Studio驱动LM016驱动模板/index.html","db99cb6a67f755ebfbef16046043dd55"],["/2024/03/Proteus-STC15单片机可设置倒计时09999报警器Proteus仿真/index.html","f439b8b75f2303ee44ebf1dff61554d0"],["/2024/03/Proteus-STC89C52RC-LCD1602PCF8574转IIC接口屏幕驱动显示Proteus仿真/index.html","a7b4288501801f58ae144c1e57d46e96"],["/2024/03/Proteus-蓝桥杯单片机定时器与中断秒表实验Proteus仿真/index.html","1b09abe5af5a6e904435998cf9260aa8"],["/2024/03/STC-51单片机LCD1602转IIC接口屏幕驱动显示/index.html","0b27c608cbd85ea3d9ecc27bb3b0d2a9"],["/2024/03/STC-STC52单片机简单控制直流电机正反转已验证/index.html","e5f41ae9de4cc23cd6a07905bf63cd7b"],["/2024/03/STC-STC单片机-NRF24L01通讯实验/index.html","10b1392aeae188bbdd7b7ec9ff727e27"],["/2024/03/STC-STC单片机-NRF24L01通讯带状态反馈/index.html","73afd7e1840aa9fea62ce06cb3600c91"],["/2024/03/Stc15-ESP8266-STC15基于AT指令通过TCP通讯协议控制IO状态/index.html","14a55749305bcd140704d97dfa28816d"],["/2024/03/Stc15-STC15W408AS-LCD1602转IIC接口屏幕驱动显示/index.html","42706c71231bceff5ce2bdb5fb9de27b"],["/2024/03/Stc15-STC15W408AS单片机通过ADC端口采集模拟量并从串口打印数值/index.html","4d9f2dd5587207964c3aa1753e9fe3e7"],["/2024/03/Stc15-STC15W408AS读取DHT11温湿度OLED显示数据串口打印/index.html","f4fe51b1b47579736b493f0387f7ee7d"],["/2024/03/Stc15-STC15W408AS读取DHT11温湿度OLED显示数据串口打印修订版/index.html","de3e4bca309f07665668959c97834b00"],["/2024/03/Stc15-STC15W408AS读取DHT11温湿度数据串口打印详解/index.html","49160c6827ff7ad8b095cbe8a43ab542"],["/2024/03/Stc15-STC15单片机DHT11LCD1602PCF8574转IIC接口温度显示/index.html","d05afa786c7f08406c8386b7022dc647"],["/2024/03/Stc15-STC15单片机DS18B20LCD1602PCF8574转IIC接口温度显示/index.html","eb0cc7585386f553cbda5ef75aff33e9"],["/2024/03/VSM-VSM-Studio-uln2003驱动步进电机单按键启保停正反转八拍控制/index.html","2517a850a15a2db29a5d1de34f2a2eb8"],["/2024/03/VSM-VSM-Studio-uln2003驱动步进电机单按键启保停正反转四拍控制/index.html","9486ac36915c67e20681a3925be67705"],["/2024/03/VSM-VSM-Studio-直流电机H桥驱动PWM-单向控制/index.html","077d991a18a6188d138466530e05ce09"],["/2024/03/daily/index.html","a46b1aac62629b11db58204c2b83c071"],["/2024/03/learning-cmake-001/index.html","a4bcb1525372927af47d0cec93404cb5"],["/2024/03/linux-common-cmd/index.html","386217d558bb8930cadde09cad5aa2e2"],["/2024/03/proteus仿真常用芯片-51单片机利用定时器控制单个led灯闪烁/index.html","b7ed5f2d4001d12e90dc75164d93e732"],["/2024/03/proteus仿真常用芯片-74HC595驱动2位数码管代码实现和注意事项/index.html","5bd89b9532ced3b8f8e9ae9d5b981242"],["/2024/03/proteus仿真常用芯片-8个IO口检测64个按键按键自锁控制方式/index.html","b0b6a3043699f01d60354b7d8de46cc1"],["/2024/03/proteus仿真常用芯片-8个IO口检测64个按键算法实现和心法要点讲解/index.html","168351bd318bde05dd90158b50a61f31"],["/2024/03/proteus仿真常用芯片-ADC0809-8通道轮流采样LCD1602显示/index.html","43438398fe344a879d1625b0840a98bb"],["/2024/03/proteus仿真常用芯片-Internal-Exception-access-violation-in-module-SPICEINPDLL-000007F9解决办法/index.html","aeb6b706d3dd0038c53bf81722769f49"],["/2024/03/proteus仿真常用芯片-LD3320语音识别模块MP3TF16P模块实现语音交互功能/index.html","b81064966b34a3627f2225d72f978aea"],["/2024/03/proteus仿真常用芯片-TLC5615输出256点正弦波振幅和频率可调/index.html","e8d036422e9c1ba395e9bc7378acc19e"],["/2024/03/proteus仿真常用芯片-TM1638芯片的显存地址详细解读/index.html","6cd084c4b5fe4b29ddc1ca7956ffffba"],["/2024/03/proteus仿真常用芯片-uln2003和2803两个有刷直流电机控制方案/index.html","ab3cd5b4b95fada7e444a1dab3656879"],["/2024/03/proteus仿真常用芯片-利用74HC138译码器实现数码管显示/index.html","e57873bf5a1767786a3c6079414dfa2c"],["/2024/03/proteus仿真常用芯片-标准库intrinsh中的循环指令在多种流水灯方式上的应用/index.html","5b9a226b5decc7cf04e63c88e18bc6b9"],["/2024/03/proteus仿真常用芯片-简单粗暴的流水灯仿真和代码/index.html","72aa4f287b50e88b66dfe8b44a385a56"],["/2024/03/proteus仿真常用芯片-经典按键扫描消抖算法实例仿真对比/index.html","1a8c76fe722395358138564e27221d58"],["/2024/03/proteus仿真常用芯片-经典按键扫描程序算法实现方式/index.html","ce42af75d120934f1548d26d27ef7f90"],["/2024/03/proteus仿真常用芯片-通过CD4019设计的电子时钟/index.html","10c15c149686bbc2cf885dcc78758d88"],["/2024/03/python-python-python的requests在网络请求中添加cookies参数/index.html","778a888765e47d47057cfd2e73d6304d"],["/2024/03/python-python-使用python揭秘CSDN热门付费专栏惊人真相/index.html","c5ba54b0fe8445b95fca856f697ebe62"],["/2024/03/python-python的requests在网络请求中添加cookies参数/index.html","8aaaba24c502f6c8ecfebe7950b7f3da"],["/2024/03/stm32-5-Systick滴答定时器初始化（HAL库）-无OS延时函数/index.html","98b03f366f4b175e80c50eeb13330a04"],["/2024/03/stm32-STM32-HAL库驱动DHT11读取温湿度程序/index.html","0be987237df770347d01bcda9d7e52ac"],["/2024/03/stm32-STM32-实现-44-矩阵键盘扫描（HAL库、标准库-都适用）-白菜没我白-博客园/index.html","303b1d1e00d226b0c971cf27b4070e4b"],["/2024/03/stm32-STM32CubeMX-HAL库的ADC多通道数据采集（轮训、DMA、DMA-TIM-、读取内部传感器温度/index.html","635b054fd813e1f9c69527c9ccf5824d"],["/2024/03/stm32-STM32F407使用Helix库软解MP3并通过DAC输出，最精简的STM32-SD卡实现MP3播放器/index.html","237bcaa7dbc454642dd10ed84ab28fc7"],["/2024/03/stm32-STM32HAL库学习笔记（一）——GPIO/index.html","d709603bb4b795a13e8625e5be3794d2"],["/2024/03/stm32-stm32-5-Systick滴答定时器初始化（HAL库）-无OS延时函数/index.html","bf0f6bb73f63a5f4ed2770f0d2d14032"],["/2024/03/stm32-stm32-STM32-HAL库驱动DHT11读取温湿度程序/index.html","252b6b088f928435929123966f96609b"],["/2024/03/stm32-stm32-STM32-实现-44-矩阵键盘扫描（HAL库、标准库-都适用）-白菜没我白-博客园/index.html","1e4c0cc2026044f20c18306db6e457ad"],["/2024/03/stm32-stm32-STM32CubeMX-HAL库的ADC多通道数据采集（轮训、DMA、DMA-TIM-、读取内部传感器温度/index.html","62789196d02d02c80de874c38d60a889"],["/2024/03/stm32-stm32-STM32F407使用Helix库软解MP3并通过DAC输出，最精简的STM32-SD卡实现MP3播放器/index.html","31a30dc40db091fc34ce80b314d2c8ff"],["/2024/03/stm32-stm32-【HAL库】STM32-ESP8266-Onenet-MQTT，极简工程，hal库移植。/index.html","16a121e702bc0e5bbc577d6b8d1dfdf8"],["/2024/03/stm32-stm32-【STM32】HAL库-STM32CubeMX教程十三-RTC时钟/index.html","1e940804afd5a825863a27fb220bfc16"],["/2024/03/stm32-stm32-基于STM32F103C8T6（HAL库）的HC-SR501红外人体传感及HC-SR04超声波测距/index.html","eb86ba2d8fd5e7304949b36e5e91bbdd"],["/2024/03/stm32-stm32-基于STM32HAL库，RC522（RFID）模块读写驱动，无线IC卡读写/index.html","807fdb963af62de1ec3b609bf382ddfd"],["/2024/03/stm32-stm32-基于STM32的HC-SR501红外感应模块驱动与应用/index.html","d55cefe706c623648821a3098016e39d"],["/2024/03/stm32-stm32-手把手教你，通过HAL库实现STM32的超声波测距-以SR-04为例/index.html","eef28f3770fdc2efbbf8effc51fd3dfe"],["/2024/03/stm32-【HAL库】STM32-ESP8266-Onenet-MQTT，极简工程，hal库移植。/index.html","2be3a6d8b9bce0088daae44073a457c4"],["/2024/03/stm32-【STM32】HAL库-STM32CubeMX教程十三-RTC时钟/index.html","58a436ced08e18f3b5fefefd81adea56"],["/2024/03/stm32-基于STM32F103C8T6（HAL库）的HC-SR501红外人体传感及HC-SR04超声波测距/index.html","6c0f9f5f0e81ba777a5b790aad67cab6"],["/2024/03/stm32-基于STM32HAL库，RC522（RFID）模块读写驱动，无线IC卡读写/index.html","15aa25e7b9a0e8e19820d420f7459f17"],["/2024/03/stm32-基于STM32的HC-SR501红外感应模块驱动与应用/index.html","74443a14cb6018e1f1817b4d5845afb4"],["/2024/03/stm32-手把手教你，通过HAL库实现STM32的超声波测距-以SR-04为例/index.html","c094c4819f345e2857c35f0f81accb8d"],["/2024/03/usageOfHexo/index.html","7e7bcdf5efeb942a23f59aad68326e4d"],["/2024/03/wsl-使用WSL2时控制台输出“wsl-检测到-localhost-代理配置，但未镜像到-WSL。NAT-模式下的-WSL-不支持-localhost-代理“/index.html","3585950087acb44f1e9a436b460b5225"],["/2024/03/【STM32】HAL库_STM32CubeMX教程十三---RTC时钟/index.html","c7ee25c009afaf8b233cdd7b49180551"],["/about/index.html","cb73fe483a82a653c2be3c49e5e76ca5"],["/archives/2022/11/index.html","cc456c6961b97336ebcd1c27a0acdfb5"],["/archives/2022/index.html","465e0b6812b5a0c54888d7e5c3f768d5"],["/archives/2024/03/index.html","815229c0933c5c3053388245809c667e"],["/archives/2024/03/page/10/index.html","81eb992a08a8ccf5ce21c4d69358aa3f"],["/archives/2024/03/page/11/index.html","459f6925e8bcb3f420d7ac0d655e8596"],["/archives/2024/03/page/12/index.html","89793e2f29ad30b18ee87b1463222274"],["/archives/2024/03/page/13/index.html","850141cb62891e86a3740af3d632aeff"],["/archives/2024/03/page/2/index.html","e095aaf64849454ca7d1e3d99d352a48"],["/archives/2024/03/page/3/index.html","dd83b88bf2ea8300fba39c9107e2666c"],["/archives/2024/03/page/4/index.html","7e7a6ae618c6a5421475b3cf4844f854"],["/archives/2024/03/page/5/index.html","bc531ea18d8fe6f7e6bf423f7c883516"],["/archives/2024/03/page/6/index.html","244821c2ca0be077b23d686b82382021"],["/archives/2024/03/page/7/index.html","e4e871ff9ed38287c6ca513d413a696b"],["/archives/2024/03/page/8/index.html","1eae58f209e65d3ce5b07d41aaa57f75"],["/archives/2024/03/page/9/index.html","d0c01d64bcc89c56c685cad9f40321e2"],["/archives/2024/index.html","884a62b1d408d99c4cbab61dfea53fa4"],["/archives/2024/page/10/index.html","5cbe1a895a4fd7b0d083778fc292547a"],["/archives/2024/page/11/index.html","9ef736590b0293540509b695bf6549fd"],["/archives/2024/page/12/index.html","4c2da54ee32574ccfb71dd0a2af4d2d3"],["/archives/2024/page/13/index.html","26413e339e67af91dd0c5f46e841cd50"],["/archives/2024/page/2/index.html","4dc305070a6e5d1e7f6f2bd02653102f"],["/archives/2024/page/3/index.html","d01974c99cba40a0e1ef59285fea4370"],["/archives/2024/page/4/index.html","4dc8bc7fe7a4b69640a96c32926fe991"],["/archives/2024/page/5/index.html","a2cc914bedaa7249559ad06ebf0f89de"],["/archives/2024/page/6/index.html","62c6d3226d3ae28e5244a93dcdd6665a"],["/archives/2024/page/7/index.html","b48a8b51e2ee3a404e092bf5603e956c"],["/archives/2024/page/8/index.html","3f2872d596a6b5b5bd6f9d18ce33bf84"],["/archives/2024/page/9/index.html","908c53843e17edae4b28858426cacfd7"],["/archives/index.html","49c5382315a24b3236a8f739c229c885"],["/archives/page/10/index.html","62cf4711d8ddb0fd05d013e2d67ed2df"],["/archives/page/11/index.html","cc123699070136752f2aac6828c540e7"],["/archives/page/12/index.html","827fb12f8501a269ab8133e3c5c7e529"],["/archives/page/13/index.html","f89f95a80446abd1531bd8c29cdbd457"],["/archives/page/14/index.html","c3907aca1042f8824b27b7f2b3b60002"],["/archives/page/2/index.html","d980955ac8f8b6f7929890f1ef079510"],["/archives/page/3/index.html","32e7f266a88135e5101b252e7253cf20"],["/archives/page/4/index.html","68c21f11e021d63bf2009ac70ff4ace2"],["/archives/page/5/index.html","760ca1c1e678318ea9667d4b7a615764"],["/archives/page/6/index.html","1931dbe3c72849815204502307de85d4"],["/archives/page/7/index.html","cf95724a4d3e08d964b08c505d69a126"],["/archives/page/8/index.html","2f340e03c4dbe75a0687fb47d9d049da"],["/archives/page/9/index.html","b660034874db9c31fb55da25bb758655"],["/categories/C语言/index.html","63f328aff6dced7382d6889b34ee7084"],["/categories/C语言/入门/index.html","5691e31077ced5479162763ffdf800f7"],["/categories/ESP32/ESP-cam/index.html","404745aef5321b2913f628f83070dd64"],["/categories/ESP32/index.html","a5c43d872a991601c9ba9e798de69bae"],["/categories/hexo/index.html","5a17c43ee4e59ead0e77452692b4341a"],["/categories/index.html","2b78b734ff4aeb7b092c44dfc7c2fdea"],["/categories/linux常用命令/index.html","ac824a2fadf697493b2237d5e579bfc8"],["/categories/python/index.html","ab8ac4266d207069eda04a17d5319b6f"],["/categories/python/requests/index.html","6e1037c87af27fc37c1addbeabb97788"],["/categories/stm32/index.html","97835ddffaece6fcf6c0a8f5f137d311"],["/categories/stm32/page/2/index.html","9b8e06e5ff5bb09bf38172eb45157c17"],["/categories/stm32/page/3/index.html","04643b780099db30a8d452fc69569463"],["/categories/stm32/stm32-hal库开发/index.html","23599972ea73669807cdda4fe0341202"],["/categories/stm32/stm32hal库开发/index.html","9bb3a8ceef29e16e18475b7ce65191dc"],["/categories/stm32/stm32hal库开发/page/2/index.html","8f81b23f523c9908036b4bf4e68b082e"],["/categories/stm32/stm32hal库开发/page/3/index.html","126b20997d386e39f67de7fda8dd4715"],["/categories/wsl/index.html","c109a691a4beb87486d2d6ba48aba240"],["/categories/wsl/报错解决/index.html","aa4a1e2bd13e930ad4dd23f76769df5d"],["/categories/w报错解决/index.html","a5b935c0f5337d35f1f19cc391ea9e15"],["/css/index.css","8bbde09aa73cca70913048e2c884ac77"],["/css/modify.css","28526c4aaaf8729548f6f8a916db8128"],["/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["/img/archive.jpg","b69cc5753fc773bfa0c68ec428175b64"],["/img/background.jpg","de8272f6c405d4e9ae9d67600513b771"],["/img/categories.jpg","4b57bbf336d298d2a49fd2385c3762fe"],["/img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/img/index.jpg","78b54bdfc4e605056cb4cb7cd86d8107"],["/img/tags.jpg","ba9e10e5aa5ef1878f2bd2be1b9a6bb7"],["/img/wechat.jpg","cd414ab41402a17bd4b206f6d6c690b7"],["/index.html","de38136a61a52b638a3b0be282e093e3"],["/js/custom/foot.js","0c68943056eb42d7aecb3da368ff4393"],["/js/custom/snow.js","abdafbb0471a95535e5e703d174d387d"],["/js/jquery-3.6.1.min.js","00727d1d5d9c90f7de826f1a4a9cc632"],["/js/main.js","960297fafacb19dff1246d71f6dfcf6f"],["/js/search/algolia.js","4491ac1d470a1693a502a9d09034aa21"],["/js/search/local-search.js","9da6b76672a143c8c8449770a8d259f3"],["/js/tw_cn.js","fb4da68124bbafbd2d3da537c80e27ce"],["/js/utils.js","420a15cf446b5670244a9ea05b2bccf0"],["/link/index.html","0a91dcf36a6f9dfed5b5488604c6a61d"],["/page/10/index.html","dc72683df918e4426e82106ca39d9f43"],["/page/11/index.html","74f77a54e8d783ff8dc7687302d1d239"],["/page/12/index.html","09debc1363c3dd9c08b15443e4703864"],["/page/13/index.html","42e85d5da06b080a6291e739234c0293"],["/page/14/index.html","0385e0bdf529b5dbc4708d8d76452382"],["/page/2/index.html","fcc37df9ea66e92faae2ba0699e15e5c"],["/page/3/index.html","a81cf33c609abb018435ced788338d0b"],["/page/4/index.html","79a06b525b2f639b6172f1533438d946"],["/page/5/index.html","04fe7fdbd5a89c4d718e0f2fc48aecf2"],["/page/6/index.html","faed1520c5e515ece782b677e484cff3"],["/page/7/index.html","a95a533cd799702c33e49d6456784c61"],["/page/8/index.html","74b9b627a17f132ffbdced5fe6a8e705"],["/page/9/index.html","3d354316af42196fd31bcbb61dc75558"],["/resources/index.html","6db28b5b2eec21eef8887d9dd4429146"],["/styles/main.css","dcdbf93a47b27e97646b75c1f4cb9d38"],["/sw-register.js","a117fb8fb342525990ef1811ee589bfd"],["/tags/C语言/index.html","38bad1ebfde9e387d6c5cf334d095edf"],["/tags/ESP32/index.html","559fea3c3115a2f3ec0cb00d3b853ca9"],["/tags/hexo/index.html","5e18ac1643c9e511afc16b21255c8902"],["/tags/index.html","adf48094af1714580fb25c3094003f09"],["/tags/linux/index.html","7eb97a78ecfbc3ddbc619c0205a9082e"],["/tags/python/index.html","e721c7d670b1cb85dc1b9ecbc7e53577"],["/tags/stm32/index.html","d51172c0fd5384bd3d596f51252a5cf7"],["/tags/stm32/page/2/index.html","bafba3beae1a1f1f9aaf164b2ca5080d"],["/tags/stm32/page/3/index.html","8657917b3a4038540f4e67b995e92655"],["/tags/ubuntu/index.html","6466c6b378414e0716f41eef44d517c9"],["/tags/wsl/index.html","60265420a1ba432d4afc54ed294c9c15"],["/tags/入门/index.html","9b08f5340663587457ddd1670e4dc8e2"],["/tags/外设/index.html","3fd606322a636d6775027bb2cbcc15c6"],["/tags/外设/page/2/index.html","fb1877d51ece64df22077c08976dfe42"],["/tags/外设/page/3/index.html","a179f1c95320323de08be6f8f104b576"],["/tags/报错解决/index.html","86165e5e368cb517495922714f8252d1"]];
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
