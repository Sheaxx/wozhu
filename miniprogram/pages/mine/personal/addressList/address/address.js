// pages/mine/personal/addressList/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    consigneeName: "",
    telNumber: "",
    region: ["北京市","北京市","东城区"],
    detailAddress: ""
  },

  //保存地址
  saveAddress:function(e){
    let _this = this;
    let pages = getCurrentPages();//当前页面
    let prevPage = pages[pages.length-2];//上一页面
    let oldList = prevPage.data.addressList
    let newList = oldList.concat(_this.data)
    prevPage.setData({//直接给上移页面赋值
      addressList: newList,
      selAddress:'yes'
    });
    wx.navigateBack({
      delta: 1
    })
  },

  //改变地区
  changeArea:function(e){
    this.setData({
      region: e.detail.value
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