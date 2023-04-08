import React from 'react'
import { Link } from 'react-router-dom'

import api from '@/api'
import { categoryState, getCategoryList } from '@/store/global/category'
import { updateBackendArticle } from '@/store/backend/article'

import AInput from '@/components/a-input'

export default function ArticleInsert() {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const category = useSelector(categoryState)

    const [state, setState] = useSetState({
        title: '',
        category: '',
        category_name: '',
        category_old: '',
        content: '',
    })

    const getArticleData = async () => {
        const { code, data } = await api.get('backend/article/item', { id: params.id })
        if (code === 200) {
            setState({
                title: data.title,
                category: data.category,
                category_name: data.category_name,
                category_old: data.category,
                content: data.content,
            })
            window.postEditor = window.editormd('post-content', {
                width: '100%',
                height: 500,
                markdown: data.content,
                placeholder: '请输入内容...',
                path: 'https://cdn.jsdelivr.net/npm/editor.md@1.5.0/lib/',
                toolbarIcons() {
                    return [
                        'bold', 'italic', 'quote', '|', 'list-ul', 'list-ol', 'hr', '|', 'link', 'reference-link', 'image', 'code', 'table', '|', 'watch', 'preview', 'fullscreen',
                    ]
                },
                watch: false,
                saveHTMLToTextarea: true,
            })
        }
    }

    useMount(async () => {
        getArticleData()
        if (category.lists.length === 0)
            dispatch(await getCategoryList())
    })

    const handleModify = useLockFn(async () => {
        const content = window.postEditor.getMarkdown()
        if (!state.title || !state.category || !content)
            return setMessage('请将表单填写完整!')

        const { code, data, message } = await api.post('backend/article/modify', {
            ...state,
            content,
            id: params.id,
        })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            dispatch(updateBackendArticle(data))
            navigate('/backend/article/list')
        }
    })
    const handleChange = (e: any) => {
        const obj = e.target
        const category_name = obj.options[obj.selectedIndex].text
        setState({ category: obj.value, category_name })
    }

    const select = category.lists.map((item) => {
        return (
            <option key={item._id} value={item._id}>
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
                    <select value={state.category} onChange={handleChange} className="select-item" name="category">
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
                <Link to="/backend/article/list" className="btn btn-blue">
                    返回
                </Link>
                <a onClick={handleModify} href={undefined} className="btn btn-yellow">
                    编辑文章
                </a>
            </div>
        </div>
    )
}
