// 云函数入口文件
const cloud = require('wx-server-sdk')
const db = cloud.database()
const user = db.collection('User')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()

    try {
        return await user.where({
            _id:event.openid
        })
        .update({
            data:{
                userName:event.userName,
                avatarUrl:event.avatarUrl
            }
        })
        
    } catch (error) {
        console.error(error)
    }
}