'use strict'

import withWeapp, { cacheOptions } from '@tarojs/with-weapp'
import { Block, View, Slot, Text } from '@tarojs/components'
import React from 'react'
import Taro from '@tarojs/taro'
cacheOptions.setOptionsToCache({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    extClass: {
      type: String,
      value: '',
    },
    title: {
      type: String,
      value: '',
    },
    background: {
      type: String,
      value: '',
    },
    color: {
      type: String,
      value: '',
    },
    back: {
      type: Boolean,
      value: true,
    },
    loading: {
      type: Boolean,
      value: false,
    },
    homeButton: {
      type: Boolean,
      value: false,
    },
    animated: {
      // 显示隐藏的时候opacity动画效果
      type: Boolean,
      value: true,
    },
    show: {
      // 显示隐藏导航，隐藏的时候navigation-bar的高度占位还在
      type: Boolean,
      value: true,
      observer: '_showChange',
    },
    // back为true的时候，返回的页面深度
    delta: {
      type: Number,
      value: 1,
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    displayStyle: '',
  },
  lifetimes: {
    attached() {
      const rect = Taro.getMenuButtonBoundingClientRect()
      Taro.getSystemInfo({
        success: (res) => {
          const isAndroid = res.platform === 'android'
          const isDevtools = res.platform === 'devtools'
          this.setData({
            ios: !isAndroid,
            innerPaddingRight: `padding-right: ${
              res.windowWidth - rect.left
            }px`,
            leftWidth: `width: ${res.windowWidth - rect.left}px`,
            safeAreaTop:
              isDevtools || isAndroid
                ? `height: calc(var(--height) + ${res.safeArea.top}px); padding-top: ${res.safeArea.top}px`
                : ``,
          })
        },
      })
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _showChange(show) {
      xxx
      const animated = this.data.animated
      let displayStyle = ''
      if (animated) {
        displayStyle = `opacity: ${show ? '1' : '0'};transition:opacity 0.5s;`
      } else {
        displayStyle = `display: ${show ? '' : 'none'}`
      }
      this.setData({
        displayStyle,
      })
    },
    back() {
      const data = this.data
      if (data.delta) {
        Taro.navigateBack({
          delta: data.delta,
        })
      }
      this.triggerEvent(
        'back',
        {
          delta: data.delta,
        },
        {}
      )
    },
  },
})
@withWeapp(cacheOptions.getOptionsFromCache())
class _C extends React.Component {
  render() {
    const {
      extClass,
      ios,
      color,
      background,
      displayStyle,
      innerPaddingRight,
      safeAreaTop,
      leftWidth,
      back,
      homeButton,
      loading,
      title,
    } = this.data
    return (
      <View className={'weui-navigation-bar ' + extClass}>
        <View
          className={'weui-navigation-bar__inner ' + (ios ? 'ios' : 'android')}
          style={
            'color: ' +
            color +
            '; background: ' +
            background +
            '; ' +
            displayStyle +
            '; ' +
            innerPaddingRight +
            '; ' +
            safeAreaTop +
            ';'
          }
        >
          <View className="weui-navigation-bar__left" style={leftWidth + ';'}>
            {back || homeButton ? (
              <Block>
                {back && (
                  <Block>
                    <View className="weui-navigation-bar__buttons weui-navigation-bar__buttons_goback">
                      <View
                        onClick={this.back}
                        className="weui-navigation-bar__btn_goback_wrapper"
                        hoverClass="weui-active"
                        hoverStayTime="100"
                        ariaRole="button"
                        ariaLabel="返回"
                      >
                        <View className="weui-navigation-bar__button weui-navigation-bar__btn_goback"></View>
                      </View>
                    </View>
                  </Block>
                )}
                {/*  返回首页  */}
                {homeButton && (
                  <Block>
                    <View className="weui-navigation-bar__buttons weui-navigation-bar__buttons_home">
                      <View
                        onClick={this.home}
                        className="weui-navigation-bar__btn_home_wrapper"
                        hoverClass="weui-active"
                        ariaRole="button"
                        ariaLabel="首页"
                      >
                        <View className="weui-navigation-bar__button weui-navigation-bar__btn_home"></View>
                      </View>
                    </View>
                  </Block>
                )}
              </Block>
            ) : (
              <Block>{this.props.renderLeft}</Block>
            )}
          </View>
          {/*  标题  */}
          <View className="weui-navigation-bar__center">
            {loading && (
              <View className="weui-navigation-bar__loading" ariaRole="alert">
                <View
                  className="weui-loading"
                  ariaRole="img"
                  ariaLabel="加载中"
                ></View>
              </View>
            )}
            {title ? (
              <Block>
                <Text>{title + '2'}</Text>
              </Block>
            ) : (
              <Block>{this.props.renderCenter}</Block>
            )}
          </View>
          {/*  右侧留空  */}
          <View className="weui-navigation-bar__right">
            {this.props.renderRight}
          </View>
        </View>
      </View>
    )
  }
}
export default _C
