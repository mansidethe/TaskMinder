import React from "react";
import "./Task.css";


const Task = ({ id, title, description, priority, removeTaskFromList,setTaskEditable, obj }) => {
    return (
        <div className="task-container">

            <h1 className="task-title">{title}</h1>
            <p className="task-description">{description}</p>
            <span className="task-priority">{priority}</span>
            <span className="task-delete-btn"  onClick={() => {
           removeTaskFromList(obj);
            }}>delete</span>
           
           <span className="task-edit-btn"  onClick={() => {
          setTaskEditable(obj);
            }}>🖊</span>


        </div>

    )
}


export default Task