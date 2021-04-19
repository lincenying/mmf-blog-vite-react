import React from 'react'
import { useBoolean } from 'ahooks'
import { registerSW } from 'virtual:pwa-register'

const useRegisterSW = (options = {}) => {
    const { immediate = true, onNeedRefresh, onOfflineReady } = options

    const [needRefresh, { setRefresTrue, setRefresFalse }] = useBoolean(false)
    const [offlineReady, { setReadyTrue, setReadyFalse }] = useBoolean(false)

    const updateServiceWorker = registerSW({
        immediate,
        onNeedRefresh() {
            setRefresTrue()
            onNeedRefresh?.()
        },
        onOfflineReady() {
            setReadyTrue()
            onOfflineReady?.()
        }
    })

    return {
        updateServiceWorker,
        offlineReady,
        needRefresh,
        setRefresFalse,
        setReadyFalse
    }
}

const reloadPrompt = () => {
    const { offlineReady, needRefresh, updateServiceWorker, setRefresFalse, setReadyFalse } = useRegisterSW()
    const onClose = async () => {
        setRefresFalse()
        setReadyFalse()
    }
    return offlineReady || needRefresh ? (
        <div class="app-refresh" id="app-refresh">
            <div class="app-refresh-wrap">
                {offlineReady ? <label>应用程序准备离线工作</label> : <label>发现新的版本, 请刷新加载最新版本</label>}

                {needRefresh ? <span onClick={updateServiceWorker()}>点击刷新</span> : ''}
                <span onClick={onClose}>点击关闭</span>
            </div>
        </div>
    ) : (
        ''
    )
}
export default reloadPrompt
