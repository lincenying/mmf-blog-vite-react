import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import Avatar from '@/components/avatar'

import { globalState, showLoginModal } from '@/store/global'

export default function Navigation() {
    const navigate = useNavigate()
    const global = useSelector(globalState)
    const dispatch = useDispatch()

    const [isLogin] = useState(!!global.cookies.user)

    const handleLogin = () => {
        dispatch(showLoginModal(true))
    }

    const handleSearch = (e: any) => {
        const key = e.target.value
        if (e.keyCode === 13 && key !== '') {
            navigate(`/search/${key}`)
        }
    }

    const loginText = isLogin ? (
        <span className="nav-me">
            <Link className="nav-me-link" to="/user/account">
                <Avatar classNames="nav-avatar-img" email={global.cookies.useremail} />
            </Link>
        </span>
    ) : (
        <span className="nav-me">
            <a className="nav-me-link" href={undefined} onClick={handleLogin}>
                <Avatar classNames="nav-avatar-img" />
            </a>
        </span>
    )

    return (
        <nav className="global-nav">
            <div className="wrap">
                <div className="left-part">
                    <Link className="logo-link" to="/">
                        <i className="icon icon-nav-logo" />
                        <span className="hidden">M.M.F 小屋</span>
                    </Link>
                    <div className="main-nav">
                        <NavLink className={({ isActive }) => `nav-link${isActive ? ' current' : ''}`} to="/">
                            <i className="icon icon-nav-home" />
                            <span className="text">首页</span>
                        </NavLink>
                        <NavLink className={({ isActive }) => `nav-link${isActive ? ' current' : ''}`} to="/trending/visit">
                            <i className="icon icon-nav-explore" />
                            <span className="text">热门</span>
                        </NavLink>
                        <NavLink className={({ isActive }) => `nav-link${isActive ? ' current' : ''}`} to="/about">
                            <i className="icon icon-nav-features" />
                            <span className="text">关于</span>
                        </NavLink>
                    </div>
                </div>
                <div className="right-part">
                    <span className="nav-search">
                        <i className="icon icon-search-white" />
                        <input className="nav-search-input" onKeyUp={handleSearch} placeholder="记得按回车哦" />
                    </span>
                    {loginText}
                </div>
            </div>
        </nav>
    )
}
