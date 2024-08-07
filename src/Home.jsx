import axios from "axios";
import { useState, useEffect } from "react";

const API = axios.create({
    baseURL: 'http://localhost:3000/tasks'
});

function Home() {
    const [mylist, setMylist] = useState([]);
    const [post, setPost] = useState({ task: '', task_description: '' , priority:''});
    const [editId,setEditId] = useState(-1)
    const [searcheditem,setSearchitem] = useState('')
    const [priority,setPriority] =useState('Low')

    const fetchfunc = async () => {
        try {
            const res = await API.get('/');
            setMylist(res.data.tasks);
        } catch (err) {
            console.error('Error fetching tasks', err);
        }
    };

    useEffect(() => {
        fetchfunc();
    }, []);

    const addtodo = async () => {
        try {
            await API.post('/', post);
            setPost({ task: '', task_description: '',priority:'' }); // Reset form fields
            fetchfunc(); // Refresh task list
            handleCloseModal(); // Close modal after adding task
        } catch (err) {
            console.error('Error adding todo', err);
        }
    };

    const handleopenModal = () => {
        const modal = document.getElementById('myModal');
        modal.style.display = 'block';
    };

    const handleCloseModal = () => {
        document.getElementById('myModal').style.display = 'none';
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete('http://localhost:3000/tasks/' + id);
            alert('Record deleted successfully');
            setMylist(mylist.filter(task => task.id !== id));
        } catch (err) {
            console.error('Error deleting record:', err);
            alert('Failed to delete record');
        }
    };
     // Handle edit button click
     const handleEdit = (id) => {
        const taskToEdit = mylist.find(task => task.id === id);
        if (taskToEdit) {
            setPost({ task: taskToEdit.task, task_description: taskToEdit.task_description });
            setEditId(id);
        }
    };

    // Handle update task
    const handleUpdate = () => {
        if (editId !== null) {
            axios.put('http://localhost:3000/tasks/'+ editId, post)
                .then((res) => {
                    console.log(res);
                    setEditId(null);
                    fetchfunc(); // Refresh the list to reflect changes
                })
                .catch((err) => {
                    console.error('Error updating task:', err);
                });
        }
    };
    //searched item
    const handlesearcheditem = (event)=>{
        setSearchitem(event.target.value);
        console.log(searcheditem);
    }

    //search function
   function handlesearch(){
        const filteredlist = mylist.filter((item)=>item.task.toLowerCase().includes(searcheditem.toLowerCase()));
        setMylist(filteredlist);
   };
  
    return (
        <div className="Main-container">
            <div className="mini-container">
                <h1>Things to do: </h1>
                <div className="form-btn-container">
                    <form action="" className="Search-bar">
                        <input type="text" placeholder="Search task name" onChange={handlesearcheditem} />
                        <button onClick={handlesearch} ><img src="https://img.icons8.com/?size=30&id=59878&format=png" alt="search"   /></button>
                    </form>
                    <button className="add-btn" id="add-Modal" onClick={handleopenModal}>Add Task</button>
                </div>
                <hr />
                {mylist.map((task) => (
                     task.id === editId?
                     <div className="taskDisplay" key={task.id}>
                        <input type="text"  placeholder="enter task name" onChange={(e) =>{ setPost({ ...post, task: e.target.value })}}/><br/><br />
                        <textarea name="" id="" placeholder="enter task description"   onChange={(e) => {setPost({ ...post, task_description: e.target.value })}}></textarea>
                        <button onClick={handleUpdate}>update</button>
                     </div>:
                    <div className="taskDisplay"  key={task.id} id={task.priority} >
                        <h6>{task.task}</h6>
                        <p>{task.task_description}</p>
                        <p>Priority: {task.priority}</p>
                        <button onClick={() => handleDelete(task.id)}>Delete</button>
                        <button onClick={()=>handleEdit(task.id)}>Edit</button>
                    </div>
                    
                ))}
                {/* Modal */}
                <div id="myModal" className="modal">
                    <div className="closing">
                        <h2>Create a new task</h2>
                        <span className="Close" onClick={handleCloseModal}>X</span>
                    </div>
                    <form action="" className="modal-form">
                        <input
                            type="text"
                            className="modal-input"
                            placeholder="Task Name"
                            name="newtask"
                            value={post.task}
                            onChange={e => setPost({ ...post, task: e.target.value })}
                        />
                        <select
                            name="priority"
                            id={priority}
                            value={post.priority || ''}
                            onChange={e => setPost({...post, priority: e.target.value})}
                        >
                            <option value="">Select Priority</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select><br /><br />
                        <textarea
                            name="task_description"
                            id=""
                            placeholder="Task Description"
                            value={post.task_description}
                            onChange={e => setPost({ ...post, task_description: e.target.value })}
                        ></textarea>
                    </form>
                    <button className="modal-add" onClick={addtodo}>Add</button>
                </div>
            </div>
        </div>
    );
}

export default Home;
