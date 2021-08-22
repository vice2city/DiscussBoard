// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  console.log(event)
  
  const res1 = await db.collection('discuss').where({
    _id: event.discussid,
    "discuss.ideaid": event.ideaid,
  })
  .update({
    data:{
      "discuss.$.like" : _.addToSet(openid)
    }
  })
  console.log(res1)
  if(res1.stats.updated > 0){
    return("点赞成功")
  }else{
    const res2 = await db.collection('discuss').where({
      _id: event.discussid,
      "discuss.ideaid": event.ideaid,
    })
    .update({
      data:{
        "discuss.$.like": _.pull(openid)
      }
    })
    console.log(res2)
    return("取消点赞成功")
  }
}