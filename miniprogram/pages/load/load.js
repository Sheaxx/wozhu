


// miniprogram/pages/load/load.js
const db = wx.cloud.database()
const _ = db.command
const user = db.collection('User')
let result = {}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    userName: null,
    avatarUrl: null,
    address: null,
    openid:null
  },



  next: function (e) {

    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // wx.showLoading({
    //   title: '加载中',
    // })



    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://test.com/onLogin',
            data: {
              code: res.code
            },

          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }

    // setTimeout(function(){
    //     wx.hideLoading()
    // },2000)
  },

  getUserProfile(e) {
    var that = this
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res.rawData)
        
        that.setData({
          userName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl,
          address: res.userInfo.city
        })
        wx.cloud.callFunction({
          name: 'openId'
        }).then(res => {
          // that.setData({
          //   openid:res.result.openid
          // })
          getApp().globalData._id = res.result.openid
          // console.log(getApp().globalData._id)
          user.add({
            data: {
              _id: res.result.openid,
              userName: that.data.userName,
              avatarUrl: that.data.avatarUrl,
              address: that.data.address
            },
          }).then(res => {
            console.log(res)
            
          }).catch(console.error)

          console.log(getApp().globalData._id)
          user.where({
            _id:getApp().globalData._id
          })
          .get()
          .then(res => {
            getApp().globalData.userInfo.nickName = res.data[0].userName,
            getApp().globalData.userInfo.avatarUrl = res.data[0].avatarUrl
            // console.log(getApp().globalData.userInfo)
            // console.log(res.data[0].userName)
          })

        })

        
        
        getApp().globalData.userInfo = res.userInfo
        console.log(getApp().globalData.userInfo)
        this.next()
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,

        })
      }
      
    })

   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})