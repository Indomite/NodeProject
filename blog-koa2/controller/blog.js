const xss = require('xss')
const { exec } = require('../db/mysql')

//获取文章列表
const getList = async (author, keyword) => {
    //1=1，当没有作者和关键词信息时，不会报错
    //sql语句拼接
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    return await exec(sql)
}

//获取文章具体
const getDetail = async (id) => {
    const sql = `select * from blogs where id='${id}'`
    const rows = await exec(sql)
    return rows[0]
}

//新建博客列表
const newBlog = async (blogData = {}) => {
    // blogData 是一个博客对象，包含 title content author 属性
    const title = xss(blogData.title)
    // console.log('title is', title)
    const content = xss(blogData.content)
    const author = blogData.author
    const createTime = Date.now()

    const sql = `
        insert into blogs (title, content, createtime, author)
        values ('${title}', '${content}', ${createTime}, '${author}');
    `
    const insertData = await exec(sql)
    return {
        id: insertData.insertId
    }
    
    // return exec(sql).then(insertData => {
    //     // console.log('insertData is ', insertData)
    //     return {
    //         id: insertData.insertId
    //     }
    // })
}

//更新博客
const updateBlog = async (id, blogData = {}) => {
    // id 就是要更新博客的 id
    // blogData 是一个博客对象，包含 title content 属性

    const title = xss(blogData.title)
    const content = xss(blogData.content)

    const sql = `
        update blogs set title='${title}', content='${content}' where id=${id}
    `
    const updateDate = await exec(sql) 
    if(updateDate.affectedRows > 0){
        return true
    }
    return false

    // return exec(sql).then(updateData => {
    //     // console.log('updateData is ', updateData)
    //     if (updateData.affectedRows > 0) {
    //         return true
    //     }
    //     return false
    // })
}

//删除博客
const delBlog = async (id, author) => {
    // id 就是要删除博客的 id
    const sql = `delete from blogs where id='${id}' and author='${author}';`
    const delData = await exec(sql)
    if (delData.affectedRows > 0) {
        return true
    }
    return false
    // return exec(sql).then(delData => {
    //     // console.log('delData is ', delData)
    //     if (delData.affectedRows > 0) {
    //         return true
    //     }
    //     return false
    // })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}