var app = getApp()
Page({
  data: {

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
      wx.request({
        url: "https://wechat-wein.herokuapp.com/activity/show",
        data: {
          id: options.id
        },
        method: "get",
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          if(res.statusCode == 200){
            that.data= res.data.data;
            console.log(that.data);
          }else {
            app.toast.failure();
            wx.navigateBack();
          }
        }
      });
    }else {
      app.toast.failure();
      wx.navigateBack();
    }
  }
})
