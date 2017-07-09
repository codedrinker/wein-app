//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  toast: {
    success: function () {
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      })
    },
    failure : function(){
      wx.showToast({
        title: '失败',
        icon: 'success',
        duration: 2000
      })
    }
  },
  dialog: function (message) {
    wx.showModal({
      title: '提示',
      content: message,
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  getUserInfo:function(cb){
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo){
      typeof cb == "function" && cb(userInfo)
    }else{
      wx.login({
        success: function (res) {
          if(res.code){
            wx.getUserInfo({
              success: function (res) {
                var userInfo = res.userInfo;
                userInfo.code = res.code;
                wx.setStorageSync("userInfo",userInfo);
                typeof cb == "function" && cb(userInfo)
              }
            });
            wx.request({
              url:"https://wechat-wein.herokuapp.com/authorization",
              data: {
                code: res.code
              },
              method:"get",
               header: {
                'content-type': 'application/json'
              },
              success(codeRes){
                var userInfo = wx.getStorageSync('userInfo');
                if (userInfo){
                  userInfo.id = codeRes.data.data.openid;
                }else {
                  userInfo = {
                    id : codeRes.data.data.openid
                  };
                }
                wx.setStorageSync("userInfo", userInfo);
              }
            });
          }
        }
      })
    }
  }
})