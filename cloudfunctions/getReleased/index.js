// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    
    const wxContext = cloud.getWXContext()
    const db = cloud.database()
    
    // console.log(event.openId)
    // released.where({
    //     openId:event.openId
    // })
    // .get().then(res => {
    //     console.log(res)
    // })
    return db.collection('postList').where({
        _id:event.openId
    })
    .get()
    
}