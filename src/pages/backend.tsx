import React from 'react'
import { Route, Routes } from 'react-router-dom'

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
import ReloadPrompt from '@/components/reload-prompt'
import BackendMenu from '@/components/backend-menu'
import Authorized from '@/components/backend-authorized'
import FrontendNavigation from '@/components/frontend-navigation'

function Backend() {
    const location = useLocation()
    return (
        <div className="backend">
            <FrontendNavigation />
            <div className="main wrap">
                <div className="main-left">
                    <div className="home-feeds cards-wrap">
                        <Routes key={location.pathname}>
                            <Route path="/backend" element={<Login />} />
                            <Route path="/backend/admin/list" element={<Authorized component={AdminList} />} />
                            <Route path="/backend/admin/modify/:id" element={<Authorized component={AdminModify} />} />
                            <Route path="/backend/article/list" element={<Authorized component={ArticleList} />} />
                            <Route path="/backend/article/insert" element={<Authorized component={ArticleInsert} />} />
                            <Route path="/backend/article/modify/:id" element={<Authorized component={ArticleModify} />} />
                            <Route path="/backend/article/comment/:id" element={<Authorized component={Comment} />} />
                            <Route path="/backend/category/list" element={<Authorized component={CategoryList} />} />
                            <Route path="/backend/category/insert" element={<Authorized component={CategoryInsert} />} />
                            <Route path="/backend/category/modify/:id" element={<Authorized component={CategoryModify} />} />
                            <Route path="/backend/user/list" element={<Authorized component={UserList} />} />
                            <Route path="/backend/user/modify/:id" element={<Authorized component={UserModify} />} />
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
