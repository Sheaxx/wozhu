// pages/createOrder/createOrder.js

const db = wx.cloud.database()
const adopt = db.collection('adopt')
const postList = db.collection('postList')
const wishes = db.collection('wishes')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    remainingTime: "29分31秒",
    info:{
      consigneeName: "",
      telNumber: "",
      region: [],
      detailAddress: "",
    },
    image: "/images/index/1.jpeg",
    msgTitle: "广州某区某街一只流浪小猫待领养",
    classify: "流浪动物",
    way: "自提",
    _id:'',
    w_id:'',
    seller_id:'',  //卖家id
    p_id:'' //postlist的id
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

  //确认领养
  confirmCreate:function(){
    var _this = this
    var info = _this.data.info
      // console.log(info)
      for (var item in info) {
        if (!info[item]) { 
          wx.showToast({
            title: '请选择接宠地址',
            icon: 'none',
            duration: 1500
          })
          return;
        }
      }
      console.log('卖家ID：'+_this.data.seller_id)
    adopt.add({
      data:({
        classify:_this.data.classify,
        imgList:_this.data.image,
        msgTitle:_this.data.msgTitle,
        consigneeName:_this.data.info.consigneeName,
        way:_this.data.way,
        telNumber:_this.data.info.telNumber,
        region:_this.data.info.region,
        detailAddress:_this.data.info.detailAddress,
        orderState:'已创建',
        orderTime:new Date(),
        openId:getApp().globalData._id,
        seller_id:_this.data.seller_id
      })
    })
    .then(res => {
      wx.showToast({
        title: '已完成',
        icon: 'success'
      })
    })

    console.log('aaaaaa w_id:'+_this.data.w_id)
    if(_this.data.w_id!=''){
      wishes.where({
        _id:_this.data.w_id
      })
      .remove()
      .then(res => {
        console.log('555555555555555')
        console.log(res)
      })
    }

    postList.where({
      _id:_this.data.p_id
    })
    .remove()
    .then(res => {
      console.log('555555555555555')
      console.log(res)
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    _this.setData({
      p_id:options.p_id,
      seller_id:options.openId    //卖家Id
    })
    if(options._id){
      
      _this.setData({
        _id:options._id
      })
      console.log('options._id'+options._id)
        console.log('this.data._id:'+_this.data._id)
      
      
      postList.where({
          _id:options._id
      })
      .get()
      .then(res => {
        _this.setData({
          image:res.data[0].imgList[0],
          msgTitle:res.data[0].title,
          classify:res.data[0].classify,
          way:res.data[0].way
        })
      })
    }
      if(options.w_id){
        
        _this.setData({
          w_id:options.w_id //愿望单id
        })
        console.log('options.w_id'+options.w_id)
        console.log('this.data.w_id:'+_this.data.w_id)
        wishes.where({
            _id:options.w_id
        })
        .get()
        .then(res => {
          _this.setData({
            image:res.data[0].imgList[0],
            msgTitle:res.data[0].msgTitle,
            classify:res.data[0].classify,
            way:res.data[0].way
          })

          console.log(_this.data)
        })
      }
    
      

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