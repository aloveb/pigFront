// pages/regist/regist.js
const app = getApp()
const REGIST = getApp().globalData.REGIST
Page({
  data: {
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    notice_str: ''
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
    console.log(e);
    wx.request({
      url: REGIST,
      data: {

        userName: "橘子",
        cardId: "456123",
        openId: getApp().globalData.openId,
        plateId: "川A12364"

      },
      method:'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);//返回值为true则进入home页面
        if(res.data==true){
          wx.navigateTo({
            url: '../home/home'
          })
        }
        else if(res.data==false){
          console.log("注册失败")
          wx.navigateTo({
            url: '../regist/regist'
          })
        }
      }
    })
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '提交成功'
    });
    //提交成功后进入home页面 需要后台验证用户信息
    wx.navigateTo({
      url: '../home/home'
    })

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
    console.log("registeroid:"+getApp().globalData.openId)
    var that = this;
    that.modalTap();
  },
  formReset: function () {
    console.log('reset happened');
    this.modalTap2();
  }
})