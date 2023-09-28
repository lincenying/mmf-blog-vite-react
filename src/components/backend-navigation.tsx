import React from 'react'

function Navigation() {
    return (
        <nav className="global-nav">
            <div className="wrap">
                <div className="left-part">
                    <a className="logo-link" href="/">
                        <i className="icon icon-nav-logo" />
                        <span className="hidden">M.M.F 小屋</span>
                    </a>
                    <div className="main-nav">
                        <a className="nav-link" href="/">
                            <i className="icon icon-nav-home" />
                            <span className="text">首页</span>
                        </a>
                        <a className="nav-link" href="/trending/visit">
                            <i className="icon icon-nav-explore" />
                            <span className="text">热门</span>
                        </a>
                        <a className="nav-link" href="/about">
                            <i className="icon icon-nav-features" />
                            <span className="text">关于</span>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Navigation
