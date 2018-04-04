const app = getApp();
const PUB_EDIT = getApp().globalData.EDIT
const ORDER_DETAIL = getApp().globalData.ORDER;
const ORDER_DELETE = getApp().globalData.ORDER_DELETE;
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
   // dateValue: '2018-03-29',
  //  parkArea,
   // parkBuild,
   // parkNum,
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    notice_str: '',
    chargeHidden1: false,
    chargeHidden2: true,
  },
  onShow: function () {
    let id = this.options.id;
  
      wx.request({
        url: ORDER_DETAIL + id,
        method: 'GET',
        success: (res) => {
          res.data.orderDate = res.data.orderDate.substring(0, 10)
          this.setData({
            order: res.data
          });
          console.log(res.data);
        }
      })
  },
  edit: function(){
    let id = this.options.id;
    wx.navigateTo({
      url: '../../order/editOrder/editOrder?id=' + id
    })
  },

  //删除订单 弹出确认框后提交
  toast1Change: function (e) {
    this.setData({ toast1Hidden: true });
  },
  //弹出确认框
  modalTap: function (e) {
    this.setData({
      modalHidden: false
    })
  },
  confirm_one: function (event) {
    var orderId
    orderId = wx.getStorageSync('ORDERID')
    console.log('deleteId:' + orderId)
    wx.request({
      url: ORDER_DELETE,
      header: {
        'content-type': 'application/x-www-form-urlencoded '
      },
      data: ({
        orderId,
      }),
      method: 'PUT',
      success: (res) => {
      //  console.log(res.data);
        this.setData({
          modalHidden: true,
          toast1Hidden: false,
          notice_str: '提交成功'
        });
        wx.navigateBack()
      },
      //没有正常弹出
      fail: function () {
        console.log(res.data);
        this.setData({
          modalHidden: true,
          toast1Hidden: false,
          notice_str: '请求失败'
        });
      }
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
  delete: function () {
    //弹出删除框 提交信息 返回订单列表页面
    let id = this.options.id;
    console.log("deleteidDetail:"+id)
    wx.setStorageSync('ORDERID', id)
    this.modalTap();
  },

})