// pages/notification/notification.js
const app = getApp()
const ORDER_REQUEST = getApp().globalData.ORDER_REQUEST
var idI = wx.getStorageSync('ID')
var item
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: [{
      rentId: '',
      tenamtId: '',
      parkArea: '',
      parkBuild: '',
      parkNum: '',
      releaseDate: '',
      confirmDate: '',
      orderDate: '',
      price: '',
      orderState: '',
      oederId: ''
    }]
  },

  onShow: function (options) {
   
    var that = this;
    idI = wx.getStorageSync('ID')
    that.setData({
      idI: idI,
    })
    console.log("orderIdRe" + idI)
    // var id=1
    wx.request({
      url: ORDER_REQUEST + idI,
      method: 'GET',

      success: function (res) {
        item = res.data
        for (var k in item) {
          if(item[k].orderState==2){
           item[k].confirmDate = item[k].confirmDate.substring(0, 10)
          }
        }
        // console.log("return order:"+res.data)
        if (item[0] == null) {
          console.log("no data")
    

        } else {
          that.setData({
            item: item,

          })
        }

      }
    })
  },


})