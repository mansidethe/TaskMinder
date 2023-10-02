import React, { useEffect, useState } from "react";
import "./Home.css";
import Task from "./../../componenets/Task/Task";
import showToast from 'crunchy-toast';
import { saveListToLocalStorage } from "./../../util/Localstorage";

const Home = () => {
  const [taskList, setTaskList] = useState([

    {
      id:1,
      title:'Make ToDo List',
      description:'Fastly complete the this app',
      priority:'high'
    },

  ])
  const [id, setId] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("pinklist")) ;
    if(list && list.lenght > 0){
      setTaskList(list)
    }
   
  }, []);

  
  const clearInputFields = () => {
    setTitle("");
    setDescription("");
    setPriority("");
  }
  

  const addTaskToList = () => {
    if (isEdit) {
    
      const updatedTaskList = taskList.map((task) =>
        task.id === id
          ? { id, title, description, priority }
          : task
      );
      setTaskList(updatedTaskList);
    } else {
      
      const randomId = Math.floor(Math.random() * 1000);
      const obj = {
        id: randomId,
        title: title,
        description: description,
        priority: priority,
      };
      const newTaskList = [...taskList, obj];

      setTaskList(newTaskList);
    }

    clearInputFields();
 
    saveListToLocalStorage(taskList);

    showToast('Task added successfully','success',3000);
  };

  const removeTaskFromList = (obj) => {
    
    const updatedTaskList = taskList.filter((task) => task.id !== obj.id);
    setTaskList(updatedTaskList);

    saveListToLocalStorage(updatedTaskList);

    showToast('Task deleted successfully','alert',3000);
  };

  const setTaskEditable = (obj) => {
    setIsEdit(true);
    setId(obj.id);
    setTitle(obj.title);
    setDescription(obj.description);
    setPriority(obj.priority);
  };

  const updateTask = () => {
let indexToUpdate;

taskList.forEach((task, i) => {
  if(task.id === id){
    indexToUpdate=i;
  }
})

const tempArray = taskList;
tempArray[indexToUpdate]={
  id:id,
  title:title,
  description:description,
  priority:priority
}
setTaskList([...tempArray])

saveListToLocalStorage(tempArray)

setId(0);
clearInputFields();
setIsEdit(false);

showToast('Task updated successfully','info',3000);

  }

  return (
    <div className="container">
      <h1 className="app-title">TaskMinder</h1>

      <div className="to-do-flex-container">
        <div>
          <h2 className="text-center">Show List</h2>

          <div className="tasks-container">
          {
          taskList?.map((taskItem, index) => (
            <Task
              id={taskItem.id}
              title={taskItem.title}
              description={taskItem.description}
              priority={taskItem.priority}
              key={index}
              removeTaskFromList={() => removeTaskFromList(taskItem)}
              setTaskEditable={() => setTaskEditable(taskItem)}
            />
          ))
          }
        </div>
        </div>

        <div>
          <h2 className="text-center">
            {isEdit ? `Update Task ${id}` : 'Add Task'}
          </h2>

          <div className="add-task-form-container">
            <form>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder="Enter title"
                className="task-input"
              />

              <input
                type="text"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                placeholder="Enter description"
                className="task-input"
              />

              <input
                type="text"
                value={priority}
                onChange={(e) => {
                  setPriority(e.target.value);
                }}
                placeholder="Enter priority"
                className="task-input"
              />

              <div className="btn-container">
                {
                  isEdit ?
                  <button
                  className="btn-add-task"
                  type="button"
                  onClick={updateTask}>
                  Update
                  </button>
                  :
                  <button
                  className="btn-add-task"
                  type="button"
                  onClick={addTaskToList}>
                  Add
                  </button>
                }
                
                
                  
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home     