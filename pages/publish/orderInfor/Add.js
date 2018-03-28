// pages/publish/orderInfor/Add.js
const app = getApp();
const PUB_POST = getApp().globalData.PUB_POST
Page({
  data: {
    // 
    dateValue: '2018-03-19',
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    notice_str: ''
  },
  datePickerBindchange: function (e) {
    this.setData({
      dateValue: e.detail.value
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
    console.log(e);
   // var formData = e.detail.value;
    wx.request({
      url: PUB_POST,
      dataType: 'json',
      data: JSON.stringify({

        rentId: 1,
        tenatId: null,
        parkArea: "E",
        parkBuild: 6,
        parkNum: "152",
        price: 20

      }),

      method: 'POST',
      success: (res) => {
        console.log(res.data);

      }
    })
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '提交成功'
    });
    wx.navigateTo({
      url: '../../publish/publish',
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
  //  console.log(e.detail.value);
    var that = this;
    that.modalTap();
    
  },
  formReset: function () {
    console.log('reset happened');
    this.modalTap2();
  }
})