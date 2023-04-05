import React from 'react'
import { useBoolean } from 'ahooks'
import type { RegisterSWOptions } from 'virtual:pwa-register'
import { registerSW } from 'virtual:pwa-register'

const useRegisterSW = (options: RegisterSWOptions = {}) => {
    const { immediate = true, onNeedRefresh, onOfflineReady } = options

    const [needRefresh, { setTrue: setRefresTrue, setFalse: setRefresFalse }] = useBoolean(false)
    const [offlineReady, { setTrue: setReadyTrue, setFalse: setReadyFalse }] = useBoolean(false)

    const updateServiceWorker = registerSW({
        immediate,
        onNeedRefresh() {
            setRefresTrue()
            onNeedRefresh?.()
        },
        onOfflineReady() {
            setReadyTrue()
            onOfflineReady?.()
        },
    })

    return {
        updateServiceWorker,
        offlineReady,
        needRefresh,
        setRefresFalse,
        setReadyFalse,
    }
}

const ReloadPrompt = () => {
    const { offlineReady, needRefresh, updateServiceWorker, setRefresFalse, setReadyFalse } = useRegisterSW()
    const onClose = async () => {
        setRefresFalse()
        setReadyFalse()
    }
    return (offlineReady || needRefresh)
        ? (
        <div className="app-refresh" id="app-refresh">
            <div className="app-refresh-wrap">
                {offlineReady ? <label>应用程序准备离线工作</label> : <label>发现新的版本, 请刷新加载最新版本</label>}

                {needRefresh ? <span onClick={() => updateServiceWorker()}>点击刷新</span> : ''}
                <span onClick={onClose}>点击关闭</span>
            </div>
        </div>
            )
        : (
        <></>
            )
}
export default ReloadPrompt
