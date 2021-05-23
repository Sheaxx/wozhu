Component({
  data: {
    selected: 0,
    backgroundColor: "#000000",
    color: "#7A7E83",
    selectedColor: "#ECBC28",
    list: [
      {
        pagePath:"/pages/index/index",
        text:"首页",
        iconPath: "/images/icon/index.png",
        selectedIconPath: "/images/icon/index-active.png"
      },
      {
        pagePath:"/pages/classify/classify",
        text:"分类",
        iconPath: "/images/icon/classify.png",
        selectedIconPath: "/images/icon/classify-active.png"
      },
      {
        pagePath:"/pages/new/new",
        text:"",
        iconPath: "/images/icon/new.png",
        selectedIconPath: "/images/icon/new.png"
      },
      {
        pagePath: "/pages/wish/wish",
        text:"愿望单",
        iconPath: "/images/icon/wish.png",
        selectedIconPath: "/images/icon/wish-active.png"
      },
      {
        pagePath: "/pages/mine/mine",
        text:"我的",
        iconPath: "/images/icon/mine.png",
        selectedIconPath: "/images/icon/mine-active.png"
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})