// pages/createOrder/createOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remainingTime: "29分31秒",
    consigneeName: "阿絮",
    telNumber: "11347789412",
    region: ["北京市", "北京市", "东城区"],
    detailAddress: "四季山庄四季山庄四季山庄四季山庄四季山庄",
    image: "/images/index/1.jpeg",
    msgTitle: "广州某区某街一只流浪小猫待领养",
    currentLocation:"广州",
    classify: "流浪动物",
    way: "自提"
  },

  //选择收货信息
  toAdressList: function () {
    wx.navigateTo({
      url: '../mine/personal/addressList/addressList',
    })
  },

  //取消领养
  cancelCreate:function(){
    wx.navigateBack({
      delta: 1,
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