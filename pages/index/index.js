//index.js
//获取应用实例
const app = getApp()
const CHECK_USER = getApp().globalData.CHECK_USER
const GET_OPENID = getApp().globalData.GET_OPENID

const APP_ID = 'wxcc704198b07ae345';//输入小程序appid  
const APP_SECRET = '623f8a05e0a330bb9f6dfc21f46943ad';//输入小程序app_secret  
var openId = getApp().globalData.openId//储存获取到openid  

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
          //console.log(code)
          var CODE = res.code
          console.log(CODE)
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: APP_ID,
              secret: APP_SECRET,
              js_code: CODE,
              grant_type: 'authorization_code'
            },
            method:'GET',
            success: function (res) {
              //返回
             // OPEN_ID = res.data.openid
              console.log("openId:"+ res.data.openid)
              openId=res.data.openid
              getApp().globalData.openId = res.data.openid
              console.log("global"+getApp().globalData.openId)
            }
          })
         
          wx.request({
            url: CHECK_USER+openId,
          //  data: {
            //  openId
          //  },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              //返回
              console.log("checkResult:"+res.data)
            }
          }) 
          if (res.data == null) {
            //check为false时提示用户是否进行注册，确认后跳转到注册页面
            wx.navigateTo({
              url: '../regist/regist'
            })
          }
          else if (res.data == true) {
            //check为false时提示用户是否进行注册，确认后跳转到注册页面
            wx.navigateTo({
              url: '../home/home'
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
