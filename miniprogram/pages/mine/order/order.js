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
    ],
    temp:[],
    
  },

  //顶部导航栏
  switchTopTab(e) {
    let tab = e.currentTarget.id
    if (tab === 'created') {
      this.setData({ currentTab: 0 })
      this.getList('已创建')
    } else if (tab === 'delivered') {
      this.setData({ currentTab: 1 })
      this.getList('已送出')
    } else if (tab === 'finished'){
      this.setData({ currentTab: 2 })
      this.getList('已完成')
    }
  },

  getList:function(e){
    var _this = this
      this.setData({
        msgList: null
      })
      wx.cloud.database().collection('adopt').where({
        openId:getApp().globalData._id,
        orderState:e
      })
      .get()
      .then(res => {
        if(res.data == null){
          _this.setData({
            msgList:null
          })
        }
        else{
          for(var i =0;i<res.data.length;i++){
            // var img = res.data[i].imgList[0]
            
            _this.setData({
              // ["msgList["+i+"].image"]:img,
              // ["msgList["+i+"].title"]:res.data[i].title,
                  ["msgList["+i+"].title"] : res.data[i].title,
                  ["msgList["+i+"].image"] : res.data[i].imgList[0],
                  ["msgList["+i+"].openId"] : res.data[i].openId,
                  ["msgList["+i+"]._id"] : res.data[i]._id
                
            })
          } 
        }
      })

      wx.cloud.database().collection('adopt').where({
        seller_id:getApp().globalData._id,
        orderState:e
      })
      .get()
      .then(res => {
        if(res.data == null){
          _this.setData({
            temp:null
          })
        }
        else{
          for(var i =0;i<res.data.length;i++){
            // var img = res.data[i].imgList[0]
            
            _this.setData({
              // ["msgList["+i+"].image"]:img,
              // ["msgList["+i+"].title"]:res.data[i].title,
                  ["temp["+i+"].title"] : res.data[i].title,
                  ["temp["+i+"].image"] : res.data[i].imgList[0],
                  ["temp["+i+"].openId"] : res.data[i].openId,
                  ["temp["+i+"]._id"] : res.data[i]._id
                
            })
          } 
        }
      })

      _this.data.orderList.concat(_this.data.temp)
  },
  
  itemClick:function(event){

      
      var index = event.detail.index
      var _this = this
      console.log('555555555555555')
      console.log(event)
      console.log('index:  '+index)
      _this.setData({
        index:index
      })
      // console.log(index)
      // console.log(event.detail.index)
      console.log(event.currentTarget.dataset.orderlist[index].orderId)
      wx.navigateTo({
        
        url:'../../orderDetails/orderDetails?_id='+event.currentTarget.dataset.orderlist[index].orderId
        
        
      })
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
    //获取卖家的订单
    adopt.where({
      seller_id:getApp().globalData._id
    })
    .get()
    .then(res => {
      console.log(res.data)
      
      for(var i = 0;i < res.data.length;i++){
        var utc_time = new Date(res.data[i].orderTime)
      res.data[i].orderTime = utc_time.toLocaleString() 
        _this.setData({
          ['temp['+i+'].orderId']:res.data[i]._id,
          ['temp['+i+'].orderTime']:res.data[i].orderTime.replace(/T/g,' ').replace(/\.[\d]{3}Z/,''),
          ['temp['+i+'].image']:res.data[i].imgList,
          ['temp['+i+'].title']:res.data[i].msgTitle,
          ['temp['+i+'].classify']:res.data[i].classify,
          ['temp['+i+'].way']:res.data[i].way
  
        })
       
      }
      _this.data.orderList.concat(_this.data.temp)

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
})