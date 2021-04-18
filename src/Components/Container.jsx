import TimeStamp from './TimeStamp'
import React, { useEffect, useState } from 'react'
import { initializeStore } from '../config/db'


function Container() {
    // initialize the db instance
    const db = initializeStore()


    // set up the states
    const [currentTime, setCurrentTime] = useState(null)
    const [start1, setStart1] = useState(null)
    const [start2, setStart2] = useState(null)
    const [start3, setStart3] = useState(null)
    const [start4, setStart4] = useState(null)

    const [startSave1, setStartSave1] = useState(null)
    const [startSave2, setStartSave2] = useState(null)
    const [startSave3, setStartSave3] = useState(null)
    const [startSave4, setStartSave4] = useState(null)

    const [end1, setEnd1] = useState(null)
    const [end2, setEnd2] = useState(null)
    const [end3, setEnd3] = useState(null)
    const [end4, setEnd4] = useState(null)

    const [endSave1, setEndSave1] = useState(null)
    const [endSave2, setEndSave2] = useState(null)
    const [endSave3, setEndSave3] = useState(null)
    const [endSave4, setEndSave4] = useState(null)

    // on first render, the endpoints will be called after 5sec
    useEffect(() => {

        setTimeout(() => {
            const time = Date.now()
            fetchData("comments", 'https://jsonplaceholder.typicode.com/comments', time, setStart1, setEnd1, setStartSave1, setEndSave1)
            fetchData("photos", 'https://jsonplaceholder.typicode.com/photos', time, setStart2, setEnd2, setStartSave2, setEndSave2)
            fetchData("todos", 'https://jsonplaceholder.typicode.com/todos', time, setStart3, setEnd3, setStartSave3, setEndSave3)
            fetchData("posts", 'https://jsonplaceholder.typicode.com/posts', time, setStart4, setEnd4, setStartSave4, setEndSave4)
        }, 5000);

    }, [])

    // to set up the current unix timer
    useEffect(() => {
        let timerId = setTimeout(() => {
            tick()
        }, 1)

        return function cleanup() {
            clearInterval(timerId)
        }
    })

    // update currentTime state every second
    const tick = () => setCurrentTime(Date.now())

    // function to make the api call
    const fetchData = (store, url, time, setStartTime, setEndTime, setStartSave, setEndSave) => {
        setStartTime(time);
        fetch(url)
            .then(async (response) => {
                setEndTime(Date.now())
                setStartSave(Date.now())
                let data = await response.json()
                saveDataInDB(store, data)
                setEndSave(Date.now())
            })
            .catch(error => error)
    }

    // function to save the data in indexedDB
    const saveDataInDB = (store, data) => {
        db[store].add({
            title: store,
            data
        }).then(() => Date.now())
            .catch(error => error)
    }


    // button click handler
    const handleButtonClick = ({ target }) => {
        const time = Date.now()
        switch (target.id) {
            case "1":
                fetchData("comments", 'https://jsonplaceholder.typicode.com/comments', time, setStart1, setEnd1, setStartSave1, setEndSave1)
                break;
            case "2":
                fetchData("photos", 'https://jsonplaceholder.typicode.com/photos', time, setStart2, setEnd2, setStartSave2, setEndSave2)
                break;
            case "3":
                fetchData("todos", 'https://jsonplaceholder.typicode.com/todos', time, setStart3, setEnd3, setStartSave3, setEndSave3)
                break;
            case "4":
                fetchData("posts", 'https://jsonplaceholder.typicode.com/posts', time, setStart4, setEnd4, setStartSave4, setEndSave4)
                break;
            default:
                break;
        }
    }


    return (
        <div>
            <div className="timestamp-container">
                <TimeStamp start={start1} end={end1} startSave={startSave1} endSave={endSave1}></TimeStamp>
                <TimeStamp start={start2} end={end2} startSave={startSave2} endSave={endSave2}></TimeStamp>
            </div>
            <div className="timestamp-container">
                <TimeStamp start={start3} end={end3} startSave={startSave3} endSave={endSave3}></TimeStamp>
                <TimeStamp start={start4} end={end4} startSave={startSave4} endSave={endSave4}></TimeStamp>
            </div>

            <div className="button-container">
                <button className="button" id="1" onClick={handleButtonClick}>Button 1</button>
                <button className="button" id="2" onClick={handleButtonClick}>Button 2</button>
                <button className="button" id="3" onClick={handleButtonClick}>Button 3</button>
                <button className="button" id="4" onClick={handleButtonClick}>Button 4</button>
            </div>

            <button className="unix-time">{currentTime}</button>
        </div>
    )
}

export default Container
