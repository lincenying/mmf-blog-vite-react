import React from 'react'

import api from '@/api'
import { categoryState, getCategoryList } from '@/store/global/category'
import { insertBackendArticle } from '@/store/backend/article'

import AInput from '@/components/a-input'
import type { Article } from '@/types'

export default function ArticleInsert() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const category = useSelector(categoryState)

    const [state, setState] = useSetState({
        title: '',
        category: '',
        content: '',
    })

    useMount(async () => {
        if (category.lists.length === 0)
            dispatch(await getCategoryList())

        window.postEditor = window.editormd('post-content', {
            width: '100%',
            height: 500,
            markdown: '',
            placeholder: '请输入内容...',
            path: 'https://cdn.jsdelivr.net/npm/editor.md@1.5.0/lib/',
            toolbarIcons() {
                return [
                    'bold', 'italic', 'quote', '|', 'list-ul', 'list-ol', 'hr', '|', 'link',
                    'reference-link', 'image', 'code', 'table', '|', 'watch', 'preview', 'fullscreen',
                ]
            },
            watch: false,
            saveHTMLToTextarea: true,
        })
    })

    const handleInsert = useLockFn(async () => {
        const content = window.postEditor.getMarkdown()
        if (!state.title || !state.category || !content) {
            setMessage('请将表单填写完整!')
            return
        }

        const { code, data, message } = await api.post<Article>('backend/article/insert', {
            ...state,
            content,
        })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            dispatch(insertBackendArticle(data))
            navigate('/backend/article/list')
        }
    })

    const select = category.lists.map((item) => {
        return (
            <option key={item._id} value={`${item._id}|${item.cate_name}`}>
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
                <a onClick={handleInsert} href={undefined} className="btn btn-yellow">添加文章</a>
            </div>
        </div>
    )
}
