const app = getApp();
const EDIT_SUB = getApp().globalData.EDIT_SUB;

var cardId = wx.getStorageSync('CARDID');
var plateNum = wx.getStorageSync('PLATENUM');
Page({
  data: {
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    notice_str: '',
    cardId: '',
    plateNum: ''
  },
  //事件处理函数
  onShow: function () {
    cardId = wx.getStorageSync('CARDID');
    plateNum = wx.getStorageSync('PLATENUM');
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        cardId,
        plateNum
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          cardId,
          plateNum
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            cardId,
            plateNum
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
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
    wx.setStorageSync('CARDID', cardId);
    wx.setStorageSync('PLATENUM', plateNum);
    wx.request({
      url: EDIT_SUB,
      data: {
        id: wx.getStorageSync('ID'),
        userName: 'lulu',
        cardId,
        plateNum,
      },
      method:'PUT',
      success: (res) => {
        this.setData({
          modalHidden: true,
          toast1Hidden: false,
          notice_str: '提交成功'
        });
        wx.navigateBack({
          url: '../../information/information',
        })
      }
    });
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
    var that = this;
    that.modalTap();
    cardId = e.detail.value.carID;
    plateNum = e.detail.value.plateID;

  },
  formReset: function () {
    //console.log('reset happened');
    //this.modalTap2();
    wx.navigateBack({
      url: '../information'
    })
  }
})