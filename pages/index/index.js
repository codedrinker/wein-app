//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Welcome',
    items: [
      { name: 'food', value: '吃饭', checked: 'true' },
      { name: 'ball', value: '约球'},
      { name: 'ktv', value: 'K歌' },
      { name: 'trip', value: '出游' }
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
    wx.request({
      url: "https://wechat-wein.herokuapp.com/activity/create",
      data: {
        activity: {
            kind : that.data.kind,
            title : that.data.title,
            description : that.data.description,
            date:that.data.date,
            time:that.data.time,
            location:that.data.location,
            user: that.data.user
        }
      },
      method: "post",
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res);
      }
    })
  },
  onLoad: function () {
    var that = this
    app.getUserInfo(function (user){
      that.setData({
        user:user
      })
    })
  }
})
