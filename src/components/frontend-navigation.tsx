import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { globalState, showLoginModal } from '@/store/global'

import Avatar from '@/components/avatar'

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
        if (e.keyCode === 13 && key !== '')
            navigate(`/search/${key}`)
    }

    const loginText = isLogin
        ? (
        <span className="nav-me">
            <Link to="/user/account" className="nav-me-link">
                <Avatar email={global.cookies.useremail} classNames={'nav-avatar-img'} />
            </Link>
        </span>
            )
        : (
        <span className="nav-me">
            <a onClick={handleLogin} href={undefined} className="nav-me-link">
                <Avatar classNames={'nav-avatar-img'} />
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
                        <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? ' current' : ''}` }>
                            <i className="icon icon-nav-home" />
                            <span className="text">首页</span>
                        </NavLink>
                        <NavLink to="/trending/visit" className={({ isActive }) => `nav-link${isActive ? ' current' : ''}` }>
                            <i className="icon icon-nav-explore" />
                            <span className="text">热门</span>
                        </NavLink>
                        <NavLink to="/about" className={({ isActive }) => `nav-link${isActive ? ' current' : ''}` }>
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
