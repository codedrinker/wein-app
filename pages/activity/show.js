//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    location :{},
    user :{}
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
          kind: that.data.kind,
          title: that.data.title,
          description: that.data.description,
          date: that.data.date,
          time: that.data.time,
          location: that.data.location,
          user: user
        },
        method: "post",
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          app.toast.success();
          wx.navigateTo({
            url: 'show?id=123123'
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
            that.data = res.data.data;
            if (that.data.kind == 0) {
              that.data.kindName = "吃饭";
            } else if (that.data.kind == 1) {
              that.data.kindName =  "约球";
            } else if (that.data.kind == 2) {
              that.data.kindName =  "K歌";
            } else {
              that.data.kindName =  "出游";
            }
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
