import React from 'react'
import './Task.css'
export default (props) => {
   const { id, name } = props.task
   const { editTask, deleteTask } = props
   return (
       <li>
           <div className="id">{id}</div>
           <div className="name">{name}</div>
           <div className="button">
               <button className="green" onClick={() => editTask(id)}> Edit</button>
               <button className="red" onClick={() => deleteTask(id)}> Delete</button>
           </div>
       </li>
   )
}
