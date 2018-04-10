//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
   // var openId = wx.getStorageSync('OPENID')
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
       
      }
     
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    plateId: '',
    cardId: '',
    openId:'',
    CHECK_USER:'https://rooti347933trial.hanatrial.ondemand.com/user/checkuser?openId=',    //进入时check用户是否登陆
    GET_OPENID: 'https://api.weixin.qq.com/sns/jscode2session',  //从微信短获取openid （通）
    EDIT_SUB: 'https://rooti347933trial.hanatrial.ondemand.com/user/edit', //个人信息编辑
    ORDER_REQUEST: 'https://rooti347933trial.hanatrial.ondemand.com/order/getOrderList?id=', //请求订单信息(通) 自己的
    PURSE_REQUEST: 'https://rooti347933trial.hanatrial.ondemand.com/user/purse?id=',  //钱包余额
  //  INFOR_REQUEST: 'https://rooti347933trial.hanatrial.ondemand.com/user/regist/',  //查看用户信息
    NOTE_UPDATE: 'https://rooti347933trial.hanatrial.ondemand.com/order/freeNotification?id=',  //notification信息请求
    ORDER: 'https://rooti347933trial.hanatrial.ondemand.com/order/', 
    PUB_POST: 'https://rooti347933trial.hanatrial.ondemand.com/order/add',  //新订单信息提交
    PUB_EDIT: 'https://rooti347933trial.hanatrial.ondemand.com/order/edit', 
    ORDER: 'https://rooti347933trial.hanatrial.ondemand.com/order/', 
    ORDER_FIND: 'https://rooti347933trial.hanatrial.ondemand.com/order/findAvailableOrder?rentId=', 
    RENT_GRAB: 'https://rooti347933trial.hanatrial.ondemand.com/order/grabOrder',
    ORDER_DELETE: 'https://rooti347933trial.hanatrial.ondemand.com/order/cancelOrder', 
    REGIST: 'https://rooti347933trial.hanatrial.ondemand.com/user/register',  //注册
    CHECK_NOTE: 'https://rooti347933trial.hanatrial.ondemand.com/order/notification?id=',

  }
})