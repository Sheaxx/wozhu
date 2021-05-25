// pages/createOrder/createOrder.js

const db = wx.cloud.database()
const adopt = db.collection('adopt')
const postList = db.collection('postList')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    remainingTime: "29分31秒",
    consigneeName: "",
    telNumber: "",
    region: [],
    detailAddress: "",
    image: "/images/index/1.jpeg",
    msgTitle: "广州某区某街一只流浪小猫待领养",
    classify: "流浪动物",
    way: "自提"
  },

  //选择收货信息
  toAdressList: function () {
    wx.navigateTo({
      url: '../mine/personal/addressList/addressList?fromCreateOrder=true',
    })
  },

  //取消领养
  cancelCreate:function(){
    wx.navigateBack({
      delta: 1,
    })
  },
  confirmCreate:function(){
    var _this = this
    adopt.add({
      data:({
        classify:_this.data.classify,
        imgList:_this.data.image,
        msgTitle:_this.data.msgTitle,
        consigneeName:_this.data.consigneeName,
        way:_this.data.way,
        telNumber:_this.data.telNumber,
        region:_this.data.region,
        detailAddress:_this.data.detailAddress,
        orderTime:new Date()
      })
    })
    .then(res => {
      wx.showToast({
        title: '已添加',
        icon: 'success'
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
      _this.setData({
        _id:options._id
      })
      console.log(options._id)
      postList.where({
          _id:options._id
      })
      .get()
      .then(res => {
        console.log(res.data)
        _this.setData({
          image:res.data[0].imgList[0],
          msgTitle:res.data[0].title,
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