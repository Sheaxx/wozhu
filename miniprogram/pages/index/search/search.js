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
    
    this.setData({
      content:e.detail.value
    })
    console.log(_this.data.content)
    if(_this.data.content != ''){
      getApp().globalData.isAll = false
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
      // _this.setData({
      //   list:res.data
      // })
      console.log(res.data)
      for(var i =0;i<res.data.length;i++){
        _this.setData({
          ["list["+i+"].title"] : res.data[i].title,
          ["list["+i+"].image"] : res.data[i].imgList[0]
        })
      }
      
    })

    getApp().globalData.msgList = _this.data.list
    console.log(getApp().globalData.msgList)
    console.log(getApp().globalData.isAll)
    }
    
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
    
    
      var _this = this 
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];   //当前页面
      var prevPage = pages[pages.length - 2];  //上一个页面
      // if(that.data.list.length == 0){
      //   postList
      //   .field({
      //     _id:false,
      //     title:true,
      //     imgList:true
      //   })
      //   .get()
      //   .then(res => {
      //     // console.log(res)
      //     for(var i = 0;i < res.data.length;i++){  
      //       prevPage.setData({
      //         ["msgList["+i+"].title"]:that.data.list[i].title,
      //         ["msgList["+i+"].image"]:that.data.list[i].imgList[0]
      //       })
            
      //     }
      //   })
      // }
      if(_this.data.list.length == 0){
        getApp().globalData.isAll = true
      }
      console.log(getApp().globalData.isAll)
      
  
      ;
    
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