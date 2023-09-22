import React, { useState } from "react";
import "./Home.css"
import Task from "./../../componenets/Task/Task";



const Home = () => {
    const [taskList, setTaskList] = useState([
        {
            id: 1,
            title: 'Submit Assignment',
            description: 'plz fastly submit',
            priority: 'high'
        },

        {
            id: 2,
            title: 'Submit Assignment',
            description: 'plz fastly submit',
            priority: 'high'
        }
    ])

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState('')

    const addTaskToList = () => {

        const randomId = Math.floor(Math.random() * 1000);

        const obj = {
            id: randomId,
            title: title,
            description: description,
            priority: priority,
        }
        setTaskList([...taskList, obj])
        setTitle('');
        setDescription('');
        setPriority('');

    }
    return (

        <div className="container">
            <h1 className="app-title">PinkList</h1>


            <div className="to-do-flex-container">
                <div>
                    <h2 className="text-center"> Show List</h2>
                    {
                        taskList.map((taskItem, index) => {
                            const { id, title, description, priority } = taskItem;

                            return <Task id={id} title={title} description={description} priority={priority} />
                        })
                    }
                </div>

                <div>
                    <h2 className="text-center">Add List</h2>
                    <div className="add-task-form-container">

                        <form>
                            <input type="text" value={title} onChange={(e) => {
                                setTitle(e.target.value)
                            }}
                                placeholder="Enter title"
                                className="task-input"
                            />

                            <input type="text" value={description} onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                                placeholder="Enter description"
                                className="task-input"
                            />

                            <input type="text" value={priority} onChange={(e) => {
                                setPriority(e.target.value)
                            }}
                                placeholder="Enter priority"
                                className="task-input"
                            />


                            <button className="btn-add-task" type="button"
                                onClick={addTaskToList}>
                                Add Task To List
                            </button>

                        </form>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home