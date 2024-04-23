import React from 'react'

import api from '@/api'

import { insertCategoryItem } from '@/store/global/category'

import AInput from '@/components/a-input'
import type { Category } from '@/types'

function CategoryModify() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [state, setState] = useSetState({
        cate_name: '',
        cate_order: '',
    })

    const handleInsert = useLockFn(async () => {
        if (!state.cate_name || !state.cate_order) {
            return setMessage('请将表单填写完整!')
        }

        const { code, data, message } = await api.post<Category>('backend/category/insert', state)
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            dispatch(insertCategoryItem(data))
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
                <a className="btn btn-yellow" href={undefined} onClick={handleInsert}>添加分类</a>
            </div>
        </div>
    )
}
export default CategoryModify
