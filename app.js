//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      wx.login({
        success: function (res) {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          });
          if(res.code){
            wx.request({               url:"https://wechat-wein.herokuapp.com/authorization",
              data: {
                code: res.code
              },
              method:"get",
               header: {
                'content-type': 'application/json'
              },
              success(codeRes){
                if (!!that.globalData.userInfo){
                  that.globalData.userInfo.id = codeRes.data.data.openid;
                }else {
                  that.globalData.userInfo = {
                    id : codeRes.data.data.openid
                  };
                }
              }
            });
          }
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})