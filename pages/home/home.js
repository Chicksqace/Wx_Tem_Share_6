import { Home } from "home-model";
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var home = new Home();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: {},
    list_j: {},
    list_t: {},
    list_h: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //定位用户城市
    if (app.globalData.cityName == "请选择") {
      this._getUserPosition();
    }
    else {
      this.setData({ cityName: app.globalData.cityName })
    }
    //初始化
    this.getInitData();
  },

  //获取初始数据
  getInitData: function () {
    let data = {},
      list_j = {},
      list_t = {},
      list_h = {},
      list = app.globalData.home_list;
    for (let i = 0; i < list.length; i++) {
      if (list[i].flag == 'j') {
        list_j = list[i].list;
      }
      if (list[i].flag == 't') {
        list_t = list[i].list;
      }
      if (list[i].flag == 'h') {
        list_h = list[i].list;
      }
    }
    data = {
      category: app.globalData.categorys,
      list_j: list_j,
      list_t: list_t,
      list_h: list_h
    }
    home.setProjectData(data, this);
  },

  //跳转列表
  goToList: function (event) {
    let id = event.currentTarget.dataset.cat_id;
    //分类缓存
    app.globalData.category_select = id;
    wx.switchTab({
      url: '/pages/category/category',
      complete: (res) => { },
      fail: (res) => { console.log(res) },
      success: (res) => {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      },
    })
  },

  //跳转详情页
  goodsInfo:function(event){
    wx.navigateTo({
      url: '/pages/detail/detail?id='+event.currentTarget.dataset.goods_id,
    })
  },

  //获取用户定位
  _getUserPosition: function () {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        that.__getUserCity();
      },
      fail: function () {
        that.__failPosition();
      }
    })
  },
  //获取城市名称
  __getUserCity: function () {
    // 实例化API核心类
    var qqmapsdk = new QQMapWX({ key: home.mapkey });
    var that = this;
    //地址逆解析
    qqmapsdk.reverseGeocoder({
      success: function (res) {
        //设置城市名称
        that.setData({
          cityName: res.result.address_component.city
        });
      },
      fail: function (res) {
        that.__failPosition();
      }
    })
  },
  //调取定位失败
  __failPosition: function () {
    var params = {
      title: "调取位置失败，请手动定位",
    }
    home.toast(params);
    this.setData({
      cityName: "请选择"
    });
  }

})