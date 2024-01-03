'use client';

import "../home.css"
import React from 'react'

import { useRouter } from 'next/navigation'



const create = () => {
    const router = useRouter()

    return (
        <div className="home">
            <span className='page-title'>Create Save</span>
            <form>
                <div>
                    <label htmlFor="create">Save Name</label>
                    <input type="text" id="create" name="create"></input>
                </div>
                <div>
                    <input type="submit" value="Create"></input>
                    <button onClick={(e) => { e.preventDefault(); router.push('/saves')}} id='Cancel'>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default create