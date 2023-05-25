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
            <NavLink to="/user/account" className="side-entry">
                <i className="icon icon-arrow-right" />
                <i className="icon icon-menu-articles" />
                帐号
            </NavLink>
            <NavLink to="/user/password" className="side-entry">
                <i className="icon icon-arrow-right" />
                <i className="icon icon-menu-articles" />
                密码
            </NavLink>
            <a href={undefined} onClick={handleLogout} className="side-entry">
                <i className="icon icon-arrow-right" />
                <i className="icon icon-menu-articles" />
                退出
            </a>
        </div>
    )
}
export default React.memo(AsideAccount)
