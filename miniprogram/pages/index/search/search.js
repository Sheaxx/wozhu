// pages/index/search/search.js

const db = wx.cloud.database()
const postList = db.collection('postList')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    content:""
  },

  toSearch:function(e){
    var _this = this
    // console.log(e.detail.value)
    this.setData({
      content:e.detail.value
    })
    console.log(this.data.content)

    postList.where({
      content:db.RegExp({
        regexp:_this.data.content,
        
      })
    })
    .field({
      _id:false,
      title:true,
      imgList:true
    })
    .get()
    .then(res => {
      // console.log(res)
      _this.setData({
        list:res.data
      })
      getApp().globalData.msgList = res.data
      console.log(getApp().globalData.msgList)
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