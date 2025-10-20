import type { Category } from '@/types'
import React from 'react'

import { Link } from 'react-router'
import api from '@/api'

import AInput from '@/components/a-input'
import { categoryState, getCategoryItem, updateCategoryItem } from '@/store/global/category'

function CategoryModify() {
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()
    const category = useSelector(categoryState)

    const [state, setState] = useSetState({
        cate_name: category.item.data?.cate_name || '',
        cate_order: category.item.data?.cate_order || '',
    })

    useMount(async () => {
        console.log('category-modify useMount: start')
        dispatch(await getCategoryItem({ id: params.id }))
        console.log('category-modify useMount: end')
    })

    const prevCategory = usePrevious(category)

    useUpdateEffect(() => {
        const { cate_name, cate_order } = category.item.data! || {}
        if (prevCategory?.item.data?.cate_name !== cate_name) {
            setState({ cate_name, cate_order })
        }
    }, [category])

    const handleModify = useLockFn(async () => {
        if (!state.cate_name || !state.cate_order) {
            setMessage('请将表单填写完整!')
            return
        }
        const item = {
            ...state,
            id: params.id,
        }
        const { code, data, message } = await api.post<Category>('backend/category/modify', item)
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            dispatch(updateCategoryItem(data))
            navigate('/backend/category/list')
        }
    })
    return (
        <div className="settings-main card">
            <div className="settings-main-content">
                <AInput title="分类名称">
                    <input
                        className="base-input"
                        name="cate_name"
                        onChange={e => setState({ cate_name: e.target.value })}
                        placeholder="分类名称"
                        type="text"
                        value={state.cate_name}
                    />
                    <span className="input-info error">请输入分类名称</span>
                </AInput>
                <AInput title="分类排序">
                    <input
                        className="base-input"
                        name="cate_order"
                        onChange={e => setState({ cate_order: e.target.value })}
                        placeholder="分类排序"
                        type="text"
                        value={state.cate_order}
                    />
                    <span className="input-info error">请输入分类排序</span>
                </AInput>
            </div>
            <div className="settings-footer">
                <Link className="btn btn-blue" to="/backend/category/list">返回</Link>
                <a className="btn btn-yellow" href={undefined} onClick={handleModify}>编辑分类</a>
            </div>
        </div>
    )
}
export default CategoryModify
