// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数

exports.main = async (event, context) => {
  console.log(event)
  const wxContext = cloud.getWXContext()
  try {
    const result = await cloud.openapi.security.msgSecCheck({
      version: "2",
      openid: wxContext.OPENID,
      scene: 3,
      content: event.content,
      title: event.title
    })
    return result
  } catch (err) {
    console.log(err) 
  }
}