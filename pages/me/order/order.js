// pages/me/order/order.js
const app = getApp()
const ORDER_REQUEST = getApp().globalData.ORDER_REQUEST
var id = wx.getStorageSync('ID')
var orderNote 

Page({
   
  /**
   * 页面的初始数据
   */
  data: {
    
   orderNote:true,
   item: [{
      rentId: '',
      tenamtId:'',
      parkArea: '',
      parkBuild:'',
      parkNum:'',
      releaseDate:'',
      confirmDate:'',
      orderDate:'',
      price: '',
      orderState:'',
      oederId: ''
    }]  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id=1
    wx.request({
      url: ORDER_REQUEST+id,
      method: 'GET',
    
      success: function (res) {
       // console.log("return order:"+res.data)
        if (res.data===null){
          console.log("no data")
          orderNote=false
        };

        that.setData({
          item:res.data,
      /*
          rentId: res.data.rentId,
          tenamtId: res.data.tenamtId,
          parkArea: res.data.parkArea,
          parkBuild: res.data.parkBuild,
          parkNum: res.data.parkNum,
          releaseDate: res.data.item.releaseDate,
          confirmDate: res.data.confirmDate,
          orderDate: res.data.orderDate,
          price: res.data.price,
          orderType: res.data.orderType,
          orderState: res.data.orderState,
          oederId: res.data.oederId   */
        })
   
      }
    })
  },
  editOrder: function () {
    wx.navigateTo({
      url: '../order/editOrder/editOrder'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})