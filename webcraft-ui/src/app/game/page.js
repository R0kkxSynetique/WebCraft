"use client"
import React, { useEffect, useState } from 'react'
import Board from './Board'
import GameScript from './game'
import { getInventory } from '@/services/saves'
import { promises as fs } from 'fs';

const game = () => {

    const [isCraftLoading, setIsCraftLoading] = useState(false)

    useEffect(() => {
        LoadLogic();
    }, []);
    
    const getSpritesNames = async () => {
        const response = await fetch(`/sprites-names.json`);
        return await response.json();
    }

    const LoadLogic = async () => {
        document.addEventListener('contextmenu', function (e) { e.preventDefault() })
        GameScript(setIsCraftLoading, await getInventory(), await getSpritesNames())
    }

    return (
        <Board isCraftLoading={isCraftLoading} />
    )
}

export default game