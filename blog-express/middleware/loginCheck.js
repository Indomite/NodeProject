const { ErrorModel } = require('../model/resModel')

//中间件，用于处理是否处于登录状态
module.exports = (req, res, next) => {
    //判断session是否在
    if (req.session.username) {
        next()
        return 
    }
    res.json(
        new ErrorModel('未登录')
    )
}