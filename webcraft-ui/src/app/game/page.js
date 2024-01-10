"use client"
import React, { useEffect, useState } from 'react'
import Board from './Board'
import GameScript from './game'
import {getInventory} from '@/services/saves'
const game = () => {

    const [isCraftLoading, setIsCraftLoading] = useState(false)

    useEffect(() => {
        LoadLogic()
    }, []);

    
    const LoadLogic = async () => {
        document.addEventListener('contextmenu', function (e) { e.preventDefault() })
        GameScript(setIsCraftLoading, await getInventory())
    }

    return (
        <Board isCraftLoading={isCraftLoading} />
    )
}

export default game