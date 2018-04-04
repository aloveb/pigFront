// pages/publish/orderInfor/Add.js
var util = require('../../../utils/util.js'); 
const app = getApp();
const PUB_POST = getApp().globalData.PUB_POST
var rentId = wx.getStorageSync('ID')
var tenatId
var parkArea
var parkBuild
var parkNum
var price
var orderDate
var chargeHidden1=false
var chargeHidden2 = true
var dateValueC

Page({
  data: {
    // 
   // dateValue: '2018-03-29',
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    notice_str: '',
    chargeHidden1: false,
    chargeHidden2: true,

  },

  onShow: function () {
    // 调用函数时，传入new Date()参数，返回值是日期和时间 
    var dateValue 
    dateValueC = util.formatTime(new Date());
    dateValueC = dateValueC.substring(0,10)
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      dateValue: dateValueC
    });
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
    var that=this
    rentId=wx.getStorageSync('ID')
    that.setData({
      rentId: rentId
    })
    wx.request({
      url: PUB_POST,
      dataType: 'json',
      data: JSON.stringify({

        rentId,
        tenatId: null,
        orderDate,
        parkArea,
        parkBuild,
        parkNum,
        price

      }),

      method: 'POST',
      success: (res) => {
        console.log(res.data);
        wx.navigateTo({
          url: '../../publish/publish',
        })

      }
    })
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '提交成功'
    });
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
      dateValue:dateValueC
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
    if(chargeHidden2){
      console.log("Charge")
      if (e.detail.value.price){
      price = e.detail.value.price;
      }else{
      price = 5
      }
    }else{
      price = 0;
      console.log("No Charge")
    }
   
    var that = this;
    that.modalTap();

    
  },
  formReset: function () {
    console.log('reset happened');
    this.modalTap2();
  },
  changeSwitch: function(e){
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