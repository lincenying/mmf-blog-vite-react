import React from 'react'
import md5 from 'md5'

const Avatar = props => {
    const email = props.email || 'licenying@126.com'
    const classNames = props.classNames || 'avatar-img'
    const src = `https://fdn.geekzu.org/avatar/${md5(email)}?s=256&d=identicon&r=g`
    return <img src={src} alt="" className={classNames} />
}
export default React.memo(Avatar)
