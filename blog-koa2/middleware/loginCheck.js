const { ErrorModel } = require('../model/resModel')

//中间件，用于处理是否处于登录状态
module.exports = async (ctx, next) => {
    //判断session是否在
    if (ctx.session.username) {
        await next()
        return 
    }
    ctx.body = new ErrorModel('未登录')
}