//home.js
//获取应用实例
const app = getApp()

Page({
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