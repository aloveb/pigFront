// pages/regist/regist.js
const app = getApp()
const REGIST = getApp().globalData.REGIST
var cardId=''
var plateNum=''
var openId //= wx.getStorageSync('OPENID')

Page({
  data: {
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    notice_str: '',
    openId//: wx.getStorageSync('OPENID')
  },
  //事件处理函数

  toast1Change: function (e) {
    this.setData({ toast1Hidden: true });
  },
  //弹出确认框
  modalTap: function (e) {
    this.setData({
      modalHidden: false
    })
  },
  confirm_one: function (e) {
    console.log("registLogId:"+openId);
    wx.request({
      url: REGIST,
      dataType:'json',
      data: JSON.stringify({
        userName: "lulu",
        cardId,
        openId,
        plateNum
      }),
      method:'POST',
      success: (res) => {
        console.log(res.data);//返回值为true则进入home页面
        if(res.data.id){
          this.setData({
            modalHidden: true,
            toast1Hidden: false,
            notice_str: '注册成功'
          });
          setTimeout(function () {
            wx.navigateTo({
              url: '../home/home'
            })
          }, 2000
          )
    
        } else {
          this.setData({
            modalHidden: true,
            toast1Hidden: false,
            notice_str: '注册失败'
          });
          setTimeout(function () {
            modalHidden: false
            toast1Hidden: true
          }, 2000
          )
        }
      }
    })
    //自动进入到home页面 仅调试用
   // wx.navigateTo({
   //   url: '../home/home'
 //   })

  },
  cancel_one: function (e) {
    console.log(e);
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '取消成功'
    });
  },
  //弹出提示框  
  modalTap2: function (e) {
    this.setData({
      modalHidden2: false
    })
  },
  modalChange2: function (e) {
    this.setData({
      modalHidden2: true
    })
  },
  formSubmit: function (e) {
    console.log(e.detail.value);
    cardId = e.detail.value.carID;
    plateNum = e.detail.value.plateID;
    openId = wx.getStorageSync('OPENID')
    var that = this;
    that.modalTap();
  },
  formReset: function () {
    wx.navigateTo({
      url: '../home/home'
    })
  }
})