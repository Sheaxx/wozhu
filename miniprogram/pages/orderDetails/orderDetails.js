// pages/orderDetails/orderDetails.js
const adopt = wx.cloud.database().collection('adopt')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // orderState:"已创建",
    // consigneeName: "阿絮",
    // telNumber: "11347789412",
    // region: ["北京市", "北京市", "东城区"],
    // detailAddress: "四季山庄四季山庄四季山庄四季山庄四季山庄",
    // image: "/images/index/1.jpeg",
    // msgTitle: "广州某区某街一只流浪小猫待领养",
    // orderId:"1984518498652318897",
    // createOrderTime:"2021-5-11 11:29:00",
    // classify: "流浪动物",
    // way: "自提"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    adopt.where({
      _id:options._id
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
      way:res.data[0].way
      })
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