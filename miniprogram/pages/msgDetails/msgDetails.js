// pages/msgDetails/msgDetails.js
const db = wx.cloud.database()
const wishes = db.collection('wishes')
const User = db.collection('User')
const postList = db.collection('postList')
const adopt = db.collection('adopt')
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
    way:"",
    canAdd:true,
    p_id:''
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
    console.log('_id:'+_this.data._id)
    wishes.where({
      p_id:_this.data._id
    })
    .get()
    .then(res => {
      console.log(res.data[0])
      if(res.data.length == 0){
        // _this.setData({
        //   canAdd:false
        // })
        wishes.add({
          data:({
            p_id:_this.data._id,
            classify:_this.data.classify,
            imgList:_this.data.imgList,
            msgContent:_this.data.msgContent,
            msgTitle:_this.data.msgTitle,
            openId:getApp().globalData._id,//后期换成全局的id
            userImage:_this.data.userProfile, //卖家头像
            userName:_this.data.userName,   //卖家名字
            seller_id:_this.data.openId,  //卖家Id
            way:_this.data.way
          })
        })
        .then(res => {
          wx.showToast({
            title: '已添加',
            icon: 'success'
          })
        })
      }else{
        wx.showToast({
          title: '请勿重复添加',
          icon:'none'
        })
      }
    })
  },
  //跳转到创建订单界面
  adopt:function(){
      var _this = this
      wx.navigateTo({
        url: '../createOrder/createOrder?_id='+_this.data._id+'&openId='+_this.data.openId,
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var _this = this
      _this.setData({
        p_id:options._id,
        // openId:options.openId   //卖家id
      })
      _this.onShow(options._id)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (_id) {
    var _this = this
    _this.setData({
      canAdd:true
    })
    postList.where({
      _id:_id
  })
  .get()
  .then(res => {
    console.log(res.data)
    _this.setData({
      _id:res.data[0]._id,
      imgList:res.data[0].imgList,
      msgTitle:res.data[0].title,
      msgContent:res.data[0].content,
      openId:res.data[0].openId,  //卖家id
      userName:res.data[0].userName,
      userProfile:res.data[0].userProfile,
      classify:res.data[0].classify,
      way:res.data[0].way
    })
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