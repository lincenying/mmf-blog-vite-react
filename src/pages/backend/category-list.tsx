import React from 'react'
import { Link } from 'react-router-dom'

import api from '@/api'
import { categoryState, deleteCategory, getCategoryList, recoverCategory } from '@/store/global/category'

function CategoryList() {
    const dispatch = useDispatch()
    const category = useSelector(categoryState)

    useMount(async () => {
        if (category.lists.length === 0)
            dispatch(await getCategoryList())
    })

    const handleRecover = async (id: string) => {
        const { code, message } = await api.get('backend/category/recover', {
            id,
        })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            dispatch(recoverCategory(id))
        }
    }
    const handleDelete = async (id: string) => {
        const { code, message } = await api.get('backend/category/delete', {
            id,
        })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            dispatch(deleteCategory(id))
        }
    }

    const html = category.lists.map((item) => {
        let btns
        if (!item.cate_num) {
            btns = item.is_delete ? (
                <a href={undefined} onClick={handleRecover.bind(null, item._id)}>恢复</a>
            ) : (
                <a href={undefined} onClick={handleDelete.bind(null, item._id)}>删除</a>
            )
        }

        return (
            <div className="list-section" key={item._id}>
                <div className={`list-title${item.is_delete ? ' text-red-500 line-through' : ''}`}>{item.cate_name}</div>
                <div className="list-time">{item.cate_order}</div>
                <div className="list-action">
                    <Link className="badge badge-success" to={`/backend/category/modify/${item._id}`}>编辑</Link>
                    {btns}
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
