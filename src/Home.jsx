import axios from "axios";
import { useState } from "react";
const API = axios.create({
    baseURL: `http://localhost:3000/`
})



function Home(){
   const [mylist,setMylist] = useState([])
   const [task,setTask] = useState('')
   const [task_description,setTask_description] = useState('')

    
    const fetchfunc = async () =>
    {
        try{
            API.get('/').then(res =>{
            //console.log(res.data)
            const newdata = res.data;
            //console.log(newdata);
            setMylist(newdata.tasks)
            })
            console.log(mylist)
        }
        catch (err){
            console.error('error', err);
        }
    
    }
    // add to the api
    const addtodo = async()=>{
        if (task.trim()=='' || task_description.trim()==''){
            alert('field required');
            return;
        }
        try{
            await axios.post(API.baseURL, {task,task_description});
            setTask('');
            setTask_description('');
            fetchfunc();
        }catch(err){
            console.err('Error adding todo',err);
        }
    };
    function handleopenModal(){
        const modal = document.getElementById('myModal')
        modal.style.display='block';
    }

    //close modal
    function handleCloseModal(){
        document.getElementById('myModal').style.display='none'
    }
    return(
        <div className="Main-container">
            <div className="mini-container">
                <h1>Things to do: </h1>
                <div className="form-btn-container">
                    <form action="" className="Search-bar">
                        <input type="text" placeholder="Search task name" />
                        <button><img src="https://img.icons8.com/?size=30&id=59878&format=png" alt="search" /></button>
                    </form>
                    <button className="add-btn" id="add-Modal" onClick={handleopenModal}>Add Task</button>
                </div>
                <hr />
                {mylist.map((task)=><div className="taskDisplay">
                    <h6 key={task.id}>{task.task}</h6>
                    <p>{task.task_description}</p>
                    <button>delete</button>
                    <button>edit</button>
                </div>)}
                {/* the Modal */}
                <div id="myModal" className="modal">
                    <div className="closing">
                        <h2>Create a new task </h2>
                        <span className="Close" onClick={handleCloseModal}>X</span>
                    </div> 
                    <form action="" className="modal-form">
                        <input type="text" className="modal-input" placeholder="Task Name"/>
                        <select name="" id="">
                            <option value="">Select Priority</option>
                            <option value="">Low</option>
                            <option value="">Medium</option>
                            <option value="">High</option>
                        </select><br /><br />
                        <textarea name="" id="" placeholder="Task Description"></textarea>
                    </form>
                    <button className="modal-add" onClick={fetchfunc} >Add</button>
                </div>
            </div>
        </div>
    );
}

export default Home