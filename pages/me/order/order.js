// pages/me/order/order.js
const app = getApp()
const ORDER_REQUEST = getApp().globalData.ORDER_REQUEST
const ORDER_DELETE = getApp().globalData.ORDER_DELETE
var idI = wx.getStorageSync('ID')
var orderNote = true
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
  detail: function (e) {
    //let item = event.target.dataset.source;
    wx.navigateTo({
      url: '../order/detail/detail?id=' + e.currentTarget.dataset.index
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    var that = this;
    idI = wx.getStorageSync('ID')
    that.setData({
      idI: idI,
    })
    console.log("orderIdRe"+idI)
   // var id=1

    wx.request({
      url: ORDER_REQUEST+idI,
      method: 'GET',
    
      success: function (res) {
        item = res.data
        for (var k in item) {
          item[k].orderDate = item[k].orderDate.substring(0, 10)
        }
       // console.log("return order:"+res.data)
        if (item[0] == null){
          console.log("no data")
          that.setData({
            orderNote:false
          })
        
        } else {
          that.setData({
            item:item,
            orderNote:true
        })
        }
   
      }
    })

    //加载提示框
    wx.showLoading({
      title: 'loading',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
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
    // var formData = e.detail.value;
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
        console.log(res.data);
        this.setData({
          modalHidden: true,
          toast1Hidden: false,
          notice_str: '提交成功'
        });
        wx.navigateTo({
          url: '../order/order'
        })

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
  deleteOrder: function (event) {
    let item = event.target.dataset.source;
    wx.setStorageSync('ORDERID', item.orderId)
    this.modalTap();
  },
  editOrder: function (event) {
    let item = event.target.dataset.source;
    wx.navigateTo({
      url: '../order/editOrder/editOrder?id=' + item.orderId
    })
  },

})