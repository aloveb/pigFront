const app = getApp();
const PUB_EDIT = getApp().globalData.EDIT
var rentId
var tenatId
var parkArea
var parkBuild
var parkNum
var price
var orderDate
var chargeHidden1 = false
var chargeHidden2 = true
Page({
  data: {
    // 
    dateValue: '2018-03-29',
    parkArea: 'A',
    parkBuild: '7',
    parkNum: '123',
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    notice_str: '',
    chargeHidden1: false,
    chargeHidden2: true,
  },
  edit: function(){
    wx.navigateTo({
      url: '../../order/editOrder/editOrder',
    })
  },
  delete: function () {
    //弹出删除框 提交信息 返回订单列表页面
    wx.navigateTo({
      url: '',
    })
  },

})