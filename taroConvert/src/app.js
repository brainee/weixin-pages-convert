"use strict";

// app.ts
import withWeapp, { cacheOptions } from "@tarojs/with-weapp";
import { Block } from "@tarojs/components";
import React from "react";
import Taro from "@tarojs/taro";
cacheOptions.setOptionsToCache({
  globalData: {},
  onLaunch() {
    // 展示本地存储能力
    const logs = Taro.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    Taro.setStorageSync('logs', logs);
    // 登录
    Taro.login({
      success: res => {
        console.log(res.code);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    });
  }
});
@withWeapp(cacheOptions.getOptionsFromCache(), true)
class App extends React.Component {
  render() {
    return this.props.children;
  }
}
export default App;