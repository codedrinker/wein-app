var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  showActivity: function (event) {
    if (event.currentTarget.id) {
      wx.navigateTo({
        url: 'show?id=' + event.currentTarget.id
      });
    }
  },
  onShow: function () {
    var that = this;
    if(that.data.id){
      this.load(that.data.id);
    }
  },
  load: function (id) {
    wx.showLoading({
      title: '正在加载',
    });
    var that = this;
    app.xhr("https://wechat-wein.herokuapp.com/activities/participators",
      "get", {
        id: id
      },
      function (res) {
        console.log(res);
        wx.hideLoading();
        if (res.statusCode == 200) {
          that.setData({
            items: res.data.data
          });
        }
      }
    )
  },
  onLoad: function (options) {
    this.setData({
      id:options.id
    });
    this.load(options.id);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    if(!that.data.id){
      return;
    }
    wx.showLoading({
      title: '正在加载',
    });
    that.setData({ items: [] });
    app.xhr("https://wechat-wein.herokuapp.com/activities/participators",
      "get", { id: that.data.id},
      function (res) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        if (res.statusCode == 200) {
          that.setData({
            items: res.data.data
          });
        }
      }
    )
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
})