"use client"
import React, { useEffect, useState } from 'react'
import Board from './Board'
import { GameScript } from './game'


const game = () => {

    const [isCraftLoading, setIsCraftLoading] = useState(false)

    useEffect(() => {
        document.addEventListener('contextmenu', function (e) { e.preventDefault() })
         GameScript(setIsCraftLoading)
    }, [])

    return (
        <Board isCraftLoading={isCraftLoading} />
    )
}

export default game