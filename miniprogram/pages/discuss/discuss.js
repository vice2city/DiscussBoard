// pages/discuss/discuss.js
const db = wx.cloud.database() 
const _ = db.command
let discussid = ""

Page({

  /**
   * 页面的初始数据
   */
  data: {
    discussDetail:{},
    openid: ""
  },

  joinDiscuss: function(){ 
    wx.navigateTo({
      url: '../join/join?id=' + discussid +'&name='+this.data.discussDetail.name
    })
  },

  onLike: function(e){
    const data = e.currentTarget.dataset
    const id = data.id
    wx.cloud.callFunction({
      name:"updateLike",
      data:{
        discussid: discussid,
        ideaid: id
      }
    })
    .then(res => {
      console.log(res)
      wx.startPullDownRefresh()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    discussid = options.id
    let that = this
    wx.getStorage({
      key: 'openid',
      success (res) {
        console.log(res)
        that.setData({
          openid: res.data
        })
      },
      fail(res){
        console.warn(res)
      }
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
    db.collection('discuss').where({
      _id: discussid
    })
    .get()
    .then(res => {
      console.log(res.data)
      this.setData({
        discussDetail: res.data[0]
      })
      wx.stopPullDownRefresh()
      wx.setNavigationBarTitle({
        title: '话题：'+ res.data[0].name
      })
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