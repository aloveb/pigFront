//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'GO GO GO!',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //登录
  
  //事件处理函数
  bindViewTap: function() {

    wx.navigateTo({
      url: '../regist/regist'
    })
  },
  onLoad: function () {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) { //  第一步： 获取code
          //发起网络请求
          console.log("code:" + res.code)
          wx.request({
            url: 'https://rooti347933trial.hanatrial.ondemand.com/root/user/regist',
            data: {
              code: 2222
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              //openid = res.data.openid 返回openid
              console.log("openid:" + res.data)
            }
          })
          var check = false
          if (check == false) {
            //check为false时提示用户是否进行注册，确认后跳转到注册页面
            wx.navigateTo({
              url: '../regist/regist'
            })
          }
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }

    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
