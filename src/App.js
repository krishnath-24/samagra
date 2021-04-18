import './App.css';
import TimeStamp from './Components/TimeStamp'
import React, { useEffect, useState } from 'react'
import Dexie from 'dexie'

var db;

function App() {

  useEffect(() => {
    initializeDb()
  }, [])

  const initializeDb = () => {
    db = new Dexie("Samagra")

    db.version(1).stores(
      {
        comments: "id",
        photos: "id",
        todos: "id",
        posts: "id"
      })

    db.open().catch(error => {
      console.log("error while opening idb", error)
    })
  }



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

  const fetchData = (store, url, time, setStartTime, setEndTime, setStartSave, setEndSave) => {
    let currTime = Date.now()
    setStartTime(time ? time : currTime);
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

  const saveDataInDB = (store, data) => {
    db[store].add({
      id: store,
      data
    }).then(() => Date.now())
      .catch(error => error)
  }


  useEffect(() => {

    setTimeout(() => {
      const time = Date.now()
      fetchData("comments", 'https://jsonplaceholder.typicode.com/comments', time, setStart1, setEnd1, setStartSave1, setEndSave1)
      fetchData("photos", 'https://jsonplaceholder.typicode.com/photos', time, setStart2, setEnd2, setStartSave2, setEndSave2)
      fetchData("todos", 'https://jsonplaceholder.typicode.com/todos', time, setStart3, setEnd3, setStartSave3, setEndSave3)
      fetchData("posts", 'https://jsonplaceholder.typicode.com/posts', time, setStart4, setEnd4, setStartSave4, setEndSave4)
    }, 5000);

  }, [])


  return (
    <div className="App">
      <div className="timestamp-container">
        <TimeStamp start={start1} end={end1} startSave={startSave1} endSave={endSave1}></TimeStamp>
        <TimeStamp start={start2} end={end2} startSave={startSave2} endSave={endSave2}></TimeStamp>
      </div>
      <div className="timestamp-container">
        <TimeStamp start={start3} end={end3} startSave={startSave3} endSave={endSave3}></TimeStamp>
        <TimeStamp start={start4} end={end4} startSave={startSave4} endSave={endSave4}></TimeStamp>
      </div>
    </div>
  );
}

export default App;
