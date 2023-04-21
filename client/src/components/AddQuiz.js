import { useState } from 'react'
import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
function AddQuiz() {
  
    const history = useHistory();
    var token = localStorage.getItem('token');
    if(!token) history.push('/login');
    const [subject_name, setname] = useState('');
    const [subject_description, setdesc] = useState('');
    const createQuiz = async (e) => {
        e.preventDefault();
        const res = await fetch('/subjects', {
            method:"POST",
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify({
                subject_name, subject_description
            })
        });
        const data = await res.json();
        if(res.status === 400 || !data){
            window.alert("Error Occured");
        }else{
            // dispatch({type:"USER", payload:true});
            history.push('/modifyQuiz');
        }
    }
    return (
        <div>
            
            <section class="sign-in">
            <div class="page-container">
                <div class="signin-content">
                    <div class="signin-form">
                        <h2 class="form-title">Create a new Quiz</h2>
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
                                <input type="submit" name="signin" id="signin" class="form-submit" value="Create"
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

export default AddQuiz
