// pages/classify/classify.js
Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    postList: [{
      image: "/images/index/1.jpeg",
      title: "一个很长很长很长很长很长很长很长很长很长很长很长的标题"
    },
    {
      image: "/images/index/2.jpg",
      title: "另一个很长很长很长很长很长很长很长很长很长很长很长的标题"
    },
    {
      image: "/images/index/2.jpg",
      title: "另一个很长很长很长很长很长很长很长很长很长很长很长的标题"
    },
    {
      image: "/images/index/1.jpeg",
      title: "一个很长很长很长很长很长很长很长很长很长很长很长的标题"
    },
  ]
  },
  methods: {
    //底部导航栏
    switchTab(e) {
      console.log(e)
      let tab = e.currentTarget.id
      if (tab === 'tableft') {
        this.setData({
          currentTab: 0
        })
      } else if (tab === 'tabright') {
        this.setData({
          currentTab: 1
        })
      }
    },

    //顶部导航栏
    switchTopTab(e) {
      let tab = e.currentTarget.id
      if (tab === 'strayAnimal') {
        this.setData({ currentTab: 0 })
      } else if (tab === 'petFostering') {
        this.setData({ currentTab: 1 })
      } else if (tab === 'petTransfer'){
        this.setData({ currentTab: 2 })
      }
    },

    //跳转到详情页
    itemClick:function(){
      wx.navigateTo({
        url: '../details/details',
      })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.setData({
        currentTab:options.tab
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
  }
})