// pages/search/search.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list_j: {},
    list_show:"no",
    btn_text:"搜索",
    value:"",
    his_tags:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInitData()
  },

  //获取初始数据
  getInitData: function () {
    //模拟列表数据
    let list_j = {},
        list = app.globalData.home_list;
    for (let i = 0; i < list.length; i++) {
      if (list[i].flag == 'j') {
        list_j = list[i].list;
      }
    }
    this.setData({list_j:list_j});
    //历史搜索
    this.initHis()
  },

  //初始化搜索历史
  initHis:function(){
    let tags=wx.getStorageSync('his_tags')
    if(tags){
      if(tags.length>10){
        tags.shift()
      }
      wx.setStorageSync('his_tags', tags)
      this.setData({his_tags:tags})
      
    }
  },

  //获取搜索key
  getvalue:function(event){
    this.setData({
      value:event.detail.value
    })
  },
  
  //搜索
  search:function(){
    //设置缓存
    this.setHisCache()    
    //设置前端显示
    this.setData({
      list_show:this.data.list_show=="no"?"yes":"no",
      btn_text:this.data.btn_text=="搜索"?"取消":"搜索",
      value:this.data.list_show=="no"?this.data.value:"",
    })
  },

  //设置历史搜索缓存
  setHisCache:function(){
    if(this.data.list_show=="no"){
      //设置历史缓存
      let tags=wx.getStorageSync('his_tags')
      if(tags){
        tags.push(this.data.value)
      }
      else{
        tags=[this.data.value];
      }
      wx.setStorageSync('his_tags', tags)
      this.setData({
        his_tags:tags
      })
    }
  },

  //清除历史缓存
  delHisCache:function(){
    wx.setStorageSync('his_tags', [])
    this.setData({his_tags:[]})
  },

  //跳转详情页
  goodsInfo:function(event){
    wx.navigateTo({
      url: '/pages/detail/detail?id='+event.currentTarget.dataset.goods_id,
    })
  },
})