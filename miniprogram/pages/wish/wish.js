// pages/wish/wish.js
Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 3
        })
      }
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    wishList: [
      {
        msgTitle: "一个长长长长长长长长长长长长长长长长标题",
        image: "/images/index/1.jpeg",
        classify: "流浪动物",
        way: "自提"
      },
      {
        msgTitle: "一个长长长长长长长长长长长长长长长长标题",
        image: "/images/index/1.jpeg",
        classify: "流浪动物",
        way: "自提"
      }
    ],
    startX: 0, //开始坐标
    startY: 0
  },

  methods: {
    //开始滑动
    touchstart: function (e) {
      //开始触摸时 重置所有删除
      // this.data.wishList.forEach(function (v, i) {
      //   if (v.isTouchMove) //只操作为true的
      //     v.isTouchMove = false;
      // })
      this.setData({
        startX: e.changedTouches[0].clientX,
        startY: e.changedTouches[0].clientY,
        wishList: this.data.wishList
      })
      console.log(this)
    },

    //滑动事件处理
    touchmove: function (e) {
      let _this = this,
        index = e.currentTarget.dataset.index, //当前索引
        startX = _this.data.startX, //开始X坐标
        startY = _this.data.startY, //开始Y坐标
        touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
        touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
        //获取滑动角度
        angle = _this.angle({
          X: startX,
          Y: startY
        }, {
          X: touchMoveX,
          Y: touchMoveY
        });
      _this.data.wishList.forEach(function (v, i) {
        v.isTouchMove = false
        //滑动超过30度角 return
        // if (Math.abs(angle) > 30) return;
        if (i == index) {
          if (touchMoveX > startX) //右滑
            v.isTouchMove = false
          else //左滑
            v.isTouchMove = true
        }
      })
      //更新数据
      _this.setData({
        wishList: _this.data.wishList
      })
    },

    /**
     * 计算滑动角度
     * @param {Object} start 起点坐标
     * @param {Object} end 终点坐标
     */
    angle: function (start, end) {
      var _X = end.X - start.X,
        _Y = end.Y - start.Y
      //返回角度 /Math.atan()返回数字的反正切值
      return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
    },

    //删除一项
    delete:function(e){
      var _this = this;
      var newList = _this.data.wishList;
      var index = e.target.dataset.index; //获取当前点击图片下标
      wx.showModal({
        title: '提示',
        content: '确认要删除该愿望吗?',
        success: function (res) {
          if (res.confirm) {
            newList.splice(index, 1);
          } else if (res.cancel) {
            return false
          }
          _this.setData({
            wishList: newList
          })
        }
      })
    },

    //确认领养
    toCreateOrder:function(){
      wx.navigateTo({
        url: '../createOrder/createOrder',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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