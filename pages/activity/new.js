//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Welcome',
    items: [
      { name: 0, value: '吃饭', checked: 'true' },
      { name: 1, value: '约球'},
      { name: 2, value: 'K歌' },
      { name: 3, value: '出游' }
    ],
    userInfo: {}
  },
  titleTap: function (e) {
    this.setData({
      title: e.detail.value
    });
  },
  descriptionTap: function (e) {
    this.setData({
      description: e.detail.value
    });
  },
  radioTap: function (e) {
    this.setData({
      kind: e.detail.value
    });
  },
  dateTap: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  timeTap: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  locationTap: function () {
    var that = this;
    wx.chooseLocation({
      type: 'wgs84',
      success: function (res) {
        that.setData({
          location:{
            latitude: res.latitude,
            longitude: res.longitude,
            name: res.name,
            address: res.address
          }
        });
      }
    });
  }, 
  buttonTap: function(){
    var that = this;
    if (!that.data.title) {
      app.dialog("请输入主题");
      return;
    }

    if (!that.data.date) {
      app.dialog("请选择日期");
      return;
    }

    if (!that.data.time) {
      app.dialog("请选择时间");
      return;
    }

    if (!that.data.title) {
      app.dialog("请输入主题");
      return;
    }

    if (!that.data.location) {
      app.dialog("请选择位置");
      return;
    }

    app.getUserInfo(function (user) {
      wx.request({
        url: "https://wechat-wein.herokuapp.com/activity/new",
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
          console.log(res);
          if(res.statusCode == 200){
            app.toast.success();
            wx.navigateTo({
              url: 'show?id=' + res.data.data.id
            })
          }else {
            app.toast.failure();
          }
        }
      })
    })
  },
  onLoad: function () {
    var that = this;
    app.getUserInfo(function (user){
      that.setData({
        user:user
      })
    })
  }
})
