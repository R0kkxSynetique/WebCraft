'use client';

import "../home.css"
import React, {useState} from 'react'
import { createSave } from "@/services/saves";
import { useRouter } from 'next/navigation'



const create = () => {
    const router = useRouter()
    const [saveName, setSaveName] = useState('')

    return (
        <div className="home">
            <span className='page-title'>Create Save</span>
            <form>
                <div>
                    <label htmlFor="name">Save Name</label>
                    <input type="text" id="name" name="create" onChange={(name) => setSaveName(name.target.value)} value={saveName}></input>
                </div>
                <div>
                    <input onClick={(e) => { e.preventDefault(); createSave(saveName); router.push('/saves')}} type="submit" value="Create"></input>
                    <button onClick={(e) => { e.preventDefault(); router.push('/saves')}} id='Cancel'>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default create