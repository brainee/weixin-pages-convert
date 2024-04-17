'use strict'

// index.ts
// 获取应用实例
import withWeapp, { cacheOptions } from '@tarojs/with-weapp'
import {
  Block,
  NavigationBar,
  ScrollView,
  View,
  Button,
  Image,
  Text,
  Input,
} from '@tarojs/components'
import React from 'react'
import Taro from '@tarojs/taro'
const app = Taro.getApp()
const defaultAvatarUrl =
  'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
cacheOptions.setOptionsToCache({
  data: {
    motto: 'Hello World2',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: Taro.canIUse('getUserProfile'),
    canIUseNicknameComp: Taro.canIUse('input.type.nickname'),
  },
  methods: {
    // 事件处理函数
    bindViewTap() {
      Taro.navigateTo({
        url: '../logs/logs',
      })
    },
    onChooseAvatar(e) {
      const { avatarUrl } = e.detail
      const { nickName } = this.data.userInfo
      this.setData({
        'userInfo.avatarUrl': avatarUrl,
        hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
      })
    },
    onInputChange(e) {
      const nickName = e.detail.value
      const { avatarUrl } = this.data.userInfo
      this.setData({
        'userInfo.nickName': nickName,
        hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
      })
    },
    getUserProfile() {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      Taro.getUserProfile({
        desc: '展示用户信息',
        // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          })
        },
      })
    },
  },
})
@withWeapp(cacheOptions.getOptionsFromCache())
class _C extends React.Component {
  render() {
    const {
      canIUseNicknameComp,
      hasUserInfo,
      userInfo,
      canIUseGetUserProfile,
      motto,
    } = this.data
    return (
      <Block>
        <NavigationBar
          title="Weixin"
          back={false}
          color="black"
          background="#FFF"
        ></NavigationBar>
        <ScrollView className="scrollarea" scrollY type="list">
          <View className="container">
            <View className="userinfo">
              {canIUseNicknameComp && !hasUserInfo ? (
                <Block>
                  <Button
                    className="avatar-wrapper"
                    openType="chooseAvatar"
                    onChooseAvatar={this.onChooseAvatar}
                  >
                    <Image className="avatar" src={userInfo.avatarUrl}></Image>
                  </Button>
                  <View className="nickname-wrapper">
                    <Text className="nickname-label">昵称</Text>
                    <Input
                      type="nickname"
                      className="nickname-input"
                      placeholder="请输入昵称"
                      onChange={this.onInputChange}
                    ></Input>
                  </View>
                </Block>
              ) : !hasUserInfo ? (
                <Block>
                  {canIUseGetUserProfile ? (
                    <Button onClick={this.getUserProfile}>获取头像昵称</Button>
                  ) : (
                    <View>请使用2.10.4及以上版本基础库</View>
                  )}
                </Block>
              ) : (
                <Block>
                  <Image
                    onClick={this.bindViewTap}
                    className="userinfo-avatar"
                    src={userInfo.avatarUrl}
                    mode="cover"
                  ></Image>
                  <Text className="userinfo-nickname">{userInfo.nickName}</Text>
                </Block>
              )}
            </View>
            <View className="usermotto">
              <Text className="user-motto">{motto}</Text>
            </View>
          </View>
        </ScrollView>
      </Block>
    )
  }
}
export default _C
