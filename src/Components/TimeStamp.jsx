import React from 'react'
import '../styles/Timestamp.css'

function TimeStamp({ start, end, startSave, endSave }) {

    return (
        <div className="timestamp">
            <div>Start : {start}</div>
            <div>End : {end}</div>
            <div>Start Save : {startSave}</div>
            <div>End Save : {endSave}</div>
        </div>
    )
}

export default TimeStamp
