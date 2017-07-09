var app = getApp()
Page({
  data: {

  }, 
  onShareAppMessage: function (res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '我发起了一个局，就差你，来么？',
      path: '/page/activity/show?id=' + that.data.id,
      success: function (res) {
        app.toast.success();
      },
      fail: function (res) {
        app.toast.failure();
      }
    }
  },
  locationTap: function () {
    var that = this;
    wx.openLocation({
      latitude: that.data.location.latitude,
      longitude: that.data.location.longitude,
      name: that.data.location.name,
      address: that.data.location.address,
      scale: 28
    });
  },
  attendTap: function () {
    var that = this;
    app.getUserInfo(function (user) {
      wx.request({
        url: "https://wechat-wein.herokuapp.com/activity/attend",
        data: {
          userId: that.data.user.id,
          activityId: that.data.id,
          user: that.data.user
        },
        method: "post",
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          app.toast.success();
          wx.navigateTo({
            url: 'list'
          })
        }
      })
    })
  },
  onLoad: function (options) {
    var that = this;
    if(options.id){
      app.xhr("https://wechat-wein.herokuapp.com/activity/show",
      "get",
      {
        id: options.id
      },
      function(res){
        if (res.statusCode == 200) {
          if (res.data.data.kind == 0) {
            res.data.data.kindName = "吃饭";
          } else if (res.data.data.kind == 1) {
            res.data.data.kindName = "约球";
          } else if (res.data.data.kind == 2) {
            res.data.data.kindName = "K歌";
          } else {
            res.data.data.kindName = "出游";
          }
          that.setData(res.data.data);
          app.getUserInfo(function (user) {
            if (user.id != res.data.data.user.id) {
              this.setData({
                canAttend: true
              });
              this.setData({
                currentUser: user
              });
            }
          });
        } else {
          app.toast.failure();
          wx.navigateBack();
        }
      }
      );
    }else {
      app.toast.failure();
      wx.navigateBack();
    }
  }
})
