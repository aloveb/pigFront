//chuzu.js
//获取应用实例
const app = getApp()
const ORDER_REQUEST = getApp().globalData.ORDER_REQUEST
const ORDER_DELETE = getApp().globalData.ORDER_DELETE
const CHECK_USER = getApp().globalData.CHECK_USER
var id
var orderNote 
var item
var orderId
Page({

  data: {

    orderNote: false,
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    notice_str: '',
    item: [{
      orderId:'',
      rentId: '',
      tenamtId: '',
      parkArea: '',
      parkBuild: '',
      parkNum: '',
      releaseDate: '',
      confirmDate: '',
      orderDate: '',
      price: '',
      orderState: ''
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {

   //checkId
    var openId = wx.getStorageSync('OPENID')
    wx.request({
      url: CHECK_USER + openId,
      success: (res) => {
        //返回
        console.log("check2:" + CHECK_USER + openId)

        if (res.data.id == undefined) {
          //check为null时，直接跳转到页
          console.log("新用户")
          wx.setStorageSync('OPENID', openId)
          console.log('OPENID:' + wx.getStorageSync('OPENID'))
          wx.navigateTo({
            url: '../regist/regist'
          })
        }
        else {
          //check为false时提示用户是否进行注册，跳转到注册页面
          console.log("已注册rent id:" + res.data.id)
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

  //load页面
    var that = this;
    id = wx.getStorageSync('ID')
    that.setData({
      id: id

    })
    wx.request({
      url: ORDER_REQUEST + id,
      method: 'GET',


      success: function (res) {
        // console.log("return order:"+res.data)
        item = res.data
        for (var k in item) {
          item[k].orderDate = item[k].orderDate.substring(0, 10)
        }

        //console.log("resDataItem:"+item[0].orderId)
        if (res.data) {
          console.log("have order")
          orderNote = true
          wx.setStorageSync('PARKAREA', item[0].parkArea)
          wx.setStorageSync('PARKBUILD', item[0].parkBuild)
          wx.setStorageSync('PARKNUM', item[0].parkNum)
          that.setData({
            item: res.data,
            orderNote:orderNote,
          })
        }


      }
    })
  },

  //事件处理函数
  Add: function () {
    wx.navigateTo({
      url: '../publish/orderInfor/Add'
    })
  },
  detail: function (e) {
    //let item = event.target.dataset.source;
    wx.navigateTo({
      url: '../me/order/detail/detail?id=' + e.currentTarget.dataset.index
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
    console.log('deleteId:'+orderId)
    wx.request({
      url: ORDER_DELETE,
      header: {
          'content-type': 'application/x-www-form-urlencoded '
      }, 
      data:({
        orderId,
      }),
      method:'PUT',
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
  editOrder: function (event) {
    let item = event.target.dataset.source;
    wx.navigateTo({
      url: '../me/order/editOrder/editOrder?id=' + item.orderId
    })
  },
  deleteOrder: function (event) {
    let item = event.target.dataset.source;

    wx.setStorageSync('ORDERID', item.orderId)
    this.modalTap();
  }

})