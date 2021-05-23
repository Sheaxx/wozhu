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
    msgList: [],
    RmsgList: []
  },
  methods: {
    //顶部导航栏
    switchTopTab(e) {
      var _this = this
      let tab = e.currentTarget.id
      console.log(tab)
      if (tab === 'strayAnimal') {
        this.setData({
          currentTab: 0
        })
        _this.getList("流浪动物")
      } else if (tab === 'petFostering') {
        this.setData({
          currentTab: 1
        })
        _this.getList("宠物寄养")
      } else if (tab === 'petTransfer') {
        this.setData({
          currentTab: 2
        })
        _this.getList("宠物转赠")
      }
    },

    //跳转到详情页
    itemClick: function () {
      wx.navigateTo({

      })
    },

    //返回顶部
    toTop:function(){
      wx.pageScrollTo({
        scrollTop: 0
      })
    },

    getList: function (e) {
      var _this = this
      this.setData({
        msgList: null
      })
      wx.cloud.database().collection('postList').where({
          classify: e
        })
        .field({
          title: true,
          imgList: true
        })
        .get()
        .then(res => {

          console.log(res)
          if (res.data == null) {
            _this.setData({
              msgList: null
            })
          } else {
            for (var i = 0; i < res.data.length; i++) {
              var img = res.data[i].imgList[0]

              _this.setData({
                ["msgList[" + i + "].image"]: img,
                ["msgList[" + i + "].title"]: res.data[i].title
              })
            }
          }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.setData({
        currentTab: options.tab
      })
      if (options.tab == 1) {
        this.getList("宠物寄养")
      } else if (options.tab == 2) {
        this.getList("宠物转赠")
      } else {
        this.getList("流浪动物")
      }
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