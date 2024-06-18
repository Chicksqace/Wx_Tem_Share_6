import { Config } from 'config.js';
class Base {
  constructor() {
    this.baseUrl = Config.reqUrl;
    this.mapkey=Config.mapkey;
  }

  //网络请求
  requestUrl(params) {
    var that = this;
    url = this.baseUrl + params.url;
    //默认传递方式
    if (!params.type) {
      params.type = 'get';
    }
    //发起请求
    wx.request({
      url: url,
      method: params.type,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      success: function (res) {
        params.sCallback && params.sCallback(res.data);
      },
      fail: function (err) {
        that._processError(err);
      }
    })
  }

  //异常处理
  _processError(err) {
    console.log(err);
  }

  //提示信息
  toast(params){
    //默认icon方式
    params.icon=!params.icon?'none':params.icon;
    params.image=!params.image?'':params.image;
    params.duration=!params.duration?3000:params.duration;
    params.mask=!params.mask?false:params.mask;
    wx.showToast({
      title:params.title,
      icon:params.icon,
      image:params.image,
      duration:params.duration,	
      mask:params.mask
    })
  }

  //设置数据
  setProjectData(data,that){
    that.setData(data);
  }
}
export { Base }