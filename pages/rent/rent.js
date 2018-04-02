// pages/tingche/tingche.js
const app = getApp()
const RENT_REQUEST = getApp().globalData.RENT_REQUEST
const RENT_GRAB = getApp().globalData.RENT_GRAB
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  rent:function(){
    var that = this;
    wx.request({
      url: RENT_GRAB,
      method: 'GET',
      success: function (res) {
        that.setData({
          parkArea: res.data.result[0].parkArea,
          parkBuild: res.data.result[0].parkBuild,
          parkNum: res.data.result[0].parkNum,
          orderDate: res.data.result[0].orderDate,
          price: res.data.result[0].price
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
    wx.request({
      url: RENT_REQUEST,
      method: 'GET',
      success: (res) => {
        this.setData({
          parkArea: res.data.result[0].parkArea,
          parkBuild: res.data.result[0].parkBuild,
          parkNum: res.data.result[0].parkNum,
          orderDate: res.data.result[0].orderDate,
          price: res.data.result[0].price
        })
      }
    })
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