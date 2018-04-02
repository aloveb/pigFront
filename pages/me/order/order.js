// pages/me/order/order.js
const app = getApp()
const ORDER_REQUEST = getApp().globalData.ORDER_REQUEST
const ORDER_DELETE = getApp().globalData.ORDER_DELETE
var id = wx.getStorageSync('ID')
var item
//var orderNote 

Page({
   
  /**
   * 页面的初始数据
   */
  data: {
    
   orderNote:true,
   toast1Hidden: true,
   modalHidden: true,
   modalHidden2: true,
   notice_str: '',
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
  detail: function () {
  //  console.log("orderIdTrans:" + item[0].orderId)
    wx.navigateTo({
      url: '../../me/order/detail/detail'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      id: wx.getStorageSync('ID')
    })
   // var id=1
    wx.request({
      url: ORDER_REQUEST+id,
      method: 'GET',
    
      success: function (res) {
       // console.log("return order:"+res.data)
        if (res.data===null){
          console.log("no data")
          that.setData({
            orderNote:false
          })
        
        } else {
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
   
      }
    })
  },
  editOrder: function () {
    wx.navigateTo({
      url: '../order/editOrder/editOrder'
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
      data: ({
        orderId: 2,
      }),
      success: (res) => {
        console.log(res.data);
        this.setData({
          modalHidden: true,
          toast1Hidden: false,
          notice_str: '提交成功'
        });
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
  deleteOrder: function (e) {
    var that = this;
    that.modalTap();
  },

})