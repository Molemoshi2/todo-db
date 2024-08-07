import { Link } from "react-router-dom";
import { useState } from "react";

function Register(){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [newPassword,setNewPassword] = useState('')

    // initialize the list
    const [users,setUsers] = useState(()=>{
        const Myusers = localStorage.getItem('Users')
        if (Myusers){
            console.log('here')
            return JSON.parse(Myusers)
        }
        else return []
    })
    
    const [isactive,setActive] = useState(false)

    //span and div error style
    const errorSpan = {
        borderColor: isactive?'red':''
    }
    const errormsg = {
        diplay:isactive?'block':'none',
        color:isactive?'red':'white'
    }

    // get email
    function handleChangeEmail(event){
        setEmail(event.target.value)
        console.log(email)
    }
    // get password
    function handleChangePassword(event){
        setPassword(event.target.value)
        console.log(password)
    }

    // confirm password
    function handleConfirmPassword(event){
        setNewPassword(event.target.value)
        console.log(newPassword)

    }
    // handle button click
    function handleButtonClick(event){
        
        //lets try form validation
        if (!email.includes('@') && email.trim()==''){
            setActive(true)
            event.preventDefault()
         }
        else if(password.length<6 && password.trim()=='' ){
            setActive(true)
            event.preventDefault()
        }
        else if(newPassword!==password){
            setActive(true)
            event.preventDefault()
        }
        else{
            const newusers = [...users,{email:email,password:password}];
            localStorage.setItem('Users',JSON.stringify(newusers));
            alert('success')
        }

    }

    return(
        <div className="Main">
        <h1>Welcome to your task managing web application </h1>
        <form action="" className="Mini-Main" onSubmit={handleButtonClick}>
            <h2>Sign Up</h2>
            
                <input type="email" placeholder="Enter Email" style={errorSpan} onChange={handleChangeEmail}/>
                
                <br /><span style={errormsg}>Invalid Email</span><br />

                <br /><br />
                <input type="text" placeholder="Create new Password" style={errorSpan} onChange={handleChangePassword} />
                <br /> <span style={errormsg}>Password should contain more than 6 characters</span><br />
                <br /><br />
                <input type="text" placeholder="Confirm password" style={errorSpan} onChange={handleConfirmPassword} /><br />
                <span style={errormsg}>password should match</span><br />

                <Link className='login-link' to={'/LogIn'} onClick={handleButtonClick} ><button type="submit" className="login-btn">Sign Up</button></Link>
        </form >
        
    </div>
    );
}
export default Register