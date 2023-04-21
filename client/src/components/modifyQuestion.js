import React, { useEffect, useState } from 'react'
import {useHistory, useParams} from 'react-router-dom'

function ModifyQuestion() {
    const history = useHistory();
    const {qid} = useParams();
    const [que, setQue] = useState({})
    var token = localStorage.getItem('token');
    if(!token) history.push('/login');
    // const {quizid} = useParams();
    // console.log(quizid)
    const [question, setQuestion] = useState({
        que:"", subject:"", option1:"", option2:"", option3:"", option4:"", correctoption:""
    });
    const fetchQue = async () => {
        const res = await fetch(`/questions/${qid}/`,{
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await res.json();
                setQuestion(data)
            }
    let name, value;
    const handleInput = (e) => {
        // name = e.target.name;
        // value = e.target.value;
        setQuestion({ ...question,
            [e.target.name]:e.target.value});
        
    }

    const PostData = async (e) => {
        e.preventDefault();
        const {que, subject, option1, option2, option3, option4, correctoption} = question;
        const res = await fetch("/questions/"+qid+"/", {
            method: "PUT",
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                que, subject, option1, option2, option3, option4, correctoption
            })
        });
        const data = await res.json();
        if(res.status === 400 || !data){
            window.alert("Check the options again!");
            
        }else{
              window.alert("Question Updated");
        }
    }
    useEffect(() => {
        fetchQue()
    }, [])
    return (
        <>
            {/* <!-- Sign up form --> */}
        <section class="signup">
            <div class="page-container mt-5" >
                <div class="signup-content" >
                    <div class="signup-form" >
                        <h2 class="form-title">Change the Required Fields</h2>
                        <form method="POST" class="register-form" id="register-form" >
                            <div class="form-group" >
                                <label htmlFor="Question" ><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="que" id="name" autoComplete="off" value={question.que}
                                onChange={handleInput} placeholder="Question"/>
                            </div>
                            <div class="form-group">
                                <label for="option1"><i class="zmdi zmdi-email"></i></label>
                                <input type="text" name="option1" id="email" autoComplete="off" value={question.option1}
                                onChange={handleInput} placeholder="Option 1" />
                            </div>
                            <div class="form-group">
                                <label for="option2"><i class="zmdi zmdi-email"></i></label>
                                <input type="text" name="option2" id="email" autoComplete="off" value={question.option2}
                                onChange={handleInput} placeholder="Option 2" />
                            </div>
                            <div class="form-group">
                                <label for="option3"><i class="zmdi zmdi-email"></i></label>
                                <input type="text" name="option3" id="email" autoComplete="off" value={question.option3}
                                onChange={handleInput} placeholder="Option 3" />
                            </div>
                            <div class="form-group">
                                <label for="option4"><i class="zmdi zmdi-email"></i></label>
                                <input type="text" name="option4" id="email" autoComplete="off" value={question.option4}
                                onChange={handleInput} placeholder="Option 4" />
                            </div>
                            <div class="form-group">
                                <label for="ocorrect"><i class="zmdi zmdi-email"></i></label>
                                <input type="text" name="correctoption" id="email" autoComplete="off" value={question.correctoption}
                                onChange={handleInput} placeholder="Correct Option" />
                            </div>
                            <div class="form-group form-button">
                                <input type="submit" name="createquestion" id="signup" class="form-submit" value="Create" onClick={PostData}/>
                            </div>
                        </form>
                    </div>
                    <div class="signup-image">
                        <figure><img  alt=""/></figure>
                        {/* <NavLink to="/login" class="signup-image-link">I am already Registered</NavLink> */}
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default ModifyQuestion
