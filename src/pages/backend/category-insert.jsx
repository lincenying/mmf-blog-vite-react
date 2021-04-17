import React from 'react'
import { useDispatch } from 'redux-react-hook'
import { useSetState } from 'ahooks'

import api from '@/api'
import { setMessage } from '@/utils'

import AInput from '@/components/_input.jsx'

const CategoryModify = props => {
    const dispatch = useDispatch()

    const [state, setState] = useSetState({
        cate_name: '',
        cate_order: ''
    })

    const handleInsert = async () => {
        if (!state.cate_name || !state.cate_order) {
            return setMessage('请将表单填写完整!')
        }
        const { code, data, message } = await api.post('backend/category/insert', state)
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            dispatch({ type: 'category/insertCategoryItem', payload: { item: data } })
            props.history.push('/backend/category/list')
        }
    }

    return (
        <div className="settings-main card">
            <div className="settings-main-content">
                <AInput title="分类名称">
                    <input
                        value={state.cate_name}
                        onChange={e => setState({ cate_name: e.target.value })}
                        type="text"
                        placeholder="分类名称"
                        className="base-input"
                        name="cate_name"
                    />
                    <span className="input-info error">请输入分类名称</span>
                </AInput>
                <AInput title="分类排序">
                    <input
                        value={state.cate_order}
                        onChange={e => setState({ cate_order: e.target.value })}
                        type="text"
                        placeholder="分类排序"
                        className="base-input"
                        name="cate_order"
                    />
                    <span className="input-info error">请输入分类排序</span>
                </AInput>
            </div>
            <div className="settings-footer">
                <a onClick={handleInsert} href={null} className="btn btn-yellow">
                    添加分类
                </a>
            </div>
        </div>
    )
}
export default CategoryModify
