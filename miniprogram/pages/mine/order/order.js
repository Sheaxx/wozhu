// pages/mine/order.js
const db = wx.cloud.database()
const adopt = db.collection('adopt')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    index:0,

    
      

    orderList:[   

    ]
  },

  //顶部导航栏
  switchTopTab(e) {
    let tab = e.currentTarget.id
    if (tab === 'created') {
      this.setData({ currentTab: 0 })
    } else if (tab === 'delivered') {
      this.setData({ currentTab: 1 })
    } else if (tab === 'finished'){
      this.setData({ currentTab: 2 })
    }
  },
  
  itemClick:function(event){

      
      var index = event.detail.index
      var _this = this
      console.log('555555555555555')
      console.log(event)
      console.log(index)
      _this.setData({
        index:index
      })
      // console.log(index)
      // console.log(event.detail.index)
      wx.navigateTo({
        url:'../../orderDetails/orderDetails?_id='+event.currentTarget.dataset.orderlist[_this.data.index].orderId
        
        
      })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    adopt.where({
      _openid:getApp().globalData._id
    })
    .get()
    .then(res => {
      console.log(res.data)
      
      for(var i = 0;i < res.data.length;i++){
        var utc_time = new Date(res.data[i].orderTime)
      res.data[i].orderTime = utc_time.toLocaleString() 
        _this.setData({
          ['orderList['+i+'].orderId']:res.data[i]._id,
          ['orderList['+i+'].orderTime']:res.data[i].orderTime.replace(/T/g,' ').replace(/\.[\d]{3}Z/,''),
          ['orderList['+i+'].image']:res.data[i].imgList,
          ['orderList['+i+'].title']:res.data[i].msgTitle,
          ['orderList['+i+'].classify']:res.data[i].classify,
          ['orderList['+i+'].way']:res.data[i].way
  
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