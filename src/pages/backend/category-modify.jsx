import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useMount, useSetState, useUpdateEffect, usePrevious } from 'ahooks'
import { Link } from 'react-router-dom'

import api from '@/api'
import { getCategoryItem, categoryState } from '@/store/global/category'
import { setMessage } from '@/utils'

import AInput from '@/components/_input.jsx'

const CategoryModify = props => {
    const dispatch = useDispatch()
    const category = useSelector(categoryState)

    const [state, setState] = useSetState({
        cate_name: category.item.cate_name || '',
        cate_order: category.item.cate_order || ''
    })

    useMount(() => {
        console.log('category-modify useMount:')
        dispatch(getCategoryItem({ id: props.match.params.id }))
    })

    const prevCategory = usePrevious(category)

    useUpdateEffect(() => {
        const { cate_name, cate_order } = category.item
        if (prevCategory.item.cate_name !== cate_name) {
            setState({ cate_name, cate_order })
        }
    }, [category])

    const handleModify = async () => {
        if (!state.cate_name || !state.cate_order) {
            setMessage('请将表单填写完整!')
            return
        }
        const item = {
            ...state,
            id: props.match.params.id
        }
        const { code, data, message } = await api.post('backend/category/modify', item)
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            dispatch({ type: 'category/updateCategoryItem', payload: { data } })
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
                <Link to="/backend/category/list" className="btn btn-blue">
                    返回
                </Link>
                <a onClick={handleModify} href={null} className="btn btn-yellow">
                    编辑分类
                </a>
            </div>
        </div>
    )
}
export default CategoryModify
