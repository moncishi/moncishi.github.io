/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2022/11/hexo-Hexo-双线部署到-Coding-Pages-和-GitHub-Pages-并实现全站-HTTPS/index.html","f578aa6bcbdafb83d03cdd3dc6abe414"],["/2024/03/C语言-1-C语言基本概念/index.html","d4257799a9e8dc506a5406d2adc7d774"],["/2024/03/C语言-C语言-C语言解释器的实现/index.html","d7c34e8fc1e7e217a9034408a9b45281"],["/2024/03/ESP32-ESP32cam系列教程002：ESP32cam通过MQTT协议上传图片数据到阿里云IOT平台-巧遇人生-博客园/index.html","0b82d311d3320e39407a330d4247a4de"],["/2024/03/Proteus-Proteus仿真416译码器74HC154-流水灯/index.html","5cb11c342ba0913b44ce9e4c8d1fe96a"],["/2024/03/Proteus-Proteus仿真4X4矩阵按键扫描组成的加减运算/index.html","cbca4b8c8efe09efbf011391ef0046a6"],["/2024/03/Proteus-Proteus仿真4X4矩阵按键扫描组成的简易加法器/index.html","9988503c4870be62287d568db0702a26"],["/2024/03/Proteus-Proteus仿真4X4矩阵按键显示0F/index.html","b04d9723a397c59b310ea3dd87ac9090"],["/2024/03/Proteus-Proteus仿真4x4矩阵键盘中断方式扫描-数码管显示/index.html","bbb1942fa53073079da0420aad79f0dd"],["/2024/03/Proteus-Proteus仿真6位数码管秒计数器0999999S/index.html","a45b78f5c4e7f71b197e624f35abc276"],["/2024/03/Proteus-Proteus仿真6位数码管计时器0105/index.html","524478a1bdf67a2ecded43f46387566b"],["/2024/03/Proteus-Proteus仿真74HC154-四线转12线译码器组成的16路流水灯/index.html","17aa750072ad3d1f1fdaa6c0dc1da39f"],["/2024/03/Proteus-Proteus仿真74HC59574LS154驱动显示16X16点阵/index.html","9539de931a061b42453fd3c49cb25f29"],["/2024/03/Proteus-Proteus仿真74LS194组成的8个led流水灯/index.html","51dc882e4a3a5df866d4684c78b11d0d"],["/2024/03/Proteus-Proteus仿真88LED点阵屏仿电梯数字滚动显示/index.html","5b311cd6625ce2304adcfe70721868f8"],["/2024/03/Proteus-Proteus仿真8x8Led点阵数字循环显示/index.html","dde9fc8305921025527effdba04744f5"],["/2024/03/Proteus-Proteus仿真8位数码管动态扫描显示变化数据/index.html","322c1bab5da791f0df7db648957680c6"],["/2024/03/Proteus-Proteus仿真8位端口检测8独立按键/index.html","b0cf6d05f7050a42c686ea4dc39c13a7"],["/2024/03/Proteus-Proteus仿真AT24C02数据读写LCD1602显示/index.html","ef2c9347784f9ff5e414e36c5a95197c"],["/2024/03/Proteus-Proteus仿真BME280温湿度气压传感器数据串口输出/index.html","12e2b42c2e83c76ca4f6bc82cd0d4cf6"],["/2024/03/Proteus-Proteus仿真DHT11和实际硬件的差异以及读不到数据原因分析/index.html","0507b9e2ca74eef863da14455ff13345"],["/2024/03/Proteus-Proteus仿真DS18B20报警温度可调LM016显示/index.html","9d56f646d6347400a7073e6a4789a5eb"],["/2024/03/Proteus-Proteus仿真HCSRF04超声波测距传感器数码管显示/index.html","6ae3c944eaad94339a0cd65e68ee11b4"],["/2024/03/Proteus-Proteus仿真INT0和INT1中断计数/index.html","2de6a928260cade8b91f555230f0fd89"],["/2024/03/Proteus-Proteus仿真L297驱动步进电机/index.html","ad4de13883e4d42aa9afd2570257bd27"],["/2024/03/Proteus-Proteus仿真LCD1602DS1307按键设置简易时钟/index.html","5df6df06c70d77f1ddeaa6d759d43540"],["/2024/03/Proteus-Proteus仿真LCD1602字符滚动显示示例/index.html","6e1a9cf4d111aeb24998986af735c25c"],["/2024/03/Proteus-Proteus仿真LCD1602整屏内容信息移动/index.html","fdf669922795402f6f66fc6132c3bd3a"],["/2024/03/Proteus-Proteus仿真NE555延时电路/index.html","f4a54e778e769f1b33e92448847ec52f"],["/2024/03/Proteus-Proteus仿真PCF8591-AD电压采集8X8点阵显示/index.html","75202d05b01c211cc270ef6ea301e6ff"],["/2024/03/Proteus-Proteus仿真STC15单片机-LCD16025X8点阵字符显示/index.html","fdc43e1117992cd08706d1d94f51d07b"],["/2024/03/Proteus-Proteus仿真T6963C驱动PG12864示例带中英文显示/index.html","244e1ad89b6995199a3cc0b6b1cf2a80"],["/2024/03/Proteus-Proteus仿真TLC5615输出1024点正弦波振幅可调/index.html","0698658104f314436f08297ed42b88f4"],["/2024/03/Proteus-Proteus仿真TLC5615输出256点正弦波振幅可调/index.html","634486223cfc12235c9d6636352ec490"],["/2024/03/Proteus-Proteus仿真uln2003驱动二相四线制步进电机正转/index.html","3d6c6444d1b282ec47a8369980280861"],["/2024/03/Proteus-Proteus仿真三极管组成的H桥驱动直流电机按键正反转控制/index.html","efe2ef647825255d358dae42b1c0de45"],["/2024/03/Proteus-Proteus仿真三极管组成的H桥驱动直流电机正反转可控/index.html","16b043c64f3d9cbf9f659388575f9b53"],["/2024/03/Proteus-Proteus仿真利用加法计数器74XX160的级联实现2位计数/index.html","b38eb7ab5ddf7301927ebefa5b3f726f"],["/2024/03/Proteus-Proteus仿真单片机DS18B20LCD1602显示/index.html","2b18f6007f6103fb0e7c2105e9889c1f"],["/2024/03/Proteus-Proteus仿真在AT24C04的连续地址中写入数据并循环读取/index.html","dcd699fb6bbf3276c3d450e2a1ecb06b"],["/2024/03/Proteus-Proteus仿真基于74LS14874LS27974LS48的四路抢答器/index.html","55cf3502c3a94ecafcdc41d8bcea10ca"],["/2024/03/Proteus-Proteus仿真基于VSM-串口printf调试输出示例/index.html","d3addadd884a066293e3f8836d2bcb93"],["/2024/03/Proteus-Proteus仿真外部中断触发倒计时5秒/index.html","c8abd8f96546f6101ec74a0d4c9c4061"],["/2024/03/Proteus-Proteus仿真外部中断通过双继电器控制直流电机正反转/index.html","2a503d1af682ef8e5bb4651851ac1356"],["/2024/03/Proteus-Proteus仿真多路非阻塞延时流水灯演示/index.html","b73cbdc518ee1966f99fe516e271a2d8"],["/2024/03/Proteus-Proteus仿真定时器0作为16位计数器使用示例/index.html","45878c31bf5dd7e2753e23e7e0450a5c"],["/2024/03/Proteus-Proteus仿真定时器1外部计数中断/index.html","77bc4ade4d92138e673defa6ee2fe551"],["/2024/03/Proteus-Proteus仿真按键设置数码管显示/index.html","4945f0e2a99b9c1fc6c1b527d46554b4"],["/2024/03/Proteus-Proteus仿真数码管4x4键盘矩阵按键简易计算器/index.html","1f038e193fae4c874d5cbeaa50fba993"],["/2024/03/Proteus-Proteus仿真数码管递加递减带闪烁消隐显示/index.html","a2a3749e04698b31cd71626f91cb98ba"],["/2024/03/Proteus-Proteus仿真步进电机转速数码管显示/index.html","d7ed0b5b0b0983e5bfb043e59bbc08a7"],["/2024/03/Proteus-Proteus仿真波形信号发生器4种波形可选频率可调/index.html","b2af57f880421109b86def1319320823"],["/2024/03/Proteus-Proteus仿真独立按键数码管显示/index.html","a57f7cfc6314cb47a4e3dc3743f7f7dd"],["/2024/03/Proteus-Proteus仿真用24C04与1602LCD设计的简易加密电子密码锁/index.html","1487f9b717c759d3e642201b1c623ab6"],["/2024/03/Proteus-Proteus仿真直流电机方向和速度按键控制/index.html","35d510dcac5f277b669360d06871651c"],["/2024/03/Proteus-Proteus仿真矩阵键盘中断扫描/index.html","9c1dc3fa7343a5d12796d8424e61cb56"],["/2024/03/Proteus-Proteus仿真简易数码管定时器时钟/index.html","3cbf74c30cc87f100cdef5ec56585699"],["/2024/03/Proteus-Proteus仿真自动量程范围10V切换数字电压表/index.html","c0f791834c0f429bd574b05048651d48"],["/2024/03/Proteus-Proteus仿真计数逻辑组成的数字钟/index.html","ced0d217a5aea52368a1ed898b3b1f8d"],["/2024/03/Proteus-Proteus仿真超声波模块HCSR04测距/index.html","2e590404130c119e7ecb418c0318b2ec"],["/2024/03/Proteus-Proteus仿真键盘矩阵扫描LCD128x64显示/index.html","1583b78331581c94241df41c209bca2a"],["/2024/03/Proteus-Proteus基于VSM-Studio驱动LM016驱动模板/index.html","f0bf928ae77370e559bc5090ae5f6521"],["/2024/03/Proteus-STC15单片机可设置倒计时09999报警器Proteus仿真/index.html","ce47d92fdedab32323a385dd754e3edf"],["/2024/03/Proteus-STC89C52RC-LCD1602PCF8574转IIC接口屏幕驱动显示Proteus仿真/index.html","b31d70a7155519971f7ad1d0bcc5399f"],["/2024/03/Proteus-蓝桥杯单片机定时器与中断秒表实验Proteus仿真/index.html","34bcfaafd725cb4e085f3ddf80a44c05"],["/2024/03/STC-51单片机LCD1602转IIC接口屏幕驱动显示/index.html","a3edccca454077394fbc6160318b85a8"],["/2024/03/STC-STC52单片机简单控制直流电机正反转已验证/index.html","450a34866b6772a83164ca6893f3ea2d"],["/2024/03/STC-STC单片机-NRF24L01通讯实验/index.html","90d7fb1eae311d31bd4d6a7b38459e41"],["/2024/03/STC-STC单片机-NRF24L01通讯带状态反馈/index.html","4f764607d42c90e6191801c17fa7dccd"],["/2024/03/Stc15-ESP8266-STC15基于AT指令通过TCP通讯协议控制IO状态/index.html","0fd3e39287a7e263b88f0aade2d93877"],["/2024/03/Stc15-STC15W408AS-LCD1602转IIC接口屏幕驱动显示/index.html","af2f6850353c01cff4842accbaf9acfa"],["/2024/03/Stc15-STC15W408AS单片机通过ADC端口采集模拟量并从串口打印数值/index.html","c706cb981ed9ebc46cd3dad9b6915566"],["/2024/03/Stc15-STC15W408AS读取DHT11温湿度OLED显示数据串口打印/index.html","d747b4b1f2578de24351e6e46b305964"],["/2024/03/Stc15-STC15W408AS读取DHT11温湿度OLED显示数据串口打印修订版/index.html","e64c3775314ed7a1170b02ec4725576e"],["/2024/03/Stc15-STC15W408AS读取DHT11温湿度数据串口打印详解/index.html","906a8c07798b24e4877864dea2a03d38"],["/2024/03/Stc15-STC15单片机DHT11LCD1602PCF8574转IIC接口温度显示/index.html","60bbe74e29ff4a1f437c946ea42c6f09"],["/2024/03/Stc15-STC15单片机DS18B20LCD1602PCF8574转IIC接口温度显示/index.html","78cd9a68414eb3b8faa59b6524b6837e"],["/2024/03/VSM-VSM-Studio-uln2003驱动步进电机单按键启保停正反转八拍控制/index.html","612c28f45ce700d99ae99b67e71929ba"],["/2024/03/VSM-VSM-Studio-uln2003驱动步进电机单按键启保停正反转四拍控制/index.html","815a0099b37ea3d18901e7c6dfd456d3"],["/2024/03/VSM-VSM-Studio-直流电机H桥驱动PWM-单向控制/index.html","f3a26cc433955b05e62400283f1aa652"],["/2024/03/daily/index.html","01aeb654aa6dca06dec4361ad547e4b0"],["/2024/03/linux-common-cmd/index.html","a474721247a972174066a42a6357b025"],["/2024/03/proteus仿真常用芯片-51单片机利用定时器控制单个led灯闪烁/index.html","e9c0cd5b4329d9530095d030ebf40bfb"],["/2024/03/proteus仿真常用芯片-74HC595驱动2位数码管代码实现和注意事项/index.html","82c97c01ab1da3c2f78e88e5980b78ec"],["/2024/03/proteus仿真常用芯片-8个IO口检测64个按键按键自锁控制方式/index.html","f50250df42900bc37baf4566e720add1"],["/2024/03/proteus仿真常用芯片-8个IO口检测64个按键算法实现和心法要点讲解/index.html","2f7933d119e8c5bdc3206acd6f514afa"],["/2024/03/proteus仿真常用芯片-ADC0809-8通道轮流采样LCD1602显示/index.html","fe421cab164c92b7fcdfe32fefcfdf46"],["/2024/03/proteus仿真常用芯片-Internal-Exception-access-violation-in-module-SPICEINPDLL-000007F9解决办法/index.html","a4e2d66236ab9fb6820d984bfcfdc96d"],["/2024/03/proteus仿真常用芯片-LD3320语音识别模块MP3TF16P模块实现语音交互功能/index.html","49352c2918603e08b49b851847edfdd9"],["/2024/03/proteus仿真常用芯片-TLC5615输出256点正弦波振幅和频率可调/index.html","b90099683bd265df6e0ab0e4ec419346"],["/2024/03/proteus仿真常用芯片-TM1638芯片的显存地址详细解读/index.html","59dbd88a5de6c477af6b0b490544c9eb"],["/2024/03/proteus仿真常用芯片-uln2003和2803两个有刷直流电机控制方案/index.html","751be84ba18f0ea41a2f21221a03f7a5"],["/2024/03/proteus仿真常用芯片-利用74HC138译码器实现数码管显示/index.html","c870173417a5cfb1c0c2ac70e6749ee8"],["/2024/03/proteus仿真常用芯片-标准库intrinsh中的循环指令在多种流水灯方式上的应用/index.html","a733ffbf881c7ac0b73240786b72d735"],["/2024/03/proteus仿真常用芯片-简单粗暴的流水灯仿真和代码/index.html","ed4ac85f5866f702b36f77d5875a236a"],["/2024/03/proteus仿真常用芯片-经典按键扫描消抖算法实例仿真对比/index.html","e7ed6ea0181fbe1615ccb5680e751b9e"],["/2024/03/proteus仿真常用芯片-经典按键扫描程序算法实现方式/index.html","f9bb17f082c7f4b0a40b82c164712c15"],["/2024/03/proteus仿真常用芯片-通过CD4019设计的电子时钟/index.html","d5ec7893cd2b3a6036a1943e4b48ebf6"],["/2024/03/python-python-python的requests在网络请求中添加cookies参数/index.html","108f3bdc580d9f0aa74d1de4e8f4471e"],["/2024/03/python-python-使用python揭秘CSDN热门付费专栏惊人真相/index.html","f588f9e110b7e30d185a1c7fad5ed5f0"],["/2024/03/python-python的requests在网络请求中添加cookies参数/index.html","fad89633bac9e66c5473b3def0f0fe48"],["/2024/03/stm32-5-Systick滴答定时器初始化（HAL库）-无OS延时函数/index.html","2811bf732d714ce2b3c0a1aa578bc835"],["/2024/03/stm32-STM32-HAL库驱动DHT11读取温湿度程序/index.html","b385c9b42f8c2ce13643df4f8db2b11f"],["/2024/03/stm32-STM32-实现-44-矩阵键盘扫描（HAL库、标准库-都适用）-白菜没我白-博客园/index.html","f9183b7d115150c94d2799c65b83e4bd"],["/2024/03/stm32-STM32CubeMX-HAL库的ADC多通道数据采集（轮训、DMA、DMA-TIM-、读取内部传感器温度/index.html","cb92c4e253cc0444926f46164b2de9c7"],["/2024/03/stm32-STM32F407使用Helix库软解MP3并通过DAC输出，最精简的STM32-SD卡实现MP3播放器/index.html","2e5e6c7a7f13f38897d525c2207367a5"],["/2024/03/stm32-STM32HAL库学习笔记（一）——GPIO/index.html","fb3d8b774e88212c6580409104d373c0"],["/2024/03/stm32-stm32-5-Systick滴答定时器初始化（HAL库）-无OS延时函数/index.html","d30ac3773169fdf8b3a82e9efa461b9a"],["/2024/03/stm32-stm32-STM32-HAL库驱动DHT11读取温湿度程序/index.html","1e829975d1f0ea10789c55845bfabe77"],["/2024/03/stm32-stm32-STM32-实现-44-矩阵键盘扫描（HAL库、标准库-都适用）-白菜没我白-博客园/index.html","feec59b3dc07c43125f737ef9fa40973"],["/2024/03/stm32-stm32-STM32CubeMX-HAL库的ADC多通道数据采集（轮训、DMA、DMA-TIM-、读取内部传感器温度/index.html","944de41db38e627d9504e6f44284a7d4"],["/2024/03/stm32-stm32-STM32F407使用Helix库软解MP3并通过DAC输出，最精简的STM32-SD卡实现MP3播放器/index.html","db84fce49f8112de4ce2c18ac51fce45"],["/2024/03/stm32-stm32-【HAL库】STM32-ESP8266-Onenet-MQTT，极简工程，hal库移植。/index.html","12b557004f30cc1ac2f4ad1d26eca053"],["/2024/03/stm32-stm32-【STM32】HAL库-STM32CubeMX教程十三-RTC时钟/index.html","788e9e6837507790c03a7633dff3bae3"],["/2024/03/stm32-stm32-基于STM32F103C8T6（HAL库）的HC-SR501红外人体传感及HC-SR04超声波测距/index.html","a7baa15bc059d3f1cc6e6afa4c1bed14"],["/2024/03/stm32-stm32-基于STM32HAL库，RC522（RFID）模块读写驱动，无线IC卡读写/index.html","d0de8d1813d72c49b2aceb10cf250c6c"],["/2024/03/stm32-stm32-基于STM32的HC-SR501红外感应模块驱动与应用/index.html","956553dcb4a5fb2fdc8000e2727b951a"],["/2024/03/stm32-stm32-手把手教你，通过HAL库实现STM32的超声波测距-以SR-04为例/index.html","66b0e22ede0b9b644672ac77bff79bb7"],["/2024/03/stm32-【HAL库】STM32-ESP8266-Onenet-MQTT，极简工程，hal库移植。/index.html","893be3eba7c401a360d0d133ad03a51e"],["/2024/03/stm32-【STM32】HAL库-STM32CubeMX教程十三-RTC时钟/index.html","878eceed15885384f2218f48c4005bb9"],["/2024/03/stm32-基于STM32F103C8T6（HAL库）的HC-SR501红外人体传感及HC-SR04超声波测距/index.html","c7442554197990c55ecd3f011db860ee"],["/2024/03/stm32-基于STM32HAL库，RC522（RFID）模块读写驱动，无线IC卡读写/index.html","6f3bdb534a30a8afa230295da4d94c90"],["/2024/03/stm32-基于STM32的HC-SR501红外感应模块驱动与应用/index.html","e2324dc7382fcf61e21e688d250ae251"],["/2024/03/stm32-手把手教你，通过HAL库实现STM32的超声波测距-以SR-04为例/index.html","d437b32ffd29a8d9cacf175c2049106c"],["/2024/03/usageOfHexo/index.html","845874cbb2afb96bc4470db2354088a5"],["/2024/03/wsl-使用WSL2时控制台输出“wsl-检测到-localhost-代理配置，但未镜像到-WSL。NAT-模式下的-WSL-不支持-localhost-代理“/index.html","ecef174272ddfe086d999cfb2f0f63d3"],["/2024/03/【STM32】HAL库_STM32CubeMX教程十三---RTC时钟/index.html","ac66c08367c8d31db4e7810eec139ed3"],["/about/index.html","3522bd9d29fca129f430d8607b3a398a"],["/archives/2022/11/index.html","1c4bc0db5c08dc382cd7cf0cba061155"],["/archives/2022/index.html","bd118f04690d851d7d5dd98e21d06891"],["/archives/2024/03/index.html","bf7307480d1d4c4be701f330e4f6a3e1"],["/archives/2024/03/page/10/index.html","155c27c93e84c3623eb754ddddd6b736"],["/archives/2024/03/page/11/index.html","9bfe4244c3d525bb8ea42d9eaf2b2a68"],["/archives/2024/03/page/12/index.html","33ca14a3c7002b7232e4df9c0967fbbf"],["/archives/2024/03/page/13/index.html","aeed2dabcbea3f4675b72638942e47e3"],["/archives/2024/03/page/2/index.html","93c2d0f8de034704c28b3625a0dab302"],["/archives/2024/03/page/3/index.html","b2344239c005b02b61fd5cd8b2ad0d63"],["/archives/2024/03/page/4/index.html","12b182543ec83c52429839ade33af62a"],["/archives/2024/03/page/5/index.html","144e5878bb7295345f9537d65bab0bf6"],["/archives/2024/03/page/6/index.html","f75d1172d9cbd630ee83ba2e44543c4e"],["/archives/2024/03/page/7/index.html","e2dd1921146eee8237196f92b7374195"],["/archives/2024/03/page/8/index.html","1b7aba9b56c4ff8de97e9d88be0eec72"],["/archives/2024/03/page/9/index.html","56d8ff993dc3f779b2270347553009b3"],["/archives/2024/index.html","98aeb5767d5ed53732833d9c7ad02072"],["/archives/2024/page/10/index.html","f9ed268c5d090b108973134fa567206f"],["/archives/2024/page/11/index.html","5191198edba7aef804329e510b7a3135"],["/archives/2024/page/12/index.html","e2692d847bea73ec939196c63850bcdc"],["/archives/2024/page/13/index.html","26889eb9523731a1c3df3be82ab44fea"],["/archives/2024/page/2/index.html","2878d83267f7f9b07efc60aae5b8827b"],["/archives/2024/page/3/index.html","6f79fb087db120d0d4d7eafc4cb183a1"],["/archives/2024/page/4/index.html","2a3e0a2c318608af06eb9dc9193a997d"],["/archives/2024/page/5/index.html","d417aa9fbd35a477412b73ca72e82338"],["/archives/2024/page/6/index.html","36c4646e597df13bcac2d8ecd4580bee"],["/archives/2024/page/7/index.html","bcc877d550bc3e1a57dc79d75b1961a8"],["/archives/2024/page/8/index.html","30cb8ae331aecd4e1b29eb34bd59f868"],["/archives/2024/page/9/index.html","e5e132ea6ed1a61fd3139c20beeff0e2"],["/archives/index.html","22609b8a6e9deb20118d33517b6a53e4"],["/archives/page/10/index.html","4543debc615ca7c080f3d3b29d86e214"],["/archives/page/11/index.html","e7a758e1071bf88707fab32ab197ab07"],["/archives/page/12/index.html","881e0ac258f56e83ac2a7bd7ffa2936a"],["/archives/page/13/index.html","f62aa362ac37452b6ea7a79aca2972e1"],["/archives/page/2/index.html","a7e16cf1ffb3d4dd224ce0fee3b75414"],["/archives/page/3/index.html","3b6e059cd0c17ed4a7c06565e98b9ed4"],["/archives/page/4/index.html","751760d1e206794381ef0db7cf0821ef"],["/archives/page/5/index.html","b3a3d99c8623727216d7b283be52a36f"],["/archives/page/6/index.html","7126396b29c3012316fdb237441a7470"],["/archives/page/7/index.html","8c82eba4994e8dc0bbb0ae9b3552f581"],["/archives/page/8/index.html","c90ad205175b39d4ba0f1c5de037ce36"],["/archives/page/9/index.html","48c9e9cd4639eacc901a8d87d6f1c910"],["/categories/C语言/index.html","46caa5c2ce09fb0e4912424618da4777"],["/categories/C语言/入门/index.html","93ea28bdb298120d9c16418e950307f9"],["/categories/hexo/index.html","321517a9b2a0907a5808fb294dae09ce"],["/categories/index.html","bb21981859cde81d48a8e129ea6ce97d"],["/categories/linux常用命令/index.html","fd8b5f0e057defe465d0faec9ea6959e"],["/categories/python/index.html","2cd2d52a39f0706babdfad7f7dfb7b6e"],["/categories/python/requests/index.html","deeaad8b40ccf2e2249488419ab65ca4"],["/categories/stm32/index.html","268794e0d109a15137736977805d95b7"],["/categories/stm32/page/2/index.html","e85adcd834d0f0a4ed07f5880ba5b6d1"],["/categories/stm32/page/3/index.html","7e1923a47d89428ed1fa986a4899aba8"],["/categories/stm32/stm32-hal库开发/index.html","6e6f2bba9a856d016c2b226d72d89cf6"],["/categories/stm32/stm32hal库开发/index.html","f8faaf8b7c7d39aa84b954de4e7d3a66"],["/categories/stm32/stm32hal库开发/page/2/index.html","54840f1735f01e91073dd154f43bb241"],["/categories/stm32/stm32hal库开发/page/3/index.html","15a282f1053f64c710d3f6ec60486ed8"],["/categories/wsl/index.html","9c67211ea2fa5f67b8a1294bee1111b3"],["/categories/wsl/报错解决/index.html","8e3c95e3fa64780f07876dc68f2f14f3"],["/categories/w报错解决/index.html","899deda6951de9ae4a8b1f27d3bedc52"],["/css/index.css","c1f9f0e60847bcfa3aea9c2c217819b7"],["/css/modify.css","b84cf3325e4eb5ce86e4043fdb54e7e1"],["/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["/img/background.jpg","141db8f4899139d02900184132b07710"],["/img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/img/index.jpg","de8272f6c405d4e9ae9d67600513b771"],["/img/top.jpg","b69cc5753fc773bfa0c68ec428175b64"],["/index.html","275a5ab1686338d4d5b264ac81ecb43d"],["/js/custom/foot.js","0c68943056eb42d7aecb3da368ff4393"],["/js/custom/snow.js","abdafbb0471a95535e5e703d174d387d"],["/js/jquery-3.6.1.min.js","00727d1d5d9c90f7de826f1a4a9cc632"],["/js/main.js","960297fafacb19dff1246d71f6dfcf6f"],["/js/search/algolia.js","4491ac1d470a1693a502a9d09034aa21"],["/js/search/local-search.js","9da6b76672a143c8c8449770a8d259f3"],["/js/tw_cn.js","fb4da68124bbafbd2d3da537c80e27ce"],["/js/utils.js","420a15cf446b5670244a9ea05b2bccf0"],["/link/index.html","aabc1a31c20325d2f3637dd99076a378"],["/page/10/index.html","ee86c1732a9fb1737cffb0827213bb70"],["/page/11/index.html","2b8e9264900dcd226a9e313f96ec8292"],["/page/12/index.html","6d84c104e2ddf3b363435aab21bae000"],["/page/13/index.html","15dda7ffaf1a051753ea589dc2d02b31"],["/page/2/index.html","8b5145f92e2bf90add83d0deac5ef198"],["/page/3/index.html","9e518c4a66e2d8f990e8e632499c5876"],["/page/4/index.html","3e47013cbd07fe7358019235e1474efc"],["/page/5/index.html","318ae916bd1b64c12267c567c01e1c45"],["/page/6/index.html","02b054e232dfa5a8ec2360519c63396f"],["/page/7/index.html","18928dd2285550b14aa1a47ffe37d371"],["/page/8/index.html","443a0f1270929a5e5b5b86f117116f8d"],["/page/9/index.html","310f2524a3ee99fa8e1751bef428ec2b"],["/resources/index.html","f7de3825f119770892b0316b1cbffe68"],["/styles/main.css","dcdbf93a47b27e97646b75c1f4cb9d38"],["/sw-register.js","d1a170edddcc56d900328e6d72f43ce6"],["/tags/C语言/index.html","71233a1b1fd9df438b38d569184795e7"],["/tags/hexo/index.html","a55abb3cc85d431fde50d12b3daa56b8"],["/tags/index.html","86e4d6ab0a433f4f226b3f0608a8e909"],["/tags/linux/index.html","fa2615118456458ce36fa641f475fb95"],["/tags/python/index.html","1a63e7e8e28e15d6c644eefe003e7fa7"],["/tags/stm32/index.html","3ef1f5a9fe803b3953d4392371e0c413"],["/tags/stm32/page/2/index.html","5993d29a91a4e25723c337bda57e90fe"],["/tags/stm32/page/3/index.html","0fb22e6369d905afa9e50697fe8becf9"],["/tags/ubuntu/index.html","2711b9aa3e04abc0842bdb82a6c2eab9"],["/tags/wsl/index.html","97e4d9cade7b906de85d95fe0865d897"],["/tags/入门/index.html","7689eb15b6535042a9397a4dff802e41"],["/tags/外设/index.html","debc6188dc0d5b979e73b7746b9589e8"],["/tags/外设/page/2/index.html","482c09be48e0fbb0355fc75b1bfc0488"],["/tags/外设/page/3/index.html","6af50f524f130a909f1906f1fba69461"],["/tags/报错解决/index.html","565c0508e1b40270bc1e8a100f53e937"]];
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
