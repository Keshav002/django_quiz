import { useEffect, useState } from 'react'
import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
function ModifySubject() {
    const {qid} = useParams();
    const subjectId = parseInt(qid);
    const history = useHistory();
    var token = localStorage.getItem('token');
    if(!token) history.push('/login');
    const [subjects, setSubjects] = useState({});
    const [subject_name, setname] = useState('');
    const [subject_description, setdesc] = useState('');
    const fetchSubjectData = async () => {
        const response = await fetch('/subjectdata/'+subjectId+"/", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }).then((response) => {
            return response.json();
        });
        setname(response.subject_name);
        setdesc(response.subject_description);
    };
    const createQuiz = async (e) => {
        e.preventDefault();
        const res = await fetch("/subjectdata/"+subjectId+"/", {
            method: "PUT",
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                subject_name, subject_description
            })
        });
        const data = await res.json();
        if(res.status === 400 || !data){
            window.alert("Error Occured");
        }else{
            history.push('/modifyQuiz');
        }
    }
    useEffect(() => {
        fetchSubjectData();
    }, []);
    return (
        <div>
            
            <section class="sign-in">
            <div class="page-container">
                <div class="signin-content">
                    <div class="signin-form">
                        <h2 class="form-title">Edit Quiz</h2>
                        <form class="register-form" method="POST" id="login-form">
                            <div class="form-group">
                                <label for="your_name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="subject_name" id="your_name" placeholder="Quiz Name" value={subject_name}
                                    onChange={(e) =>setname(e.target.value)}
                                />
                            </div>
                            <div class="form-group">
                                <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                                <input type="text" name="your_pass" id="your_pass" placeholder="Quiz Description" value={subject_description}
                                    onChange={(e) =>setdesc(e.target.value)}
                                />
                            </div>
                            <div class="form-group form-button">
                                <input type="submit" name="signin" id="signin" class="form-submit" value="Edit"
                                    onClick={createQuiz}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        </div>
    )
}

export default ModifySubject
