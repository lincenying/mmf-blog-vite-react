import md5 from 'md5'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Link, NavLink } from 'react-router-dom'

import { globalState, showLoginModal } from '@/store/global'

export default function Navigation(props) {
    const global = useSelector(globalState)
    const dispatch = useDispatch()

    const [isLogin] = useState(!!global.cookies.user)

    const handleLogin = () => {
        dispatch(showLoginModal(true))
    }

    const handleSearch = e => {
        var key = e.target.value
        if (e.keyCode === 13 && key !== '') {
            props.history.push(`/search/${key}`)
        }
    }
    const avatar = (email = 'lincenying@126.com') => {
        return `https://fdn.geekzu.org/avatar/${md5(email)}?s=256&d=identicon&r=g`
    }

    const loginText = isLogin ? (
        <span className="nav-me">
            <Link to="/user/account" className="nav-me-link">
                <img src={avatar(global.cookies.useremail)} className="nav-avatar-img" />
            </Link>
        </span>
    ) : (
        <span className="nav-me">
            <a onClick={handleLogin} href={null} className="nav-me-link">
                <img src={avatar('')} className="nav-avatar-img" />
            </a>
        </span>
    )

    return (
        <nav className="global-nav">
            <div className="wrap">
                <div className="left-part">
                    <Link to="/" className="logo-link">
                        <i className="icon icon-nav-logo" />
                        <span className="hidden">M.M.F 小屋</span>
                    </Link>
                    <div className="main-nav">
                        <NavLink activeClassName="current" to="/" exact className="nav-link">
                            <i className="icon icon-nav-home" />
                            <span className="text">首页</span>
                        </NavLink>
                        <NavLink activeClassName="current" to="/trending/visit" className="nav-link">
                            <i className="icon icon-nav-explore" />
                            <span className="text">热门</span>
                        </NavLink>
                        <NavLink activeClassName="current" to="/about" className="nav-link">
                            <i className="icon icon-nav-features" />
                            <span className="text">关于</span>
                        </NavLink>
                    </div>
                </div>
                <div className="right-part">
                    <span className="nav-search">
                        <i className="icon icon-search-white" />
                        <input onKeyUp={handleSearch} placeholder="记得按回车哦" className="nav-search-input" />
                    </span>
                    {loginText}
                </div>
            </div>
        </nav>
    )
}
