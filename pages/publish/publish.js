//chuzu.js
//获取应用实例
const app = getApp()
const ORDER_REQUEST = getApp().globalData.ORDER_REQUEST
const ORDER_DELETE = getApp().globalData.ORDER_DELETE
var id = wx.getStorageSync('ID')
var orderNote 
Page({

  data: {

    orderNote: true,
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    notice_str: '',
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
    that.setData({
      id: wx.getStorageSync('ID')
    })
 //   var id = 1
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
  confirm_one: function (e) {
    console.log(e);
    // var formData = e.detail.value;
    wx.request({
      url: ORDER_DELETE,
      data:({
        orderId: 20,
      }),
      success: (res) => {
        console.log(res.data);
        this.setData({
          modalHidden: true,
          toast1Hidden: false,
          notice_str: '提交成功'
        });
        wx.navigateTo({
          url: '../publish/publish'
        })

      },
      //没有正常弹出
      fail: function () {  
        console.log(res.data);
        this.setData({
          modalHidden: true,
          toast1Hidden: false,
          notice_str:'请求失败'
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
  deleteOrder: function (e) {
    var that = this;
    this.modalTap();

  },

})