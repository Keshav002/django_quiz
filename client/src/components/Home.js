import React from 'react'
import { useHistory } from "react-router-dom";
function Home() {
  const history = useHistory();
  var data = localStorage.getItem('token');
  const navigateStudent = () => {
    if(!data) history.push('/login');
    else
    history.push('/subjects');
  };
  const navigateTeacher = () => {
    if(!data) history.push('/login');
    else
    history.push('/modifyQuiz');
  };
  return (
    <>
      <h1 className="home-heading" style={{ marginTop: "1.5rem" }}>Please select your Role</h1>
      {/* <h1 className="home-heading" style={{ marginTop: "1.5rem" }}></h1> */}
      <div className="home-container">
        <div className="home-div">
          <img src="https://www.citypng.com/public/uploads/small/11658265512jz24fnba4qu8eddwfm2x5ofdgz7ba2oosnrd1kohwg3rmrefgajtrsiuybb7flsbakg63fk1q1g7l6syu9d07dn7fjnvexnsowg9.png" alt="" />
      <div className="home-button-div">
        <button className="home-button" onClick={navigateTeacher}>Teacher</button>
      </div>
        </div>
        <div className="home-div2">
          <img src="https://www.freepnglogos.com/uploads/student-png/student-png-pollpath-27.png" alt="" />
      <div className="home-button-div">
        <button className="home-button" onClick={navigateStudent}>Student</button>
      </div>
        </div>
      </div>

    </>
  )
}

export default Home