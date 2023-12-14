"use client"
import React, { useEffect } from 'react'
import Board from './Board'
import { GameScript } from './game'


const game = () => {

    useEffect(() => {
        document.addEventListener('contextmenu', function (e) { e.preventDefault() })
         GameScript()
    }, [])

    return (
        <Board />
    )
}

export default game