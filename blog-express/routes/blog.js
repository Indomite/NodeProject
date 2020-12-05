var express = require('express');
var router = express.Router();
//调用controller下的方法
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck =require('../middleware/loginCheck')

//配置相关的路由
router.get('/list', (req, res, next) => {
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''
    //判断是否是admin
    if (req.query.isadmin) {
        console.log('isAdmin');
        // 管理员界面
        if (req.session.username == null) {
            console.error('isAdmin,but not login');
        // 未登录
            res.json(
                new ErrorModel('未登录')
            )
            return
        }
        // 强制查询自己的博客
        author = req.session.username
    }
    //传递参数获取文章
    const result = getList(author, keyword)
    return result.then(listData => {
        res.json(new SuccessModel(listData))
    })
});

//根据id获取具体的文章信息
router.get('/detail', (req, res, next) => {
    const result = getDetail(req.query.id)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
        return 
    })
});

//新建文章
router.post('/new', loginCheck, (req, res, next) => {
    //当前用户就是作者
    req.body.author = req.session.username
    //获取新的内容
    const result = newBlog(req.body)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
})

//更新文章信息
router.post('/update', loginCheck, (req, res, next) => {
    //相当于查看和新建的综合
    const result = updateBlog(req.query.id, req.body)
    return result.then(val => {
        if (val) {
            res.json(
                new SuccessModel()
            )
        } else {
            res.json(
                new ErrorModel('更新博客失败')
            )
        }
    })
})

//删除文章信息
router.post('/del', loginCheck, (req, res, next) => {
    const author = req.session.username
    const result = delBlog(req.query.id, author)
    return result.then(val => {
        if (val) {
            res.json(
                new SuccessModel()
            )
        } else {
            res.json(
                new ErrorModel('删除博客失败')
            )
        }
    })
})
module.exports = router;