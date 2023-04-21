import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { NavLink, useHistory } from 'react-router-dom'
import Result from './Result';
import SubjectChart from './Analytics/SubjectChart';
import StudentCounter from './Analytics/StudentCounter';
import SubjectCards from './Analytics/SubjectCards';
import ResultChart from './Analytics/ResultChart';
import PieChart from './Analytics/PieChart';

function ModifyQuiz() {
    const history = useHistory();
    const [role, setUserRole] = useState("");
    const [subjects, setSubjects] = useState([]);
    var token = localStorage.getItem('token');
    if (!token) window.location.href = "/login";
    var uid = null
    if (token) {
        const payload = token.split(".")[1];
        const decodedPayload = atob(payload);
        const decodedPayloadObj = JSON.parse(decodedPayload);
        uid = decodedPayloadObj.user_id;
    }
    const fetchUserRole = async () => {
        const res = await fetch(`/students/${uid}/`, {

            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await res.json();
        setUserRole(data.role)

    }
    useEffect(() => {
        if (role === "student") {
            history.push('/login');
        }
    }, [role])
    const fetchSubjectData = async () => {
        const response = await fetch("/subjects", {
            method: 'GET',
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
        fetchUserRole()
        fetchSubjectData()
    }, [])
    return (
        <div>
            <StudentCounter var1={subjects.length} />
            <SubjectCards />
            {/* <div style={{display:"flex", flexDirection:"row"}}> */}
            <PieChart/>
            <div className="group" style={{display:"flex", flexDirection:"row"}}>
            <SubjectChart />
            <ResultChart/>
            </div>
            
            {/* </div> */}
            <h3 style={{ backgroundColor: "#FFD6DC", textAlign: "center"}}>
      Results
    </h3>
            <Result />
            {/* <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                <Result />
                <button onClick={() => setIsModalOpen(false)}>Close</button>
            </Modal> */}
        </div>
    )
}

export default ModifyQuiz