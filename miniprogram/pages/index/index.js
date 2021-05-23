// index.js



// 获取应用实例
const db = wx.cloud.database()
const postList = db.collection('postList')

Component({

  

  pageLifetimes: {
    
    show() {
      var _this = this
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
        
        if(getApp().globalData.isAll == true){
          postList.field({
            _id:false,
            title:true,
            imgList:true
          })
          .get()
          .then(res => {
            console.log(res.data)
            console.log(getApp().globalData.isAll)
            for(var i =0;i<res.data.length;i++){
              _this.setData({
                ["msgList["+i+"].title"] : res.data[i].title,
                ["msgList["+i+"].image"] : res.data[i].imgList[0]
              })
            }
            
          })
        }else{
          _this.setData({
            msgList:getApp().globalData.msgList
          })
        }

        
        

      }
    }
  },
  data: {
    mineInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false

    msgList: [],
    RmsgList:[]//倒序的列表
  },

  methods: {
    //跳转到搜索页
    toSearch:function(){
      wx.navigateTo({
        url: './search/search',
      })
    },

    //跳转到流浪动物
    tostrayAnimal:function(){
      wx.reLaunch({
        url:'../classify/classify?tab=0'
      })
    },

    //跳转到宠物寄养
    toPetFostering:function(){
      wx.reLaunch({
        url:'../classify/classify?tab=1'
      })
    },

    //跳转到宠物转养
    toPetTransfer:function(){
      wx.reLaunch({
        url:'../classify/classify?tab=2'
      })
    },

    //跳转到详情页
    itemClick:function(){
      wx.navigateTo({
        
      })
    },

    //返回顶部
    toTop:function(){
      wx.pageScrollTo({
        scrollTop: 0
      })
    },

    /**
   * 生命周期函数--监听页面显示
   */
    onShow: function () {
      var RmsgList = this.data.msgList
      RmsgList.reverse()
      console.log("hhh")
      console.log(msgList)
      console.log(RmsgList)
      console.log("hhh")
      this.setData({
        RmsgList:RmsgList
      })
    },

    // 事件处理函数
    bindViewTap() {
      wx.navigateTo({
        url: '../logs/logs'
      })
    },
    onLoad() {
      var _this = this
      // if (wx.getUserProfile) {
      //   this.setData({
      //     canIUseGetUserProfile: true
      //   })
      // }
      console.log(getApp().globalData.isAll)

      // postList.field({
      //   _id:false,
      //   title:true,
      //   imgList:true
      // })
      // .get()
      // .then(res => {
        
      //   _this.setData({
      //     msgList:res.data
      //   })
        
      // })
    },
    getUserProfile(e) {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    },
    getUserInfo(e) {
      // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
      console.log(e)
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
    
  }
})