function form(method) {
    let res = null
    switch (method) {
    case "POST":
        res = { message: '付款成功' }
        break
    default:
        res = null
    }
    return res
}

module.exports = form