import { My } from "my-mode.js";
const my = new My();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        avatarUrl: "../../images/icon/no-login.png",
        login_name: "点击登录",
        islogin: "no",
        phone: "18999999999"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let userInfo = wx.getStorageSync('userInfo')
        if (!userInfo) {} else {
            let data = {
                islogin: userInfo.islogin,
                avatarUrl: userInfo.avatarUrl,
                login_name: userInfo.login_name
            }
            my.setProjectData(data, this)
        }
    },

    //获取用户微信信息
    getUser: function() {
        var that = this
        wx.login({
            success(res) {
                wx.getUserInfo({
                        success: (res) => {
                            let data = {
                                islogin: 'yes',
                                avatarUrl: res.userInfo.avatarUrl,
                                login_name: res.userInfo.nickName
                            }
                            my.setProjectData(data, that)
                                //设置信息缓存
                            wx.setStorageSync('userInfo', data)
                        },
                        fail: (res) => {
                            let data = { title: "登录失败" }
                            my.toast(data)
                        }
                    })
                    // if (res.code) {
                    //   //发起网络请求

                // } else {
                //   let data={title:"登录失败"}
                //   my.toast(data)
                // }
            },
            fail: function(res) {
                let data = { title: "登录失败" }
                my.toast(data)
            }
        })
    },

    //拨打客服点
    //拨打电话
    call: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.phone //仅为示例，并非真实的电话号码
        })
    },

    //跳转设置页面
    set: function() {
        wx.navigateTo({
            url: '/pages/set/set',
        })
    }

})