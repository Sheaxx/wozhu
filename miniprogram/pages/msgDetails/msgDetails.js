// pages/msgDetails/msgDetails.js
const db = wx.cloud.database()
const wishes = db.collection('wishes')
const User = db.collection('User')
const postList = db.collection('postList')
const adopt = db.collection('adopt')
// const id = 'oH4Ji5R4IsJWopnGwa2ht8_aueyU'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList:[],
    msgTitle:"",
    msgContent:"",
    _id:'',
    openId:"",//卖家的openId
    userProfile:"",
    userName:"",
    area:"",
    classify:"",
    way:""
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
  //添加到愿望单
  addToWishes:function(){
    var _this = this
    // User.where({
    //     _openid:id
    // })
    // .field({
    //   data:({
    //     _id:false,
    //     userName:true,
    //     avatarUrl:true
    //   })
    // })
    // .get()
    // .then(res => {
      
    // })
    wishes.add({
      data:({
        classify:_this.data.classify,
        imgList:_this.data.imgList,
        msgContent:_this.data.msgContent,
        msgTitle:_this.data.msgTitle,
        openId:getApp().globalData._id,//后期换成全局的id
        userImage:_this.data.userProfile,
        userName:_this.data.userName,
        way:_this.data.way
      })
    })
    .then(res => {
      wx.showToast({
        title: '已添加',
        icon: 'success'
      })
    })
    
    
  },
  //跳转到创建订单界面
  adopt:function(){
      var _this = this

      wx.navigateTo({
        url: '../createOrder/createOrder?_id='+_this.data._id,
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
          imgList:res.data[0].imgList,
          msgTitle:res.data[0].title,
          msgContent:res.data[0].content,
          openId:res.data[0].openId,
          userName:res.data[0].userName,
          userProfile:res.data[0].userProfile,
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