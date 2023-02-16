import React, { useState } from 'react'
import Prompt from './prompt.jsx'
import { useMount } from 'ahooks'

export default function PromptWrapper(props) {
    const [when, setWhen] = useState(false)

    useMount(() => {
        setTimeout(() => {
            setWhen(true)
        }, 1000)
    })

    return <Prompt when={when} message={props.message} />
}
