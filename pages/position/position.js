// pages/position/position.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: app.globalData.city
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.city)
  },

  //切换城市名称
  changeCity: function (event) {
    app.globalData.cityName = event.currentTarget.dataset.city
    wx.switchTab({
      url: '/pages/home/home',
      success: function (res) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      },
      fail: function (res) {
        console.log(res)
      }
    })

  }

  //获取用户城市名称
  // getCityName: function () {
  //   app.globalData.cityName = "呼和浩特";
  //   wx.switchTab({
  //     url: '/pages/home/home',
  //     success: function (res) {
  //       var page = getCurrentPages().pop();
  //       if (page == undefined || page == null) return;
  //       page.onLoad();
  //     },
  //     fail: function (res) {
  //       console.log(res)
  //     }
  //   })
  // }
})