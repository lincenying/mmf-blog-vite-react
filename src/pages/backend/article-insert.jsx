import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSetState, useMount, useLockFn } from 'ahooks'

import api from '@/api'
import { getCategoryList, categoryState } from '@/store/global/category'
import { setMessage } from '@/utils'

import AInput from '@/components/_input.jsx'

export default function ArticleInsert(props) {
    const dispatch = useDispatch()
    const category = useSelector(categoryState)

    const [state, setState] = useSetState({
        title: '',
        category: '',
        content: ''
    })

    useMount(() => {
        if (category.lists.length === 0) {
            dispatch(getCategoryList())
        }

        // eslint-disable-next-line
        window.postEditor = editormd("post-content", {
            width: '100%',
            height: 500,
            markdown: '',
            placeholder: '请输入内容...',
            path: 'https://cdn.jsdelivr.net/npm/editor.md@1.5.0/lib/',
            toolbarIcons() {
                return [
                    'bold',
                    'italic',
                    'quote',
                    '|',
                    'list-ul',
                    'list-ol',
                    'hr',
                    '|',
                    'link',
                    'reference-link',
                    'image',
                    'code',
                    'table',
                    '|',
                    'watch',
                    'preview',
                    'fullscreen'
                ]
            },
            watch: false,
            saveHTMLToTextarea: true
        })
    })

    const handleInsert = useLockFn(async () => {
        // eslint-disable-next-line
        const content = postEditor.getMarkdown()
        if (!state.title || !state.category || !content) {
            setMessage('请将表单填写完整!')
            return
        }

        const { code, data, message } = await api.post('backend/article/insert', {
            ...state,
            content
        })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            dispatch({ type: 'backendArticle/insert', payload: { item: data } })
            props.history.push('/backend/article/list')
        }
    })

    const select = category.lists.map(item => {
        return (
            <option key={item._id} value={item._id + '|' + item.cate_name}>
                {item.cate_name}
            </option>
        )
    })
    return (
        <div className="settings-main card">
            <div className="settings-main-content">
                <AInput title="标题">
                    <input
                        value={state.title}
                        onChange={e => setState({ title: e.target.value })}
                        type="text"
                        placeholder="标题"
                        className="base-input"
                        name="title"
                    />
                    <span className="input-info error">请输入标题</span>
                </AInput>
                <AInput title="分类" classes={'select-item-wrap'}>
                    <i className="icon icon-arrow-down" />
                    <select value={state.category} onChange={e => setState({ category: e.target.value })} className="select-item" name="category">
                        <option value="">请选择分类</option>
                        {select}
                    </select>
                    <span className="input-info error">请输入分类</span>
                </AInput>
                <div className="settings-section">
                    <div id="post-content" className="settings-item-content">
                        <textarea id="editor" name="content" className="form-control hidden" data-autosave="editor-content" />
                    </div>
                </div>
            </div>
            <div className="settings-footer">
                <a onClick={handleInsert} href={null} className="btn btn-yellow">
                    添加文章
                </a>
            </div>
        </div>
    )
}
