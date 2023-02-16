import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const BackendMenu = () => {
    const location = useLocation()
    const isLogin = location.pathname !== '/backend'
    return !isLogin ? (
        <span />
    ) : (
        <div className="main-right">
            <div className="card card-me">
                <NavLink to="/backend/admin/list" activeclassname="active" className="side-entry">
                    <i className="icon icon-arrow-right" />
                    <i className="icon icon-menu-articles" />
                    管理帐号
                </NavLink>
                <NavLink to="/backend/user/list" activeclassname="active" className="side-entry">
                    <i className="icon icon-arrow-right" />
                    <i className="icon icon-menu-articles" />
                    用户列表
                </NavLink>
            </div>
            <div className="card card-me">
                <NavLink to="/backend/category/insert" activeclassname="active" className="side-entry">
                    <i className="icon icon-arrow-right" />
                    <i className="icon icon-menu-articles" />
                    添加分类
                </NavLink>
                <NavLink to="/backend/category/list" activeclassname="active" className="side-entry">
                    <i className="icon icon-arrow-right" />
                    <i className="icon icon-menu-articles" />
                    管理分类
                </NavLink>
                <NavLink to="/backend/article/insert" activeclassname="active" className="side-entry">
                    <i className="icon icon-arrow-right" />
                    <i className="icon icon-menu-articles" />
                    发布文章
                </NavLink>
                <NavLink to="/backend/article/list" activeclassname="active" className="side-entry">
                    <i className="icon icon-arrow-right" />
                    <i className="icon icon-menu-articles" />
                    管理文章
                </NavLink>
            </div>
        </div>
    )
}
export default BackendMenu
