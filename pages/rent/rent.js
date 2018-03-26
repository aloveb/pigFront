// pages/tingche/tingche.js
const app = getApp()
const RENT_REQUEST = getApp().globalData.RENT_REQUEST
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:[
      {
      parkArea: 'E',
      parkBuild: 7,
      parkNum: 125,
      orderDate: '2018-3-21',
      price: 5
      },
      {
        parkArea: 'E',
        parkBuild: 7,
        parkNum: 127,
        orderDate: '2018-3-21',
        price: 5
      },
      {
        parkArea: 'E',
        parkBuild: 7,
        parkNum: 129,
        orderDate: '2018-3-21',
        price: 5
      },
      {
        parkArea: 'E',
        parkBuild: 7,
        parkNum: 141,
        orderDate: '2018-3-21',
        price: 5
      },     
     {
      parkArea: 'E',
      parkBuild: 7,
      parkNum: 121,
      orderDate: '2018-3-22',
      price: 5
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: RENT_REQUEST,
      method:'GET',
      success: function(res){
        that.setData({
          parkArea: res.data.result[0].parkArea,
          parkBuild: res.data.result[0].parkBuild,
          parkNum: res.data.result[0].parkNum,
          orderDate: res.data.result[0].orderDate,
          price:res.data.result[0].price
        })
      }
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