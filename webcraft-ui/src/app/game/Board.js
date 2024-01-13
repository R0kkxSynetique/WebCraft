"use client"

import React from 'react'
import "./minecraft.css"
import "./game.css"
import Inventory from './Inventory'

const Board = ({isCraftLoading}) => {
    return (
        <>
            <div id="box-0"></div>

            <div className="game">
                <div className='row'>
                    <div className='concat'>
                        
                        <Inventory height={1} width={1} firstId={1000} title="Item Generation" />
                        <Inventory height={1} width={1} firstId={1002} type="trash" />
                    </div>

                    <div className='concat'>
                        <Inventory height={3} width={3} firstId={1} title="Crafting" />
                        <i className='arrow'></i>
                        <Inventory height={1} width={1} firstId={1001} loading={isCraftLoading} />
                    </div>
                </div>

                <div className='concat'>
                    <Inventory height={3} width={9} firstId={11} title="Invertory" />
                    <Inventory height={1} width={1} firstId={1002} type="trash" />
                </div>

            </div >
        </>

    )
}

export default Board