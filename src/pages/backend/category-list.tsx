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
        let btn
        if (!item.cate_num) {
            btn = item.is_delete
                ? <a onClick={handleRecover.bind(null, item._id)} href={undefined}>恢复</a>
                : <a onClick={handleDelete.bind(null, item._id)} href={undefined}>删除</a>
        }

        return (
            <div key={item._id} className="list-section">
                <div className={`list-title${item.is_delete ? ' text-red-500 line-through' : ''}`}>{item.cate_name}</div>
                <div className="list-time">{item.cate_order}</div>
                <div className="list-action">
                    <Link to={`/backend/category/modify/${item._id}`} className="badge badge-success">编辑</Link>
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
