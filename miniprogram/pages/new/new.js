// pages/new/new.js
const postList = wx.cloud.database().collection('postList')
const userInfo = getApp().globalData.userInfo
Component({
  
  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    text: "",
    imgList: [],
    waychoices:[{
      name:"快递",index:0
    },
    {
      name:"自提",index:1
    }],
    way:"",
    classifychoices:[{
      name:"流浪动物",index:0
    },
    {
      name:"宠物寄养",index:1
    },
    {
      name:"宠物转赠",index:2
    }],
    classify:""
    
  },
  methods: {
    titleInput: function (event) {
      this.data.title = event.detail.value
    },
    textInput: function (event) {
      this.data.text = event.detail.value
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
      let len = 0;
      if (_this.data.imgList != null) {
        len = _this.data.imgList.length
      } //获取当前已有的图片
      wx.chooseImage({
        count: 6 - len, //最多还能上传的图片数,这里最多可以上传6张
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
          var imgList = res.tempFilePaths
          let tempFilePathsImg = _this.data.imgList
          // 获取当前已上传的图片的数组
          var tempFilePathsImgs = tempFilePathsImg.concat(imgList)
          _this.setData({
            imgList: tempFilePathsImgs
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
    // 预览图片
    previewImg: function (e) {
      let index = e.target.dataset.index;
      let _this = this;
      wx.previewImage({
        current: _this.data.imgList[index],
        urls: _this.data.imgList
      })
    },
    // 长按删除
    deleteImg: function (e) {
      var _this = this;
      var imgList = _this.data.imgList;
      var index = e.target.dataset.index; //获取当前点击图片下标
      wx.showModal({
        title: '提示',
        content: '确认要删除该图片吗?',
        success: function (res) {
          if (res.confirm) {
            imgList.splice(index, 1);
          } else if (res.cancel) {
            return false
          }
          _this.setData({
            imgList
          })
        }
      })
    },

    wayToString:function(event){
      var _this = this
      _this.setData({
        way:event.detail
      })
      // console.log(event.detail)
      console.log(_this.data.way)
    },

    classifyToString:function(event){
      var _this = this
      _this.setData({
        classify:event.detail
      })
      // console.log(event.detail)
      console.log(_this.data.classify)
    },

    submit:function(){
      var _this = this
      postList.add({
        data:({
          openId:getApp().globalData._id,
          userName:getApp().globalData.userInfo.nickName,
          title:_this.data.title,
          content:_this.data.text,
          way:_this.data.way,
          classify:_this.data.classify,
          imgList:_this.data.imgList
        })
      })
      .then(res => {
        console.log(res)
      })
      
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      console.log(getApp().globalData.userInfo)
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
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 2
        })
      }
    }
  }
})