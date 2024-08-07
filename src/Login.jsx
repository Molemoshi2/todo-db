import { Link } from "react-router-dom";
import { useState} from "react";



function LogIn(){
    
    const [email,setEmail] = useState('')
    const [password, setPassword]= useState('')
    const [users,setUsers] = useState(()=>
        {
        const Myusers = localStorage.getItem('Users')
        if (Myusers){
            console.log('here')
            return JSON.parse(Myusers)
        }
        else return []
    })
    const [isactive,setActive] = useState(false)
    const [errors,setErrors] = useState({email:email,password:password})
    const errorSpan = {
        borderColor: isactive?'red':''
    }
    const errormsg = {
        diplay:isactive?'block':'none',
        color:isactive?'red':'white'
    }

    //get email
    function handleUserEmail(event){
        setEmail(event.target.value)
        
    }
    

    function handleUserPassword(event){
        setPassword(event.target.value)
    }

    function handleFormSubmit(e){
        
        if (!email.includes('@')){
            e.preventDefault()
            setErrors({...errors,email:'email must include @'})
            setActive(true)
        }
        else if(email.trim()=='' && password.trim()==''){
            setErrors({...errors,email:'cannot be empty'})
        }
        else if((email!==users[0].email && password!==users[0])){
            e.preventDefault()
            setActive(true)
            setErrors({...errors,email:'user doesn\'t exist '})
        
        }
        else{
            alert('success')
        }
    }
    return(
        <div className="Main">
        <h1>Welcome to your task managing web application </h1>
        <div className="Mini-Main" >
            <h2>login to continue</h2>
            
                <form action="" >
                    <br /><br />
                    <input type="email"  required placeholder="Enter Email" style={errorSpan} onChange={handleUserEmail} />
                    <br /><span style={errormsg}>{errors.email}</span><br />

                    <br /><br />
                    <input style={errorSpan} type="password" placeholder="Enter Password" onChange={handleUserPassword} /><br />
                    <span style={errormsg}>{errors.email}</span><br />

                    <Link to={'/Home'} className="login-link" onClick={handleFormSubmit}><button type="submit" className="login-btn" >login</button></Link>
                    <div className="signUp">
                        <p>no accout yet?</p>
                        <Link to={'/Register'}>Sign up</Link>
                    </div>
                </form>
        </div>
        
    </div>
    );

}

export default LogIn