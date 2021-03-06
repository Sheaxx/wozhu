// pages/mine/personal/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fromCreateOrder:false,
    addressList: [{
      consigneeName: "阿絮",
      telNumber: "1134778941",
      region: ["北京市", "北京市", "东城区"],
      detailAddress: "四季山庄四季山庄四季山庄四季山庄四季山庄"
      },
      {
        consigneeName: "阿絮",
        telNumber: "1134778941",
        region: ["北京市", "北京市", "东城区"],
        detailAddress: "四季山庄"
      }
    ]
  },

  //增加地址
  addAddress: function () {
    wx.navigateTo({
      url: './address/address',
    })
  },

  //删除地址
  delAddress: function (e) {
    let _this = this;
    let index = e.target.dataset.index
    let newList = _this.data.addressList
    wx.showModal({
      title: '提示',
      content: '确认要删除该地址吗?',
      success: function (res) {
        if (res.confirm) {
          newList.splice(index, 1);
        } else if (res.cancel) {
          return false
        }
        if (_this.data.addressList.length > 0) {
          _this.setData({
            addressList: _this.data.addressList
          })
          wx.setStorageSync('addressList', _this.data.addressList);
        } else {
          _this.setData({
            addressList: _this.data.addressList
          })
          wx.setStorageSync('addressList', []);
        }
      }
    })
  },

  //选择地址
  selectAddress:function(e){
    if(this.data.fromCreateOrder){
      let index = e.currentTarget.dataset.index;
      let _this = this;
      let pages = getCurrentPages();//当前页面
      let prevPage = pages[pages.length-2];//上一页面
      let consigneeName = _this.data.addressList[index].consigneeName;
      let telNumber = _this.data.addressList[index].telNumber;
      let region = _this.data.addressList[index].region;
      let detailAddress = _this.data.addressList[index].detailAddress;
      prevPage.setData({//直接给上移页面赋值
        ['info.consigneeName']:consigneeName,
        ['info.telNumber']:telNumber,
        ['info.region']:region,
        ['info.detailAddress']:detailAddress,
        selAddress:'yes'
      });
      wx.navigateBack({
        delta: 1,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      fromCreateOrder:options.fromCreateOrder
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