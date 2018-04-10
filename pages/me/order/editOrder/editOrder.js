// pages/me/order/editOrder/editOrder.js
const app = getApp();

const PUB_EDIT = getApp().globalData.PUB_EDIT

const ORDER_DETAIL = getApp().globalData.ORDER;
var rentId
var tenatId
var parkArea
var parkBuild
var parkNum
var price
var orderDate
var chargeHidden1 = false
var chargeHidden2 = true
var orderD
var dateValueC
Page({
  data: {
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    notice_str: '',
    chargeHidden1: false,
    chargeHidden2: true,
  },
  onShow: function () {
    let id = this.options.id;
    chargeHidden1 = false
    chargeHidden2 = true
    var that = this
    if (id) {
      wx.request({
        url: ORDER_DETAIL + id,
        method: 'GET',
        success: (res) => {
          console.log(res.data)
          var dateValue = res.data.orderDate.substring(0,10)
          this.setData({
            order: res.data,
            dateValue:dateValue,
            dateValueC: dateValue
          });
          orderD = res.data
          console.log(orderD)
          that.setData({
            orderD:orderD,
           
          })
          console.log(orderD);
        }
      })
    }
  },
  datePickerBindchange: function (e) {
    this.setData({
      dateValue: e.detail.value
    })
  },
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
    let id = this.options.id;
    // var formData = e.detail.value;
    console.log(orderD.rentId)
    wx.request({
      url: PUB_EDIT,
      data:({

        rentId: orderD.rentId,
        tenatId: null,
        parkArea,
        parkBuild,
        parkNum,
        price,
        releaseDate: orderD.releaseDate,
        confirmDate: orderD.confirmDate,
        orderDate,
        orderState: orderD.orderState,
        orderId: id

      }),
      method:'PUT',
      success: (res) => {
        console.log(res.data);
        this.setData({
          modalHidden: true,
          toast1Hidden: false,
          notice_str: '提交成功'
        });
        setTimeout(function () {
          wx.navigateBack()   
        }, 1000
        ) 
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
      modalHidden2: false,
      dateValue: dateValueC
    })
  },
  modalChange2: function (e) {
    this.setData({
      modalHidden2: true
    })
  },
  formSubmit: function (e) {
    console.log(e.detail.value);
    parkArea = e.detail.value.parkArea;
    parkBuild = e.detail.value.parkBuild;
    parkNum = e.detail.value.parkNum;
    orderDate = e.detail.value.orderDate;
    if (!chargeHidden2) {
      console.log("Charge")
      if (orderD.price == 0) {
        price = e.detail.value.price;
        console.log("change chager")
      } else {
        price = 0
      }
    } else {//此处逻辑待验证 
      price = e.detail.value.price;
    }

    var that = this;
    that.modalTap();


  },
  formReset: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  changeSwitch: function (e) {
    // console.log('chargeHidden1' + chargeHidden)
    //  var chargeHidden
    chargeHidden1 = !chargeHidden1
    chargeHidden2 = !chargeHidden2
    console.log('chargeHidden1:' + chargeHidden1)
    console.log('chargeHidden2:' + chargeHidden2)
    this.setData({
      chargeHidden1: chargeHidden1,
      chargeHidden2: chargeHidden2
    })
    //console.log('chargeHidden2:' + chargeHidden)
  }
})