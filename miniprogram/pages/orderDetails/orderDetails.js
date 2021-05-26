// pages/orderDetails/orderDetails.js
const adopt = wx.cloud.database().collection('adopt')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },


  finish:function(){
    var _this = this
    adopt.where({
      _id:_this.data.orderId
    })
    .update({
      data:{
        orderState:'已完成'
      }
    })
    .then(res => {
      console.log(res)
      wx.showToast({
        title: '已完成',
        icon: 'success'
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options._id)
    this.onShow(options._id)
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (_id) {
    var _this = this
    console.log('_id；   '+_id)
    adopt.where({
      _id:_id
    })
    .get()
    .then(res => {
      
      _this.setData({
        orderState:res.data[0].orderState,
      consigneeName:res.data[0].consigneeName,
      region:res.data[0].region,
      telNumber:res.data[0].telNumber,
      detailAddress:res.data[0].detailAddress,
      image:res.data[0].imgList,
      msgTitle:res.data[0].msgTitle,
      orderId:res.data[0]._id,
      createOrderTime:res.data[0].orderTime,
      classify:res.data[0].classify,
      way:res.data[0].way,
      seller_id:res.data[0].seller_id
      })

      console.log(_this.data.orderState)
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