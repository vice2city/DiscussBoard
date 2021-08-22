Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#4A77D2",
    list: [{
      isicon: false,
      pagePath: "../index1/index1",
      text: "我创建的"
    }, {
      isicon: true,
      pagePath: "../create/create",
      text: "+"
    }, {
      isicon: false,
      pagePath: "../index2/index2",
      text: "我加入的"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      if(data.isicon) wx.navigateTo({url})
      else wx.switchTab({url})
    }
  },
  onload: function(){
    console.log(this.getTabBar)
  }
})