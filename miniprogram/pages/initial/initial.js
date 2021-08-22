// pages/initial/initial.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: false
  },

  onLogin: function(){
    console.log("hello")
    wx.getStorage({
      key: 'profile',
      success (res) {
        setTimeout(function(){wx.switchTab({url: '../index1/index1'})}, 350)
      },
      fail(res){
        console.warn(res)
        wx.getUserProfile({
            desc: '用于完善用户资料',
            success: function(res) {
              setTimeout(function(){wx.switchTab({url: '../index1/index1'})}, 350)
              var userInfo = res.userInfo
              try {
                wx.setStorageSync('profile', {
                  nickName:userInfo.nickName,
                  avatarUrl: userInfo.avatarUrl
                })
              } catch (e) {console.log(e)}
            },
            fail: function(){
              wx.showModal({
                title:"需要授权",
                content:"详情可以查看我们的隐私标准。",
                showCancel: false,
                success (res) {
                  if (res.confirm) {
                    wx.reLaunch({
                     url: '../initial/initial'
                    })
                  }
                }
              })
            }
        })
      }
    })
    
    this.setData({
      active: true
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