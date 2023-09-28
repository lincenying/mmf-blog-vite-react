import React from 'react'
import { NavLink } from 'react-router-dom'

function BackendMenu() {
    const location = useLocation()
    const isLogin = location.pathname !== '/backend'
    return !isLogin ? (
        <span />
    ) : (
        <div className="main-right">
            <div className="card card-me">
                <NavLink className={({ isActive }) => `side-entry${isActive ? ' active' : ''}`} to="/backend/admin/list">
                    <i className="icon icon-arrow-right" />
                    <i className="icon icon-menu-articles" />{' '}
                    管理帐号
                </NavLink>
                <NavLink className={({ isActive }) => `side-entry${isActive ? ' active' : ''}`} to="/backend/user/list">
                    <i className="icon icon-arrow-right" />
                    <i className="icon icon-menu-articles" />{' '}
                    用户列表
                </NavLink>
            </div>
            <div className="card card-me">
                <NavLink className={({ isActive }) => `side-entry${isActive ? ' active' : ''}`} to="/backend/category/insert">
                    <i className="icon icon-arrow-right" />
                    <i className="icon icon-menu-articles" />{' '}
                    添加分类
                </NavLink>
                <NavLink className={({ isActive }) => `side-entry${isActive ? ' active' : ''}`} to="/backend/category/list">
                    <i className="icon icon-arrow-right" />
                    <i className="icon icon-menu-articles" />{' '}
                    管理分类
                </NavLink>
                <NavLink className={({ isActive }) => `side-entry${isActive ? ' active' : ''}`} to="/backend/article/insert">
                    <i className="icon icon-arrow-right" />
                    <i className="icon icon-menu-articles" />{' '}
                    发布文章
                </NavLink>
                <NavLink className={({ isActive }) => `side-entry${isActive ? ' active' : ''}`} to="/backend/article/list">
                    <i className="icon icon-arrow-right" />
                    <i className="icon icon-menu-articles" />{' '}
                    管理文章
                </NavLink>
            </div>
        </div>
    )
}
export default BackendMenu
