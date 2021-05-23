// pages/new/new.js
var COS = require('../../js/cos-wx-sdk-v5')
var config = require('../../js/config');
var cos = new COS({
  SecretId: config.SecretId,
  SecretKey: config.SecretKey,
});
const postList = wx.cloud.database().collection('postList')
const userInfo = getApp().globalData.userInfo
Component({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      title: "",
      text: "",
      imgList: [],
      way: "",
      classify: "",
    },
    waychoices: [{
        name: "快递",
        index: 0
      },
      {
        name: "自提",
        index: 1
      }
    ],
    classifychoices: [{
        name: "流浪动物",
        index: 0,
      },
      {
        name: "宠物寄养",
        index: 1,
      },
      {
        name: "宠物转赠",
        index: 2,
      }
    ],

  },
  methods: {
    //标题输入
    titleInput: function (e) {
      var _this = this
      _this.setData({
        ['form.title']: e.detail.value
      })
    },

    //内容输入
    titleInput: function (e) {
      var _this = this
      _this.setData({
        ['form.text']: e.detail.value
      })
    },

    //分类
    classifyToString: function (event) {
      var _this = this
      _this.setData({
        ['form.classify']: event.detail.value
      })
    },

    //交接方式
    wayToString: function (event) {
      var _this = this
      _this.setData({
        ['form.way']: event.detail.value
      })
    },

    //点击添加选择
    chooseSource: function () {
      var _this = this;
      wx.showActionSheet({
        itemList: ["拍照", "从相册中选择"],
        itemColor: "#ECBC28",
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
      if (_this.data.form.imgList != null) {
        len = _this.data.form.imgList.length
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
          let tempFilePathsImg = _this.data.form.imgList
          // 获取当前已上传的图片的数组
          var tempFilePathsImgs = tempFilePathsImg.concat(imgList)
          // console.log(tempFilePathsImgs)
          var filePath = imgList[0];

          var filename = filePath.substr(filePath.lastIndexOf('/') + 1);
          cos.postObject({
            Bucket: config.Bucket,
            Region: config.Region,
            Key: 'petImg/' + filename,
            FilePath: filePath,
            onProgress: function (info) {
              console.log(JSON.stringify(info));
            }
          }, function (err, data) {
            _this.setData({
              ['form.imgList[' + len + ']']: data.headers.location
            })
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
        current: _this.data.form.imgList[index],
        urls: _this.data.form.imgList
      })
    },
    // 长按删除
    deleteImg: function (e) {
      var _this = this;
      var imgList = _this.data.form.imgList;
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
            ['form.imgList']: imgList
          })
        }
      })
    },

    //发布动态
    submit: function () {
      var _this = this
      // for(var i = 0;i<_this.data.imgList.length;i++){
      //   var filePath = _this.data.imgList[i];
      //   console.log('5')
      //   // console.log(filePath)
      //   var filename = filePath.substr(filePath.lastIndexOf('/') + 1);
      //   cos.postObject({
      //     Bucket: config.Bucket,
      //     Region: config.Region,
      //     Key: 'petImg/' + filename,
      //     FilePath: filePath,
      //     onProgress: function (info) {
      //         console.log(JSON.stringify(info));
      //     }
      // }, function (err, data) {
      //     // console.log( data.headers.location);
      //     _this.setData({
      //       ["imgList["+i+"]"]:data.headers.location
      //     })
      //     // console.log(_this.data.imgList)
      // });
      // }

      var form = _this.data.form
      for (var item in form) {
        if (!form[item]) { //验证form表单是否填写完整
          wx.showToast({
            title: '请将信息填写完整',
            icon: 'none',
            duration: 1500
          })
          return;
        }
      }

      postList.add({
          data: ({
            openId: getApp().globalData._id,
            userName: getApp().globalData.userInfo.nickName,
            title: _this.data.form.title,
            content: _this.data.form.text,
            way: _this.data.form.way,
            classify: _this.data.form.classify,
            imgList: _this.data.form.imgList,
            time: new Date()
          })
        })
        .then(res => {
          wx.showToast({
            title: '已发布',
            icon: 'success'
          })
          // console.log(res)
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      console.log(getApp().globalData.userInfo)
      console.log(getApp().globalData.isAll)
      console.log(getApp().globalData._id)
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