import { Detail } from "detail-mode.js";

// pages/detail/detail.js
const app=getApp();
const detail=new Detail();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_id:app.globalData.goods_id,
    change:"d",
    phone:"15034707080",
    good:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        this.getInit(options)
  },

  //获取详情
  getInit(options){
    if(!options.id){
      let params={
        title:"商品选择错误"
      }
      detail.toast(params)
    }
    else{
      //获取商品详情
      let id = options.id
      const goods=app.globalData.goods
      console.log(goods)
      for(let i=0;i<goods.length;i++){
        for(let j=0;j<goods[i].list.length;j++){
          const list=goods[i].list[j]
          if(parseInt(id)===list.id){
            this.setData({
              good:list
            })
            break;
          }
        }
      }
      console.log(this.data.good)
    }
  },

  //分享
  onShareAppMessage() {
    return {
          title: '分享课程',
          desc:'本课程...',
          path: '/pages/detail/detail?id='+this.data.goods_id // 路径，传递参数到指定页面。
     }
 },
  //tab切换
  changeTab:function(event){
    let change=event.currentTarget.dataset.tab;
    console.log(change)
    let data = {
      change:change
    };
    detail.setProjectData(data,this);
  },
  //拨打电话
  call:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.phone //仅为示例，并非真实的电话号码
    })
  }
})