import { useEffect, useRef } from 'react'

export default function ScrollToTop(props: any) {
    const pathname = props.location.pathname
    const mounting = useRef(true)
    const firstPathname = useRef(pathname)

    useEffect(() => {
        if (mounting.current) {
            mounting.current = false
            console.log('componentDidMount')
            return
        }
        if (firstPathname !== props.location.pathname)
            window.scrollTo(0, 0)
    })

    return props.children
}
