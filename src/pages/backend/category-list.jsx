import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useMount } from 'ahooks'
import { Link } from 'react-router-dom'

import { getCategoryList, categoryState } from '@/store/global/category'

const CategoryList = () => {
    const dispatch = useDispatch()
    const category = useSelector(categoryState)

    useMount(() => {
        if (category.lists.length === 0) {
            dispatch(getCategoryList())
        }
    })

    const html = category.lists.map(item => {
        return (
            <div key={item._id} className="list-section">
                <div className="list-title">{item.cate_name}</div>
                <div className="list-time">{item.cate_order}</div>
                <div className="list-action">
                    <Link to={'/backend/category/modify/' + item._id} className="badge badge-success">
                        编辑
                    </Link>
                </div>
            </div>
        )
    })
    return (
        <div className="settings-main card">
            <div className="settings-main-content">
                <div className="list-section">
                    <div className="list-title">分类名称</div>
                    <div className="list-time">分类排序</div>
                    <div className="list-action">操作</div>
                </div>
                {html}
            </div>
        </div>
    )
}
export default CategoryList
