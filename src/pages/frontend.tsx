import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Route, Routes } from 'react-router-dom'

import NotFound from './frontend/404'

import About from './frontend/about'
import Article from './frontend/article'
import Main from './frontend/topics'
import userAccount from './frontend/user-account'
import userPassword from './frontend/user-password'
import ReloadPrompt from '@/components/reload-prompt'
import Sign from '@/components/sign'
import Authorized from '@/components/frontend-authorized'
import FrontendNavigation from '@/components/frontend-navigation'

const Frontend = () => {
    const location = useLocation()
    return (
        <div className="frontend">
            <FrontendNavigation />
            <TransitionGroup appear className="main-wrap">
                <CSSTransition classNames="slide-left" in={false} key={location.key} timeout={{ appear: 300, enter: 300, exit: 300 }}>
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/trending/:by" element={<Main />} />
                        <Route path="/category/:id" element={<Main />} />
                        <Route path="/search/:key" element={<Main />} />
                        <Route path="/article/:id" element={<Article />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/user/account" element={<Authorized path="/user/account" component={userAccount} />} />
                        <Route path="/user/password" element={<Authorized path="/user/password" component={userPassword} />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </CSSTransition>
            </TransitionGroup>
            <Sign />
            <ReloadPrompt />
        </div>
    )
}

export default Frontend
