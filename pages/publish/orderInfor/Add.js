// pages/chuzu/cheweixinxi/Add.js
Page({
  data: {
    // text:"这是一个页面"
    dateValue: '2018-03-19'
  },
  datePickerBindchange: function (e) {
    this.setData({
      dateValue: e.detail.value
    })
  }
})