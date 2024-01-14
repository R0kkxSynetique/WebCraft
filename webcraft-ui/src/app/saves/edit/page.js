'use client';

import "../home.css"
import React, {useState} from 'react'
import { renameSave } from "@/services/saves";
import { useRouter } from 'next/navigation'



const rename = () => {
    const router = useRouter()
    const [saveName, setSaveName] = useState('')

    return (
        <div className="home">
            <span className='page-title'>Rename Save</span>
            <form>
                <div>
                    <label htmlFor="rename">Save Name</label>
                    <input type="text" id="rename" name="rename" onChange={(newName) => setSaveName(newName.target.value)} value={saveName}></input>
                </div>
                <div>
                    <input onClick={(e) => { e.preventDefault(); renameSave(saveName); router.push('/saves')}} type="submit" value="Rename"></input>
                    <button onClick={(e) => { e.preventDefault(); router.push('/saves')}} id='Cancel'>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default rename