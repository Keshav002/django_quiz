import { useState, useEffect } from 'react';
import "./StudentCounter.css";
function StudentCounter(props) {
    var token = localStorage.getItem('token');

    const{var1} = props;
    const [count, setCount] = useState(0);
    const [question, setQuestion] = useState([]);
    const [student, setStudent] = useState([]);
    const fetchStudent = async () => {
        const res = await fetch(`/students`,{
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await res.json();
                setStudent(data)
            }
    const fetchQue = async () => {
        const res = await fetch(`/questions`,{
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await res.json();
                setQuestion(data)
            }

    useEffect(() => {
        fetchStudent()
        fetchQue()
        const timer = setInterval(() => {
            setCount(count => {
                if (count < 30) {
                    return count + 1;
                } else {
                    clearInterval(timer);
                    return count;
                }
            });
        }, 100);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className="group">
            <div className="card-style">
                <div className="glass-style">
                    <div className="data-group">
                        <p className="count-style">Students</p>
                        <p className="count-style2">{count >= student.length ? student.length : count}</p>
                    </div>
                    <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person-square" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="card-style">
                <div className="glass-style">
                    <div className="data-group">
                        <p className="count-style">Subjects</p>
                        <p className="count-style2">{count >= var1 ? var1 : count}</p>
                    </div>
                    <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-card-text" viewBox="0 0 16 16">
                            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                            <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="card-style">
                <div className="glass-style">
                    <div className="data-group">
                        <p className="count-style">Questions</p>
                        <p className="count-style2">{count >= question.length ? question.length : count}</p>
                    </div>
                    <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-menu-app-fill" viewBox="0 0 16 16">
                            <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h2A1.5 1.5 0 0 1 5 1.5v2A1.5 1.5 0 0 1 3.5 5h-2A1.5 1.5 0 0 1 0 3.5v-2zM0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2H1zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2h14zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
                        </svg>
                    
                </div>
            </div>
        </div>
        </div >
    );
}

export default StudentCounter;
