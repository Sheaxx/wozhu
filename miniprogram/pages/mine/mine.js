// pages/mine/mine.js
const db = wx.cloud.database()
const user = db.collection('User')
const globalData = getApp().globalData

Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 4
        })
      }
    }
  },
  /**
   * 页面的初始数据
   */
  data: {

    userProfile: "",
    userId: '',
    userName: ''

  },

  methods: {
    //跳转到个人信息
    toPersonal: function () {


      // console.log(this.data.userId)

      // console.log(info)

      // console.log(this.data.userId)
      wx.navigateTo({

        url: './personal/personal?data=' + [this.data.userProfile, this.data.userId, this.data.userName]

      })

    },

    //跳转到领养单
    toOrder: function () {
      wx.navigateTo({
        url: './order/order',
      })
    },

    //跳转到已发布
    toReleased: function () {
      wx.navigateTo({
        url: './released/released',
      })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that = this
      user.doc(globalData._id).
      get()
        .then(res => {
          // console.log(res)
          that.setData({
            userId: globalData._id,
            userProfile: res.data.avatarUrl,
            userName: res.data.userName
          })
          console.log(res)
        }).catch(console.error)
        
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
      var that = this
      const userInfo = getApp().globalData.userInfo
      // user.doc(globalData._id).
      // get()
      //   .then(res => {
      //     console.log(res)
      //     that.setData({
      //       userId: globalData._id,
      //       userProfile: res.data.avatarUrl,
      //       userName: res.data.userName
      //     })
      //   })
      that.setData({
        userProfile: userInfo.avatarUrl,
        userId: getApp().globalData._id,
        userName: userInfo.nickName
      })
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
  },

})