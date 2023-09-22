import React, { useEffect, useState } from "react";
import "./Home.css";
import Task from "./../../componenets/Task/Task";

const Home = () => {
  const [taskList, setTaskList] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  const[isEdit, setIsEdite]=useState(false);

  useEffect(() => {
   
    const list = JSON.parse(localStorage.getItem("pinklist")) ;
    setTaskList(list);
    if(list && list.length>0){
        setTaskList(list)
    }
  }, []);

  const saveListToLocalStorage = (tasks) => {
    
    localStorage.setItem("pinklist", JSON.stringify(tasks));
  };

  const addTaskToList = () => {
    const randomId = Math.floor(Math.random() * 1000);

    const obj = {
      id: randomId,
      title: title,
      description: description,
      priority: priority,
    };

    
    const newTaskList = [...taskList, obj];

    
    setTaskList(newTaskList);
    setTitle("");
    setDescription("");
    setPriority("");

    
    saveListToLocalStorage(newTaskList);
  };

  const removeTaskFromList = (obj) => {
    const index = taskList.indexOf(obj);

    if (index !== -1) {

      const tempArray = [...taskList];
      tempArray.splice(index, 1);

      
      setTaskList(tempArray);

      saveListToLocalStorage(tempArray);
    }
  };

  const setTaskEditable = (obj) => {
setIsEdite(true);
  }

  return (
    <div className="container">
      <h1 className="app-title">TO DO APP</h1>

      <div className="to-do-flex-container">

        <div>

          <h2 className="text-center"> Show List</h2>

          {taskList.map((taskItem, index) => (
            <Task
              id={taskItem.id}
              title={taskItem.title}
              description={taskItem.description}
              priority={taskItem.priority}
              key={index}
              removeTaskFromList={removeTaskFromList}
              setTaskEditable={setTaskEditable}
              />

          ))}

        </div>

        <div>
          <h2 className="text-center">
          {isEdit ? 'Update Task': 'Add Task'}
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
                className="task-input"/>


              <input
                type="text"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                placeholder="Enter description"
                className="task-input"/>


              <input
                type="text"
                value={priority}
                onChange={(e) => {
                  setPriority(e.target.value);
                }}
                placeholder="Enter priority"
                className="task-input"/>

                <div className="btn-container">
                    {
                        isEdit ?
                        <button
                className="btn-add-task"
                type="button"   onClick={addTaskToList}>
              Update Task 
              </button>
              :
                    

                <button
                className="btn-add-task"
                type="button"  onClick={addTaskToList}>
               Add Task 
              </button>
}
              

              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
