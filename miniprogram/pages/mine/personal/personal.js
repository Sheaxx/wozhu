// pages/mine/personal.js
const db = wx.cloud.database()
const user = db.collection('User')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userProfile:"",
    userId:"",
    userName:"",
  },

  //点击修改个人信息
  toRevisability:function(){
    this.setData({
      isReadOnly:false
    })
  },

  //点击保存
  toReadOnly:function(){
    this.setData({
      isReadOnly:true
    })
  },

  //点击添加选择
  chooseSource: function () {
    var _this = this;
    wx.showActionSheet({
      itemList: ["拍照", "从相册中选择"],
      itemColor: "#f4ea2a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.imgWShow("camera") //拍照
          } else if (res.tapIndex == 1) {
            _this.imgWShow("album") //相册
          }
        }
      }
    })
  },
  // 点击调用手机相册/拍照
  imgWShow: function (type) {
    var _this = this;
    //获取当前已有的图片
    wx.chooseImage({
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图,默认二者都有
      sourceType: [type], //可以指定来源是相册还是相机, 默认二者都有
      success: function (res) {
        wx.showToast({
          title: '正在上传...',
          icon: "loading",
          mask: true,
          duration: 1000
        })
        // 返回选定照片的本地文件路径列表,tempFilePaths可以作为img标签的scr属性显示图片
        _this.setData({
          userProfile: res.tempFilePaths
        })
        wx.cloud.uploadFile({
          cloudPath:'userImg/'+Math.floor(Math.random()*1000000),
          filePath:res.tempFilePaths[0],
          success(res){
            console.log("成功",res)
            if(res.fileID){
              _this.setData({
                userProfile:res.fileID
              })
            }
          }
        })
      },
      fail: function () {
        wx.showToast({
          title: '图片上传失败',
          icon: 'none'
        })
        return;
      }
    })
  },

  

  //跳转设置用户名
  setUserName:function(){
    wx.navigateTo({
      url: './userName/userName?userName=' + this.data.userName
    })
  },

  //跳转到地址设置
  setAdress:function(){
    wx.navigateTo({
      url: './addressList/addressList',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let dataArr = options.data.split(',');
    this.setData({
      userProfile: dataArr[0],
      userId: dataArr[1],
      userName: dataArr[2]
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

  
    const userInfo = getApp().globalData.userInfo
    

    let _this = this;
    let pages = getCurrentPages();//当前页面
    let prevPage = pages[pages.length-2];//上一页面
    let newUserProfile = _this.data.userProfile
    let newUserName = _this.data.userName
    prevPage.setData({//直接给上移页面赋值
      userProfile: newUserProfile,
      userName: newUserName,
      selAddress:'yes'
    });

    userInfo.avatarUrl = newUserProfile
    userInfo.nickName = newUserName
    // console.log(getApp().globalData.userInfo.nickName)
    
    user.where({
      _id:getApp().globalData._id
    })
    .update({
      data:({
        userName:userInfo.nickName,
        avatarUrl:newUserProfile
      })
    })
    .then(res => {
      console.log(res)
    })
    console.log(userInfo)


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