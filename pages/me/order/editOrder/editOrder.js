// pages/me/order/editOrder/editOrder.js
const app = getApp();
const PUB_EDIT = getApp().globalData.EDIT
var rentId
var tenatId
var parkArea
var parkBuild
var parkNum
var price
var orderDate
var check=false

Page({
  data: {
    // 
    dateValue: '2018-03-29',
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    notice_str: '',

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
    // var formData = e.detail.value;
    wx.request({
      url: PUB_EDIT,
      dataType: 'json',
      data: JSON.stringify({

        rentId: 1,
        tenatId: null,
        parkArea,
        parkBuild,
        parkNum,
        price,
        releaseDate:'',
        confirmDate:'',
        orderDate,
        orderState:2,
        orderId:2

      }),
      success: (res) => {
        console.log('editOrderRes:'+res.data);

      }
    })
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '提交成功'
    });
    wx.navigateTo({
      url: '../../publish/publish',
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
  formSubmit: function (e) {
    console.log(e.detail.value);
    parkArea = e.detail.value.parkArea;
    parkBuild = e.detail.value.parkBuild;
    parkNum = e.detail.value.parkNum;
    orderDate = e.detail.value.orderDate;
    console.log("switch:"+check)
    if(charge){
      price=0
    }else{
      price = e.detail.value.price;
    }
    var that = this;
    that.modalTap();


  },
  formReset: function () {
    console.log('reset happened');
    this.modalTap2();
  },
  changeSwitch: function(){
    check = !check;
    console.log("check:"+check)
  }
})