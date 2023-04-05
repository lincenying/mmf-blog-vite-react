import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { globalState } from '@/store/global'

import FrontendNavigation from '@/components/frontend-navigation.jsx'
import Authorized from '@/components/backend-authorized.jsx'
import BackendMenu from '@/components/backend-menu.jsx'
import ReloadPrompt from '@/components/reload-prompt.jsx'

import AdminList from './backend/admin-list.jsx'
import AdminModify from './backend/admin-modify.jsx'
import ArticleInsert from './backend/article-insert.jsx'
import ArticleList from './backend/article-list.jsx'
import ArticleModify from './backend/article-modify.jsx'
import CategoryInsert from './backend/category-insert.jsx'
import CategoryList from './backend/category-list.jsx'
import CategoryModify from './backend/category-modify.jsx'
import Comment from './backend/comment.jsx'
import Login from './backend/login.jsx'
import UserList from './backend/user-list.jsx'
import UserModify from './backend/user-modify.jsx'

const Backend = () => {
    const location = useLocation()
    const global = useSelector(globalState)
    return (
        <div className="backend">
            <FrontendNavigation />
            <div className="main wrap">
                <div className="main-left">
                    <div className="home-feeds cards-wrap">
                        <Routes key={location.pathname}>
                            <Route name="backend" path="/backend" element={Login} exact="true" />
                            <Route name="admin_list" path="/backend/admin/list" element={<Authorized global={global} component={AdminList} />} />
                            <Route
                                name="admin_modify"
                                path="/backend/admin/modify/:id"
                                element={<Authorized global={global} component={AdminModify} />}
                            />
                            <Route
                                name="article_list"
                                path="/backend/article/list"
                                element={<Authorized global={global} component={ArticleList} />}
                            />
                            <Route
                                name="article_insert"
                                path="/backend/article/insert"
                                element={<Authorized global={global} component={ArticleInsert} />}
                            />
                            <Route
                                name="article_modify"
                                path="/backend/article/modify/:id"
                                element={<Authorized global={global} component={ArticleModify} />}
                            />
                            <Route
                                name="article_comment"
                                path="/backend/article/comment/:id"
                                element={<Authorized global={global} component={Comment} />}
                            />
                            <Route
                                name="category_list"
                                path="/backend/category/list"
                                element={<Authorized global={global} component={CategoryList} />}
                            />
                            <Route
                                name="category_insert"
                                path="/backend/category/insert"
                                element={<Authorized global={global} component={CategoryInsert} />}
                            />
                            <Route
                                name="category_modify"
                                path="/backend/category/modify/:id"
                                element={<Authorized global={global} component={CategoryModify} />}
                            />
                            <Route name="user_list" path="/backend/user/list" element={<Authorized global={global} component={UserList} />} />
                            <Route
                                name="user_modify"
                                path="/backend/user/modify/:id"
                                element={<Authorized global={global} component={UserModify} />}
                            />
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
