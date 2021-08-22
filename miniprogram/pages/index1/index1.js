// pages/index1/index1.js
const tabindex = 0
const db = wx.cloud.database() 
const _ = db.command

function deleteDiscuss(id){
  db.collection('user').where({
    _openid:'{openid}'
  })
  .update({
    data:{
      createList: _.pull({
          discussid: id
        })
    }
  })
  .then(res => {
    console.log(res)
    wx.startPullDownRefresh()
  })
  .catch(err => {
    console.error(err)
  })
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    discussList:[],
    slideButtons: [{
      type: 'warn',
      text: '删除',
      extClass: 'warn',
    }]
  },

  openDiscuss: function(e){
    const data = e.currentTarget.dataset
    const id = data.id
    wx.navigateTo({
      url: '../discuss/discuss?id='+id
    })
  },

  deleteModal: function(e){
    const data = e.currentTarget.dataset
    const id = data.id
    wx.showModal({
      title:"要删除这条话题吗？",
      content:"删除后无法恢复。",
      success (res) {
        if (res.confirm) {
          deleteDiscuss(id)
        }
      }
    })
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
    const tabBar = this.getTabBar()
    tabBar.setData({
      selected: tabindex
    })
    wx.startPullDownRefresh()
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
    db.collection('user').where({
      _openid:'{openid}'
    })
      .get()
      .then(res => {
          this.setData({
            discussList: res.data[0].createList
          })
          wx.stopPullDownRefresh()
      })
      .catch(err => {
        console.error(err)
      })
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