import React from 'react'
import { useHistory } from "react-router-dom";
function StudentDashboard() {
    const history = useHistory();
    var token = localStorage.getItem('token');
    if(!token) history.push('/login');
    const navigateQuiz = () => {
        history.push('/subjects');
      };
    const navigateResult = () => {
        history.push('/result');
      };
  return (
    <>
    <h1 className="student-heading" style={{textAlign:'center', marginTop:"5rem", fontSize:"2rem"}}>Welcome to the Student Dashboard</h1>
    <div className="home-button-div">
      <button className="home-button" onClick={navigateQuiz}>Attempt Quiz</button>
      </div>
    <div className="home-button-div">
      <button className="home-button" onClick={navigateResult}>View Result</button>
      </div>
      </>
  )
}

export default StudentDashboard