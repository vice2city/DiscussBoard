// pages/join/join.js
const db = wx.cloud.database() 
const _ = db.command
let discussid = ""
let discussname = ""
let avatarUrl = ""
let nickname= ""

function RndNum(n){
  var rnd="";
  for(var i=0;i<n;i++) rnd+=Math.floor(Math.random()*10);
  return rnd;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  formSubmit: function(e){
    const value = e.detail.value
    wx.showLoading({
      title: '正在提交',
      mask: true
    })

    wx.cloud.callFunction({
      name:"msgSecCheck",
      data:{
        title: value.idea,
        content: value.content
      }
    })
    .then(res => {
      console.log(res)
      if(res.result.result.suggest!="pass"){
        wx.hideLoading()
        wx.showModal({
          title: '提交失败',
          content: '文本含有违法违规内容，请修改后重新提交。',
          showCancel: false
        })
        return
      }
      db.collection('discuss').where({
        _id: discussid
      })
      .update({
        // data 字段表示需新增的 JSON 数据
        data: {
          discuss: _.push([{
            content: value.content,
            ideaid: RndNum(6),
            idea: value.idea,
            like: [],
            proposer:{
             avatarUrl: avatarUrl,
             nickname: nickname,
             openid:'{openid}'
            }
          }])
        }
      })
      .then(res => {
        console.log(res)
        db.collection('user').where({
          _openid:'{openid}'
        })
        .update({
          data:{
            joinList: _.addToSet({
              name: discussname,
              discussid: discussid
            })
          }
        })
        .then(res=>{
          console.log(res)
          wx.hideLoading()
          wx.navigateBack()
        })
        .catch(console.error)
      })
    })
  },

  formReset: function(e){
    wx.showToast({
      title: '已重置',
      icon: 'success',
      duration: 1000
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    discussid = options.id
    discussname = options.name
    wx.getStorage({
      key: 'profile',
      success (res) {
        avatarUrl = res.data.avatarUrl
        nickname = res.data.nickname
      },
      fail(res){
        console.warn(res)
        wx.showModal({
          title:"请登录",
          content:"我们需要个人信息来连接您和话题。",
          showCancel: false,
          success (res) {
            if (res.confirm) {
              wx.getUserProfile({
              desc: '用于完善用户资料',
              success: function(res) {
                var userInfo = res.userInfo
                avatarUrl = userInfo.avatarUrl
                nickname = userInfo.nickname
                try {
                  wx.setStorageSync('profile', {
                    nickName:userInfo.nickName,
                    avatarUrl: userInfo.avatarUrl
                  })
                } catch (e) {console.log(e)}
              },
              fail: function(res){
                console.log(res)
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
          }
        })
      }
    })
    wx.setNavigationBarTitle({
      title: '加入话题：'+ discussname
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