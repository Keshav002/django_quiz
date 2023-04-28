import React, {useContext, useEffect, useState } from 'react'
import "./Navigation.css";
import { NavLink } from 'react-router-dom'
// import logoPic from '../images/logo6n.png'
// import {UserContext} from '../App';


const Navigation = ({color}) => {
    const [userName, setUserName] = useState("");
    const [userRole, setUserRole] = useState("");
    var token = localStorage.getItem('token');
    var id = null
        if (token) {
          const payload = token.split(".")[1];
          const decodedPayload = atob(payload);
          const decodedPayloadObj = JSON.parse(decodedPayload);
           id =  decodedPayloadObj.user_id;
          console.log(id);
        }
    const fetchUserName = async () => {
        const res = await fetch(`/students/${id}/`,{
            
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await res.json();
                setUserName(data.username)
                setUserRole(data.role)
           
    }
    const RenderMenu = () => {
        if(token){
            return(
                <>
                     <ul>
                        
                     {userRole === "teacher" ? (
                    <li><NavLink to="/modifyQuiz" style={{color:color}}>Home</NavLink></li>
                ) : (
                    <li><NavLink to="/subjects" style={{color:color}}>Home</NavLink></li>
                )}
                
                    <li><NavLink to="/logout" style={{color:'red'}}>Logout</NavLink></li>
                    <li style={{color:'blue', marginRight:"2rem",marginTop:".8rem", fontWeight:"bolder", fontSize:"1.2rem"}}>Welcome {userName}</li>
                    {console.log(userName)}
                    {console.log(id)}
                
                    
                    
            </ul>
                </>
            )
        }else{
            return(
                <>
                <ul>
                    {/* <li><NavLink to="/" style={{color:color}}>Home</NavLink></li> */}
                    <li><NavLink to="/login" style={{color:color}}>Login</NavLink></li>
                    <li><NavLink to="/signup" style={{color:color}}>Register</NavLink></li>  
               </ul>
                </>
            )
        }
    }
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);

    // const [userName, setUserName] = useState("");
    // const callNavPage = async () => {
    //     try {
    //         const res = await fetch('/getdata', {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //         });
    //         const data = await res.json();
    //         //console.log(data);
	// 		    setUserName(data.name);
    //       setShow(true);
    //     } catch (err) {
    //       //  console.log(err);
    //     }
    // }
    useEffect(() => {

        // decodeToken()
        fetchUserName()
    }, []);
 

    return (
        <nav className="navbar">
            {/* <div className="brand-title" style={{color:color}}>iBid.</div> */}
           
            <div className="brand-title">
            <img src="https://img.icons8.com/external-smashingstocks-flat-smashing-stocks/66/000000/external-Quiz-school-smashingstocks-flat-smashing-stocks.png"/>
                <h3>QuizApp</h3>
            
            </div>
            
        <a href="#0" className="toggle-button" onClick={() => setOpen(!open)}>  {/*toggle button */}
                <span className="bar" style={{backgroundColor:color}}></span>
                <span className="bar" style={{backgroundColor:color}}></span>
                <span className="bar" style={{backgroundColor:color}}></span>
            </a>
            
            <div className={`navbar-links ${open ? 'active' : ''}`}>
                <RenderMenu />
           
        </div>
    </nav>

            )
}

 export default Navigation
