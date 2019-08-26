export function getCurrentAuthority() {
    return ['user']
}

// 判断用户角色，分配权限
export function check(authority) {
    const current = getCurrentAuthority()
    return current.some(item => authority.includes(item))
}

// 判断登录权限
export function isLogin() {
    const current = getCurrentAuthority()
    return current && current[0] !== 'guest'
}