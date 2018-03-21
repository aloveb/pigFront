// pages/publish/orderInfor/Add.js
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
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '提交成功'
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
    console.log(e.detail.value);
    var that = this;
    var formData = e.detail.value;
    wx.request({
      url: 'https://',
      data: formData,
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        that.modalTap();
      }
    })
  },
  formReset: function () {
    console.log('reset happened');
    this.modalTap2();
  }
})