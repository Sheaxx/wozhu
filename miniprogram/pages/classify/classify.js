// pages/classify/classify.js

const postList = wx.cloud.database().collection('postList')

Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    msgList:[]
  },
  methods: {
    //顶部导航栏
    switchTopTab(e) {
      var _this = this
      let tab = e.currentTarget.id
      console.log(tab)
      if (tab === 'strayAnimal') {
        this.setData({ 
          currentTab: 0 ,
        })
        _this.getList("流浪动物")
      } else if (tab === 'petFostering') {
        this.setData({ currentTab: 1 })
        _this.getList("宠物寄养")
      } else if (tab === 'petTransfer'){
        this.setData({ currentTab: 2 })
        _this.getList("宠物转赠")
      }
    },

    //跳转到详情页
    itemClick:function(event){

      console.log(event)
      wx.navigateTo({
        url:'../msgDetails/msgDetails?_id='+event.currentTarget.dataset.index[0]._id
        
      })
    },

    getList:function(e){
      
      var _this = this
      this.setData({
        msgList:null
      })
      wx.cloud.database().collection('postList').where({
        classify:e
      })
      .get()
      .then(res => {
        if(res.data == null){
          _this.setData({
            msgList:null
          })
        }
        else{
          for(var i =0;i<res.data.length;i++){
            // var img = res.data[i].imgList[0]
            
            _this.setData({
              // ["msgList["+i+"].image"]:img,
              // ["msgList["+i+"].title"]:res.data[i].title,
                  ["msgList["+i+"].title"] : res.data[i].title,
                  ["msgList["+i+"].image"] : res.data[i].imgList[0],
                  ["msgList["+i+"].openId"] : res.data[i].openId,
                  ["msgList["+i+"]._id"] : res.data[i]._id
                
              
            })
          }
        }
        
        

      })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.setData({
        currentTab:options.tab
      })
      console.log("#####################################3")
      this.getList("流浪动物")
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
  }
})