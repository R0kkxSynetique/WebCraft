import React from 'react'


const Inventory = ({ height, width, firstId, title, type, loading }) => {

    const boxes = (height, width, firstId, loading) => {
        let col
        let row = []
        let boxId = firstId

        for (let i = 0; i < height; i++) {
            col = []

            for (let j = 0; j < width; j++) {
                col.push(<td id={`box-${boxId}`}   className={loading? "box box-load" : "box"} key={boxId}></td>)
                boxId++
            }
            row.push(<tr key={i}>{col}</tr>)
        }

        return (row)
    }

    return (
        <table>
            <tbody>
                {title ? <tr><th className='inventory-title' colSpan={width}>{title}</th></tr> : null}

                {type == "trash" ?
                    <tr><td id={`box-${firstId}`} className="box trash">x</td></tr>
                    :
                    boxes(height, width, firstId, loading)
                }
            </tbody>
        </table>
    )
}

export default Inventory