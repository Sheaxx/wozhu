// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList:[
      "/images/index/1.jpeg","/images/index/2.jpg","/images/index/3.jpg"
    ],
    msgTitle:"一个长长长长长长长长长长长长长长长长标题",
    msgContent:"天苍苍事了功成渡，寒江夜茫茫杯中月影笑荒唐，谁许我策马江湖闯四方，谁醉遍天涯 梦醒不见故乡。西陵下凄秋凉雨吻我窗，任人憎任人谤 未妨惆怅是清狂，春风吹得绿江南水岸，吹不暖人心霜，猝不及防 那是不是我们的光。",
    userProfile:"/images/mine/axu.jpg",
    userName:"阿絮",
    classify:"流浪动物",
    way:"自提"
  },

  // 预览图片
  //需要改成https路径才能预览成功
  previewImg: function (e) {
    let index = e.target.dataset.index;
    let _this = this;
    wx.previewImage({
      current: _this.data.imgList[index],
      urls: _this.data.imgList
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