//home.js
//获取应用实例
const app = getApp()
const CHECK_USER = getApp().globalData.CHECK_USER
const GET_OPENID = getApp().globalData.GET_OPENID
const CHECK_NOTE = getApp().globalData.CHECK_NOTE
const NOTE_UPDATE = getApp().globalData.NOTE_UPDATE
const APP_ID = 'wxcc704198b07ae345';//输入小程序appid  
const APP_SECRET = '623f8a05e0a330bb9f6dfc21f46943ad';//输入小程序app_secret  
var openId;

Page({
  data: {
    openId,
  },
  
  onShow: function () {

    //授权
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
     //   openId:openId
      })
    } else if (this.data.canIUse) {
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

    //获取openid并检查用户是否注册

    wx.login({
      //  if(canIUse){
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) { //  第一步： 获取code
          //发起网络请求
          console.log("code:" + res.code)
          //console.log(code)
          var CODE = res.code
          console.log("code: "+CODE)
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: APP_ID,
              secret: APP_SECRET,
              js_code: CODE,
              grant_type: 'authorization_code'
            },
            method: 'GET',
            success: function (res) {
              //  console.log("openId:"+ res.data.openid)
              /*  try {
                  wx.setStorageSync('OPENID',res.data.openid)
                } catch (e) {
                }  */

              openId = res.data.openid
              console.log("openid：" + openId)

              wx.request({
                url: CHECK_USER + openId,
                success: (res) => {
                  //返回
                  console.log("check2:" + CHECK_USER + openId)

                  if (res.data.id == undefined) {
                    //check为null时，直接跳转
                    console.log("新用户") 
                      wx.setStorageSync('OPENID', openId)
                    console.log('OPENID:' + wx.getStorageSync('OPENID'))
                    wx.navigateTo({
                      url: '../regist/regist'
                    })
                  }
                  else {
                   
                    console.log("已注册 id:" + res.data.id)
                    //  提示信息判断
                    wx.request({
                      url: CHECK_NOTE + res.data.id,
                      success: (e) => {
                        console.log(e.data)
                        if(!e.data){
                          console.log("haven't new note")
                        }else{
                          console.log("new note")
                        }
                      }
                    })
                    try {
                      wx.setStorageSync('ID', res.data.id)
                      wx.setStorageSync('OPENID', res.data.openId)
                      wx.setStorageSync('USERNAME', res.data.userName)
                      wx.setStorageSync('CARDID', res.data.cardId)
                      wx.setStorageSync('PLATENUM', res.data.plateNum)
                      wx.setStorageSync('PURSE', res.data.purse)
                    } catch (e) {
                    }  
                  //  wx.navigateTo({
                  //    url: '../home/home'
                  //  })
                  }

                }
              })

            }

          })

        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
      //    },
    }) 



  },

  //事件处理函数
  me: function () {
    wx.navigateTo({
      url: '../me/me'
    })    
  },
  note: function () {
    wx.navigateTo({
      url: '../notification/notification'
    })
    wx.request({
      url: NOTE_UPDATE + wx.getStorageSync('ID'),
    })
  },
  bindViewTap1: function () {
    wx.navigateTo({
      url: '../publish/publish'
    })
  },
  bindViewTap2: function () {
    wx.navigateTo({
      url: '../rent/rent'
    })     
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})