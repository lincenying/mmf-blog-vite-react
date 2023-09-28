import React from 'react'
import md5 from 'md5'

interface Porps {
    readonly email?: string
    readonly classNames?: string
}

function Avatar(props: Porps) {
    const { email = 'licenying@126.com', classNames = 'avatar-img' } = props

    const src = `https://fdn.geekzu.org/avatar/${md5(email)}?s=256&d=identicon&r=g`
    return <img alt="" className={classNames} src={src} />
}
export default React.memo(Avatar)
