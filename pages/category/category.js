// pages/category/category.js
import { Category } from "category-mode";
const cat = new Category();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //分类
    category_select:1,
    categorys: app.globalData.categorys,
    //分类列表
    goods: app.globalData.goods,
    goods_item:[]
  },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.setDataInit();
    },

    setDataInit:function(){
      //初始化数据
      let goods=this.data.goods,
      data={};
      for(let i=0;i<goods.length;i++){
        if(goods[i].category_id==app.globalData.category_select){
          data={goods_item:this.data.goods[i],category_select:app.globalData.category_select}
          break;
        }
      }
      cat.setProjectData(data,this);
    },

    //设置分类数据
    chooseCategory: function (event) {
      let category_select=event.currentTarget.dataset.cat_id;
      let len=this.data.goods.length;
      let data = {};
      //分类数据
      for(let i=0;i<len;i++){
        if(this.data.goods[i].category_id==category_select){
          data={
            category_select: category_select,
            goods_item:this.data.goods[i]
          }
          break;
        }
      }
      cat.setProjectData(data, this);
    },

    //跳转详情
    goodsInfo:function(event){
      wx.navigateTo({
        url: '/pages/detail/detail?id='+event.currentTarget.dataset.goods_id,
      })
    }
  })