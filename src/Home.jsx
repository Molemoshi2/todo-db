function Home(){


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
                    <button className="modal-add" >Add</button>
                </div>
            </div>
        </div>
    );
}

export default Home