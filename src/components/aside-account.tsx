import React from 'react'
import { NavLink } from 'react-router-dom'
import api from '@/api'

function AsideAccount() {
    const handleLogout = useLockFn(async () => {
        await api.post('frontend/user/logout')
        window.location.href = '/'
    })

    return (
        <div className="card card-me">
            <NavLink className="side-entry" to="/user/account">
                <i className="icon icon-arrow-right" />
                <i className="icon icon-menu-articles" />
                {' '}
                帐号
            </NavLink>
            <NavLink className="side-entry" to="/user/password">
                <i className="icon icon-arrow-right" />
                <i className="icon icon-menu-articles" />
                {' '}
                密码
            </NavLink>
            <a className="side-entry" href={undefined} onClick={handleLogout}>
                <i className="icon icon-arrow-right" />
                <i className="icon icon-menu-articles" />
                {' '}
                退出
            </a>
        </div>
    )
}
export default React.memo(AsideAccount)
