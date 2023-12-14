'use client';

import "../home.css"
import React from 'react'

const rename = () => {
    return (
        <div className="home">
            <span className='page-title'>Rename Save</span>
            <form>
                <div>
                    <label htmlFor="rename">Save Name</label>
                    <input type="text" id="rename" name="rename"></input>
                </div>
                <div>
                    <input type="submit" value="Rename"></input>
                    <button id='Cancel'>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default rename