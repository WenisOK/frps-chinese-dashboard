# Frps仪表台简体中文版
源项目地址 (@fatedier) [https://github.com/fatedier/frp](https://github.com/fatedier/frp)
## 预览
![demo.png](./images/demo.png)
# 安装方法
1. 安装依赖，需`node.js`环境。
```shell
frp-chinese-dashboard# npm i 

或者

frp-chinese-dashboard# yarn
```
2. 构建源码，`make`指令需安装`make`工具。
```shell
frp-chinese-dashboard# npm build

或者

frp-chinese-dashboard# yarn build

或者

frp-chinese-dashboard# make
```
3. 编译frps
    > 需要有golang环境
    + 下载frp源代码 [frp release](https://github.com/fatedier/frp/releases)
    + 删除原有的仪表台编译好的文件
    ```shell
    frp# rm -rf ./assets/frps/*
    frp# cp /path/to/frp-chinese-dashboard/dist/* ./assets/frps/
    frp# make frps
    ```
    + 编译完成！，编译好的`frps`在`bin/frps`。