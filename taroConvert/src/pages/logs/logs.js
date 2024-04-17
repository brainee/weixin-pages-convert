import withWeapp, { cacheOptions } from '@tarojs/with-weapp'
import { Block, NavigationBar, ScrollView, View } from '@tarojs/components'
import React from 'react'
import Taro from '@tarojs/taro'
// logs.ts
// const util = require('../../utils/util.js')
import { formatTime } from '../../utils/util.js'
cacheOptions.setOptionsToCache({
  data: {
    logs: [],
  },
  lifetimes: {
    attached() {
      this.setData({
        logs: (Taro.getStorageSync('logs') || []).map((log) => {
          return {
            date: formatTime(new Date(log)),
            timeStamp: log,
          }
        }),
      })
    },
  },
})
@withWeapp(cacheOptions.getOptionsFromCache())
class _C extends React.Component {
  render() {
    const { logs } = this.data
    return (
      <Block>
        <NavigationBar
          title="查看启动日志"
          back={true}
          color="black"
          background="#FFF"
        ></NavigationBar>
        <ScrollView className="scrollarea" scrollY type="list">
          {logs?.map((log, index) => {
            return (
              <Block key={log.timeStamp}>
                <View className="log-item">{index + 1 + '. ' + log.date}</View>
              </Block>
            )
          })}
        </ScrollView>
      </Block>
    )
  }
}
export default _C
