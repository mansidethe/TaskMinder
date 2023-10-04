import React from "react";
import "./Task.css";


const Task = ({ id, title, description, priority, removeTaskFromList,setTaskEditable }) => {
    return (
        <div className="task-container">

            <h1 className="task-title">{title}</h1>
            <p className="task-description">{description}</p>
            <span className="task-priority">{priority}</span>
            <span className="task-delete-btn"  onClick={() => {
          removeTaskFromList(id);
            }}>❌</span>
           
           <span className="task-edit-btn"  onClick={() => {
          setTaskEditable(id);
            }}>🖊</span>


        </div>

    )
}


export default Task