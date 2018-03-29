// pages/me/purse/purse.js
const app = getApp()
const PURSE_REQUEST = getApp().globalData.PURSE_REQUEST

//var purse = wx.getStorageSync('PURSE')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    purse:'',
    id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let id = wx.getStorageSync('ID')
    let purse = wx.getStorageSync('PURSE')
   // let purseI = wx.getStorageSync('PURSE');
  //  purse = wx.getStorageSync('PURSE')
    console.log("purseId:"+id)
    wx.request({
      url: PURSE_REQUEST+id,
      method: 'GET',
      success: (res) => {
        console.log("purseRes:"+res.data)
        that.setData({
          purse:res.data
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