// pages/tingche/tingche.js
const app = getApp()
const ORDER_FIND = getApp().globalData.ORDER_FIND
const CHECK_USER = getApp().globalData.CHECK_USER
const RENT_GRAB = getApp().globalData.RENT_GRAB
var item
var id
var orderNote = true
Page({

  /**
   * 页面的初始数据
   */
  data: {

    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    orderNote: true,
    notice_str: '',
    item:[{ 
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
    }, 500)

    //load页面
    var that = this;
    id = wx.getStorageSync('ID')
    console.log("rentId:"+id)
    that.setData({
      id: id
    })
    //   var id = 1
    wx.request({
      url: ORDER_FIND + id,
      method: 'GET',

      success: function (res) {
        // console.log("return order:"+res.data)
        item = res.data
        for (var k in item) {
          item[k].orderDate = item[k].orderDate.substring(0, 10)
        }
        //console.log("resDataItem:"+item[0].orderId)
        if (item[0] != null) {
          console.log(item)
          console.log("have order")
          
          that.setData({
            item: res.data,
            orderNote:true
          })
        }else{
          that.setData({
            orderNote: false,

          })
          console.log("noteRent:"+orderNote)
        }


      }
    })
  },

  //抢订单 弹出确认框后提交
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
    console.log('rentId:' + orderId)
    wx.request({
      url: RENT_GRAB,
      header: {
        'content-type': 'application/x-www-form-urlencoded '
      },
      data: {
        orderId: orderId,
        tenantId: id
      },
      method: 'PUT',
      success: (res) => {
        console.log(res.data);
        if(!res.data.tenantId){
          this.setData({
            modalHidden: true,
            toast1Hidden: false,
            notice_str: '余额不足'
          });
        }else{
        
          this.setData({
            modalHidden: true,
            toast1Hidden: false,
            notice_str: '租订成功'
          });
          setTimeout(function () {
            wx.navigateTo({
              url: '../me/order/detail/detail?id='+orderId,
            })
          }, 1000
          )
        }
      },
      
      //没有正常弹出
      fail: function () {
        console.log(res.data);
        this.setData({
          modalHidden: true,
          toast1Hidden: false,
          notice_str: '租用失败'
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

  rent:function(event){
    let item = event.target.dataset.source;
    wx.setStorageSync('ORDERID', item.orderId)
    this.modalTap();  
  },

})