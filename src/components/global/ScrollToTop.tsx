import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'

interface Props {
    children?: ReactNode
}

export default function ScrollToTop(props: Props) {
    const location = useLocation()
    const pathname = location.pathname
    const mounting = useRef(true)
    const firstPathname = useRef(pathname)

    useEffect(() => {
        if (mounting.current) {
            mounting.current = false
            console.log('componentDidMount')
            return
        }
        if (firstPathname.current !== location.pathname)
            window.scrollTo(0, 0)
    })

    return props.children
}
