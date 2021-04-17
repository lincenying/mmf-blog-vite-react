import React, { useState } from 'react'
import { Prompt } from 'react-router-dom'
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
