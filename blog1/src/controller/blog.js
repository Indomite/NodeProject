const { exec } = require('../db/mysql')

const getList = (author, keyword) => {

    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql +=  `and author = '${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    //返回 promise
    return exec(sql)

    // //先返回假数据 格式是正确的
    // return [
    //     {
    //         id: 1,
    //         titile: 'title A',
    //         content: 'Blog A',
    //         createTime: 12368791264,
    //         author: 'zhangsan'
    //     },
    //     {
    //         id: 2,
    //         titile: 'title B',
    //         content: 'Blog B',
    //         createTime: 123435231264,
    //         author: 'lisi'
    //     }
    // ]
}

const getDetail = (id) => {
    const sql = `select * from blogs where id='${id}'`
    return exec(sql).then(rows => {
        return rows[0]
    })

    //先返回数据
    // return {
    //     id: 2,
    //     titile: 'title B',
    //     content: 'Blog B',
    //     createTime: 123435231264,
    //     author: 'lisi'
    // }
}

const newBlog = (blogData = {}) => {
    const title = blogData.title
    const content = blogData.content
    const author = blogData.author
    const createTime = Date.now()

    const sql = `
        insert into blogs (title,content,createtime,author) 
        values ('${title}','${content}','${createTime}','${author}');
    `

    return exec(sql).then(insertData => {
        console.log(insertData)
        return {
            id: insertData.insertId
        }
    })
    // return {
    //     id: 3
    // }
}

const updateBlog = (id, blogData = {}) => {
    //id就是要更新的博客
    //blogData 是一个博客对象
    // console.log('blogDaTA:', id , blogData);

    const title = blogData.title
    const content = blogData.content
    sql = `
        update blogs set title = '${title}', content = '${content}' where id = '${id}'
    `
    return exec(sql).then(updateDate => {
        console.log(updateDate);
        if (updateDate.affectedRows > 0) {
            return true
        }
        return false
    })
}

const delBlog = (id,author) => {
    //id就是要删除的博客
    const sql = `
        delete from blogs where id='${id}' and author='${author}'
    `
    return exec(sql).then(delData => {
        if (delData.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}