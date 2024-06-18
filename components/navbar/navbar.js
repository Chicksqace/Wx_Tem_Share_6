// components/navbar/navbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cityName:String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  //加载时调用
  lifetimes: {
    attached: function () {
      this.__getUserDev();
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //获取用户手机高度
    __getUserDev:function(){
      let menuButtonObject = wx.getMenuButtonBoundingClientRect();
      wx.getSystemInfo({
        success: res => {
          let statusBarHeight = res.statusBarHeight,
            navTop = menuButtonObject.top,//胶囊按钮与顶部的距离
            navRight = menuButtonObject.right,
            navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;//导航高度
          this.setData({
            navHeight: navHeight,//导航高度
            navTop: navTop,//距离顶部距离
            navRight: res.windowWidth - menuButtonObject.right,//右侧距离
            windowHeight: res.windowHeight,
            jnheight: menuButtonObject.height,
            //bgColor: "#00AFCC"//背景颜色
            bgColor:"#A3B6ED"
          })
        },
        fail(err) {
          console.log(err);
        }
      })
    },
    //定位
    position: function () {
      wx.navigateTo({
        url: '/pages/position/position',
      })
    },
    //搜索
    search: function () {
      wx.navigateTo({
        url: '/pages/search/search',
      })
    }
  }
})
