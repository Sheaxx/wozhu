// pages/mine/released/released.js
const db = wx.cloud.database()
const postList = db.collection('postList')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgList: [{
        time: "",
        msgTitle: "",
        msgContent: "",
        classify: "",
        way: "",
        imgList: [
          "", "", ""
        ],
      },
      {
        time: "",
        msgTitle: "",
        msgContent: "",
        classify: "",
        way: "",
        imgList: [
          "", "", ""

        ],
      },
    ]
  },

  //跳转到详情页
  toDetails:function(){
    wx.navigateTo({
      url: '../../msgDetails/msgDetails'
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
    var index = e.currentTarget.dataset.index; 
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

    console.log(getApp().globalData._id)
    postList
    .where({
      openId:getApp().globalData._id
    })
    .get()
    .then(res => {
      console.log(res)
      for(var i = 0;i<res.data.length;i++){
        var utc_time = new Date(res.data[i].time)
        res.data[i].time = utc_time.toLocaleString() 
        var time = "msgList["+ i +"].time"
        var msgTitle = "msgList["+ i +"].msgTitle"
        var msgContent = "msgList["+ i +"].msgContent"
        var classify = "msgList["+ i +"].classify"
        var way = "msgList["+ 0 +"].way"
        var imgList = "msgList["+ i +"].imgList"
        this.setData({
          //replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
          [time]:res.data[i].time.replace(/T/g,' ').replace(/\.[\d]{3}Z/,''),
          [msgTitle]:res.data[i].msgTitle,
          [msgContent]:res.data[i].msgContent,
          [classify]:res.data[i].classify,
          [way]:res.data[i].way,
          [imgList]:res.data[i].imgList
          
        })
        console.log(this.data.msgList[0].time)
        

        
        
      }
    }).catch(err => {
      console.log(err)
    })
    
    var t = "test["+ 0 +"].name"
    this.setData({
      [t]:"heiheihei"
    })
    
    // console.log(this.data.msgList[0])

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