import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useMount } from 'ahooks'
import { Link } from 'react-router-dom'

import api from '@/api'
import { setMessage } from '@/utils'
import { getCategoryList, categoryState } from '@/store/global/category'

const CategoryList = () => {
    const dispatch = useDispatch()
    const category = useSelector(categoryState)

    useMount(() => {
        if (category.lists.length === 0) {
            dispatch(getCategoryList())
        }
    })

    const handleRecover = async id => {
        const { code, message } = await api.get('backend/category/recover', {
            id
        })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            dispatch({ type: 'category/recoverCategory', payload: { id } })
        }
    }
    const handleDelete = async id => {
        const { code, message } = await api.get('backend/category/delete', {
            id
        })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            dispatch({ type: 'category/deleteCategory', payload: { id } })
        }
    }

    const html = category.lists.map(item => {
        let btn
        if (!item.cate_num) {
            btn = item.is_delete ? (
                <a onClick={handleRecover.bind(null, item._id)} href={null}>
                    恢复
                </a>
            ) : (
                <a onClick={handleDelete.bind(null, item._id)} href={null}>
                    删除
                </a>
            )
        }

        return (
            <div key={item._id} className="list-section">
                <div className={'list-title' + (item.is_delete ? ' text-red-500 line-through' : '')}>{item.cate_name}</div>
                <div className="list-time">{item.cate_order}</div>
                <div className="list-action">
                    <Link to={'/backend/category/modify/' + item._id} className="badge badge-success">
                        编辑
                    </Link>
                    {btn}
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
