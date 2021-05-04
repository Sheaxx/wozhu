// pages/mine/personal/userName/userName.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userName:options.userName
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
    let _this = this;
    let pages = getCurrentPages();//当前页面
    let prevPage = pages[pages.length-2];//上一页面
    let newUserName = _this.data.userName
    prevPage.setData({//直接给上移页面赋值
      userName: newUserName,
      selAddress:'yes'
    });
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