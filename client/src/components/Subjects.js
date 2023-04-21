import React from 'react'
import { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom";

function Subjects() {
    const [role, setUserRole] = useState("");
    const [subjects, setSubjects] = useState([])
    const history = useHistory();
    var token = localStorage.getItem('token');

    var uid = null
    if (token) {
      const payload = token.split(".")[1];
      const decodedPayload = atob(payload);
      const decodedPayloadObj = JSON.parse(decodedPayload);
       uid =  decodedPayloadObj.user_id;
    }
const fetchUserRole = async () => {
    const res = await fetch(`/students/${uid}/`,{
        
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
            setUserRole(data.role)     
}
useEffect(() => {
    fetchUserRole()
  }, [])

  useEffect(() => {
    if (role !== "" && role !== "student") {
      history.push('/login');
    }
  }, [role])

 
    const navigateQuiz = () => {
        history.push('/quiz');
      }

    const fetchSubjectData = async () => {
        const response = await fetch("/subjects",
            { method: 'GET' ,
        headers: {
          'Authorization': `Bearer ${token}`
        }
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                setSubjects(data)
            })
    }
    useEffect(() => {
        fetchSubjectData()
    }, [])
console.log(subjects)
    return (
        <>
            <h1 className="student-heading" style={{ textAlign: 'center', marginTop: "3rem", fontSize: "2rem" }}>Please select the quiz</h1>
            <div className="subject-page" style={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
            {subjects.map((subject) =>{
                 return(
            <div class="card mt-4 m-4" style={{ width: "15rem", background: "pink" }}>
                <img src="https://static.vecteezy.com/system/resources/thumbnails/013/137/515/small/quality-control-backlog-checklist-control-plan-abstract-flat-color-icon-template-free-vector.jpg" class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">{subject.subject_name}</h5>
                    <p class="card-text" style={{ fontWeight: "800", fontSize: "1rem" }}>{subject.subject_description}</p>
                    <Link to={`/quiz/`+subject.id} class="btn btn-primary">Attempt</Link>
                </div>
            </div>
            );
                   
        })}
        </div>
        </>
    )
}

export default Subjects