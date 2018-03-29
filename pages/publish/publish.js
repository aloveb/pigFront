//chuzu.js
//获取应用实例
const app = getApp()
const ORDER_REQUEST = getApp().globalData.ORDER_REQUEST
var id = wx.getStorageSync('ID')
var orderNote 
Page({

  data: {

    orderNote: true,
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = 1
    wx.request({
      url: ORDER_REQUEST + id,
      method: 'GET',

      success: function (res) {
        // console.log("return order:"+res.data)
        if (res.data === null) {
          console.log("no data")
          orderNote = false
        };

        that.setData({
          item: res.data,
          /*
          [rentId]: res.data.rentId,
          [tenamtId]: res.data.tenamtId,
          [parkArea]: res.data.parkArea,
          [parkBuild]: res.data.parkBuild,
          [parkNum]: res.data.parkNum,
          [releaseDate]: res.data.item.releaseDate,
          [confirmDate]: res.data.confirmDate,
          [orderDate]: res.data.orderDate,
          [price]: res.data.price,
          [orderState]: res.data.orderState,
          [oederId]: res.data.oederId   */
        })

      }
    })
  },


  //事件处理函数
  Add: function () {
    wx.navigateTo({
      url: '../publish/orderInfor/Add'
    })
  },
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
  editOrder: function () {
    wx.navigateTo({
      url: '../me/order/editOrder/editOrder'
    })
  },
  
})