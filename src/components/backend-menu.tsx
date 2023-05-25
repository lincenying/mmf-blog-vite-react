import React from 'react'
import { NavLink } from 'react-router-dom'

function BackendMenu() {
    const location = useLocation()
    const isLogin = location.pathname !== '/backend'
    return !isLogin
        ? (
        <span />
            )
        : (
        <div className="main-right">
            <div className="card card-me">
                <NavLink to="/backend/admin/list" className={({ isActive }) => `side-entry${isActive ? ' active' : ''}`}>
                    <i className="icon icon-arrow-right" />
                    <i className="icon icon-menu-articles" />
                    管理帐号
                </NavLink>
                <NavLink to="/backend/user/list" className={({ isActive }) => `side-entry${isActive ? ' active' : ''}` }>
                    <i className="icon icon-arrow-right" />
                    <i className="icon icon-menu-articles" />
                    用户列表
                </NavLink>
            </div>
            <div className="card card-me">
                <NavLink to="/backend/category/insert" className={({ isActive }) => `side-entry${isActive ? ' active' : ''}` }>
                    <i className="icon icon-arrow-right" />
                    <i className="icon icon-menu-articles" />
                    添加分类
                </NavLink>
                <NavLink to="/backend/category/list" className={({ isActive }) => `side-entry${isActive ? ' active' : ''}` }>
                    <i className="icon icon-arrow-right" />
                    <i className="icon icon-menu-articles" />
                    管理分类
                </NavLink>
                <NavLink to="/backend/article/insert" className={({ isActive }) => `side-entry${isActive ? ' active' : ''}` }>
                    <i className="icon icon-arrow-right" />
                    <i className="icon icon-menu-articles" />
                    发布文章
                </NavLink>
                <NavLink to="/backend/article/list" className={({ isActive }) => `side-entry${isActive ? ' active' : ''}` }>
                    <i className="icon icon-arrow-right" />
                    <i className="icon icon-menu-articles" />
                    管理文章
                </NavLink>
            </div>
        </div>
            )
}
export default BackendMenu
