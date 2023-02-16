/* eslint-disable no-alert */
import React, { useEffect } from 'react'
import { createBrowserHistory } from 'history'
import { useLocation, useNavigate } from 'react-router-dom'

const browserHistory = createBrowserHistory({ window })

const Prompt = props => {
    const location = useLocation()
    const navigate = useNavigate()

    // 存储关闭阻止页面切换的方法（调用此方法将关闭阻止页面切换）
    let unblock = null

    // 阻止页面卸载
    const beforeUnload = event => {
        event.preventDefault()
        event.returnValue = ''
    }

    // 关闭阻止页面切换
    const closeBlockPageSwitching = () => {
        if (unblock) {
            unblock()
            unblock = null
            window.removeEventListener('beforeunload', beforeUnload)
        }
    }

    // 关闭阻止页面切换，并跳转
    const closeBlockAndNavigate = nextLocation => {
        closeBlockPageSwitching()
        navigate(nextLocation)
    }

    // 页面切换时的回调
    const handlePageChange = async ({ location: nextLocation }) => {
        // 是否关闭切换限制并跳转
        let toNext = false

        if (props.message) {
            if (typeof props.message === 'string') {
                toNext = confirm(props.message)
            } else {
                toNext = await props.message()
            }
        } else {
            toNext = confirm('是否放弃更改')
        }

        if (toNext) closeBlockAndNavigate(nextLocation)
    }

    // 监听when 和 pathname 变化，当发生变化时判断是否需要开启block navigate.
    useEffect(() => {
        if (props.when) {
            // 阻塞页面跳转（history行为）
            unblock = browserHistory.block(handlePageChange)
            window.addEventListener('beforeunload', beforeUnload)
        }
        return () => {
            if (props.when) closeBlockPageSwitching()
        }
    }, [props.when, location.pathname])

    return <></>
}

export default Prompt
