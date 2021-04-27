// pages/mine/released/released.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgList: [{
        time: "2021.5.11",
        msgTitle: "一个长长长长长长长长长长长长长长长长标题",
        msgContent: "宠物描述一段：天苍苍事了功成渡，寒江夜茫茫杯中月影笑荒唐，谁许我策马江湖闯四方，谁醉遍天涯 梦醒不见故乡。西陵下凄秋凉雨吻我窗，任人憎任人谤 未妨惆怅是清狂，春风吹得绿江南水岸，吹不暖人心霜，猝不及防 那是不是我们的光。",
        classify: "流浪动物",
        way: "自提",
        imgList: [
          "/images/index/1.jpeg", "/images/index/2.jpg", "/images/index/3.jpg"
        ],
      },
      {
        time: "2021.5.11",
        msgTitle: "一个长长长长长长长长长长长长长长长长标题",
        msgContent: "宠物描述一段：天苍苍事了功成渡，寒江夜茫茫杯中月影笑荒唐，谁许我策马江湖闯四方，谁醉遍天涯 梦醒不见故乡。西陵下凄秋凉雨吻我窗，任人憎任人谤 未妨惆怅是清狂，春风吹得绿江南水岸，吹不暖人心霜，猝不及防 那是不是我们的光。",
        classify: "流浪动物",
        way: "自提",
        imgList: [
          "/images/index/1.jpeg", "/images/index/2.jpg", "/images/index/3.jpg"
        ],
      },
    ]
  },

  //跳转到详情页
  toDetails:function(){
    wx.navigateTo({
      url: '../../details/details',
    })
  },

  //编辑
  edit: function () {
    
  },

  //被领养

  //删除
  delete: function (e) {
    var _this = this;
    var newList = _this.data.msgList;
    var index = e.target.dataset.index; 
    wx.showModal({
      title: '提示',
      content: '确认要删除该动态吗?',
      success: function (res) {
        if (res.confirm) {
          newList.splice(index, 1);
        } else if (res.cancel) {
          return false
        }
        _this.setData({
          msgList: newList
        })
      }
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