import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { NavLink, useHistory } from 'react-router-dom'

function EditQuestion() {
    const history = useHistory();
    var token = localStorage.getItem('token');
    if(!token) history.push('/login');
    const {quizid} = useParams();
    const [questions, setQuestions] = useState([])

  
        async function deleteQuestion(id) {
            await fetch('/questions/'+id+"/", { method: 'DELETE' ,
            headers: {
              'Authorization': `Bearer ${token}`
            }})
            fetchQuestionData();
        }
   
    const fetchQuestionData = async () => {
        const response = await fetch("/subjects/"+quizid+"/",{
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
            .then(response => {
                return response.json()
            })
            .then(data => {
                setQuestions(data)
            })
    }
    useEffect(() => {
        fetchQuestionData()
    }, [])
    return (
        <>
            <div className="container mt-4">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#ID</th>
                            <th scope="col">Question</th>
                            <th scope="col">Option1</th>
                            <th scope="col">Option2</th>
                            <th scope="col">Option3</th>
                            <th scope="col">Option4</th>
                            <th scope="col">Correct</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((question) => {
                
                            return (
                                <tr>
                                    <th scope="row">{question.id}</th>
                                    <th scope="row">{question.que}</th>
                                    <td>{question.option1}</td>
                                    <td>{question.option2}</td>
                                    <td>{question.option3}</td>
                                    <td>{question.option4}</td>
                                    <td>{question.correctoption}</td>
                                    <td>
                                    <div class="btn-group dropend">
                                        <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                            Options
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li> 
                                                <button class="dropdown-item" 
                                            onClick={() => deleteQuestion(question.id)}
                                            type="button">Delete</button>
                                            </li> 
                                             <li> <Link class="dropdown-item" to={`/modifyQuestion/`+question.id} >Edit</Link></li>
                                        </ul>
                                    </div> 
                                    </td>
                                </tr>
                            );
                        })}
                        <Link class="btn btn-primary btn-lg" to={`/addQuestion/`+quizid} style={{position:"absolute", bottom:"10rem", right:"15rem", padding:".5rem", fontSize:"1.5rem" }}>+ Add</Link>
                    </tbody>
                </table>
                <div>
                </div>
            </div>
        </>
    )
}

export default EditQuestion