'use client';

import "../home.css"
import React from 'react'

import { useRouter } from 'next/navigation'



const rename = () => {
    const router = useRouter()

    return (
        <div className="home">
            <span className='page-title'>Create Save</span>
            <form>
                <div>
                    <label htmlFor="rename">Save Name</label>
                    <input type="text" id="rename" name="rename"></input>
                </div>
                <div>
                    <input type="submit" value="Rename"></input>
                    <button onClick={(e) => { e.preventDefault(); router.push('/saves')}} id='Cancel'>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default rename