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
  xhr: function (url,method,data,cb){
    this.getUserInfo(function (user) {
      if(data){
        data.uid = user.id;
      }else {
        data = {
          uid:user.id
        }
      }
      wx.request({
        url: url,
        data: data,
        method: method,
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          typeof cb == "function" && cb(res)
        }
      });
    });
  },
  obtainUserInfo: function (cb) {
    wx.login({
      success: function (codeRes) {
        if (codeRes.code) {
          console.log(codeRes.code);
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo;
              userInfo.code = codeRes.code;
              wx.setStorageSync("userInfo", userInfo);
              typeof cb == "function" && cb(userInfo)
            }
          });
          wx.request({
            url: "https://wechat-wein.herokuapp.com/authorization",
            data: {
              code: codeRes.code
            },
            method: "get",
            header: {
              'content-type': 'application/json'
            },
            success(successRes) {
              var userInfo = wx.getStorageSync('userInfo');
              if (userInfo) {
                userInfo.id = successRes.data.data.openid;
              } else {
                userInfo = {
                  id: successRes.data.data.openid
                };
              }
              wx.setStorageSync("userInfo", userInfo);
            }
          });
        }
      }
    });
  },
  getUserInfo:function(cb){
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo){
      if(!!userInfo.id){
        typeof cb == "function" && cb(userInfo)
      }else {
        this.obtainUserInfo(cb);
      }
    }else{
      this.obtainUserInfo(cb);
    }
  }
})