import React, { useState, useEffect } from 'react';
import { firestore } from './index'
import Task from './component/Task'

function App() {

  const [tasks, setTasks] = useState([])

  const [name, setName] = useState('')

  useEffect(() => {
    retriveData()
  }, [])

  const retriveData = () => {
    firestore.collection("tasks").onSnapshot((snapshot) => {
      console.log(snapshot.docs)
      let mTask = snapshot.docs.map(d => {
        const { id, name } = d.data()
        console.log(id, name)
        return { id, name }
      })
      setTasks(mTask)
    })
  }

  const deleteTask = (id) => {
    firestore.collection("tasks").doc(id + '').delete()
  }

  const editTask = (id) => {
    firestore.collection("tasks").doc(id + '').set({ id, name })
  }


  const renderTask = () => {
    if (tasks && tasks.length)
      return tasks.map((task, index) => {
        return (<Task 
          key={index}
          task={task}
          editTask={editTask}
          deleteTask={deleteTask} />)
      })
    else
      return (<li> No task </li>)

  }

  const addTask = () => {
    let id = (tasks.length === 0) ? 1 : tasks[tasks.length - 1].id + 1
    firestore.collection("tasks").doc(id + '').set({ id, name })
  }


  return (
    <div>
      <h1>Todo</h1>
      <input type='text' name='name' onChange={(e) => { setName(e.target.value) }}></input>
      <button onClick={addTask}>Submit </button> <br />
      <ul style={{ display: 'flex', listStyle: 'none' }}> {renderTask()}</ul>
    </div>
  );
}

export default App;
