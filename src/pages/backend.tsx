import React from 'react'
import { Route, Routes } from 'react-router'

import Authorized from '@/components/backend-authorized'
import BackendMenu from '@/components/backend-menu'
import FrontendNavigation from '@/components/frontend-navigation'
import ReloadPrompt from '@/components/reload-prompt'
import AdminList from './backend/admin-list'
import AdminModify from './backend/admin-modify'
import ArticleInsert from './backend/article-insert'
import ArticleList from './backend/article-list'
import ArticleModify from './backend/article-modify'
import CategoryInsert from './backend/category-insert'
import CategoryList from './backend/category-list'
import CategoryModify from './backend/category-modify'
import Comment from './backend/comment'
import Login from './backend/login'
import UserList from './backend/user-list'
import UserModify from './backend/user-modify'

function Backend() {
    const location = useLocation()
    return (
        <div className="backend">
            <FrontendNavigation />
            <div className="main wrap">
                <div className="main-left">
                    <div className="home-feeds cards-wrap">
                        <Routes key={location.pathname}>
                            <Route element={<Login />} path="/backend" />
                            <Route element={<Authorized component={AdminList} />} path="/backend/admin/list" />
                            <Route element={<Authorized component={AdminModify} />} path="/backend/admin/modify/:id" />
                            <Route element={<Authorized component={ArticleList} />} path="/backend/article/list" />
                            <Route element={<Authorized component={ArticleInsert} />} path="/backend/article/insert" />
                            <Route element={<Authorized component={ArticleModify} />} path="/backend/article/modify/:id" />
                            <Route element={<Authorized component={Comment} />} path="/backend/article/comment/:id" />
                            <Route element={<Authorized component={CategoryList} />} path="/backend/category/list" />
                            <Route element={<Authorized component={CategoryInsert} />} path="/backend/category/insert" />
                            <Route element={<Authorized component={CategoryModify} />} path="/backend/category/modify/:id" />
                            <Route element={<Authorized component={UserList} />} path="/backend/user/list" />
                            <Route element={<Authorized component={UserModify} />} path="/backend/user/modify/:id" />
                        </Routes>
                    </div>
                </div>
                <BackendMenu />
            </div>
            <ReloadPrompt />
        </div>
    )
}

export default Backend
