import React, { useEffect, useState } from "react"
import "./Quiz.css";
import { useParams } from "react-router-dom";
import { NavLink, useHistory } from 'react-router-dom'


const Quiz = () => {
  const history = useHistory();
  var token = localStorage.getItem('token');
  if(!token) history.push('/login');
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [score, setScore] = useState(0)
  const {quizid} = useParams();


  var uid = null
  if (token) {
    const payload = token.split(".")[1];
    const decodedPayload = atob(payload);
    const decodedPayloadObj = JSON.parse(decodedPayload);
     uid =  decodedPayloadObj.user_id;
  }

  const updateMarks = async () => {
    const res = await fetch('/results', {
        method:"POST",
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body:JSON.stringify({
          email: uid, subject: quizid, marks: score
        })
    });
    const data = await res.json();
    if(res.status === 400 || !data){
        window.alert("Error Occured");
      }else{
      window.alert("Score Stored");
    }
}

  const fetchQuestionData = () => {
    fetch("/subjects/"+quizid+"/", { method: 'GET' ,
    headers: {
      'Authorization': `Bearer ${token}`
    }})
      .then(response => {
        return response.json()
      })
      .then(data => {
        setQuestions(data)
      })
  }
  const handleAnswerButtonClick = (selected, ans) => {
    if (selected === ans) {
      setScore(score + 1);
    }
    const nextQuetions = currentQuestion + 1; 
    if (nextQuetions < questions.length) {
      setCurrentQuestion(nextQuetions);
    }
    else {
      console.log(score)
          updateMarks();
      setShowScore(true)
    }
  }
  useEffect(() => {
    if (showScore) {
      updateMarks();
    }
  }, [score]);
  useEffect(() => {
    fetchQuestionData()
  }, [])
  

  return (
    <>
      <h1 className='header'>Quiz</h1>
      <div className="quiz">
        {showScore || questions.length === 0 ? (
          <div className='score-section'>
            You scored {score} out of {questions.length}
          </div>
        )
          :
          (
            <>
              <div className='question-section'>
                <div className='question-count'>
                  <span>Question {currentQuestion + 1}</span>{questions.length}
                </div>
                <div className='question-text'>
                  {questions[currentQuestion].que}
                </div>
              </div>
              <div className='answer-section'>
                    <button className="option-button"  onClick={() => handleAnswerButtonClick(questions[currentQuestion].option1, questions[currentQuestion].correctoption)}>{questions[currentQuestion].option1}</button>
                    <button className="option-button" onClick={() => handleAnswerButtonClick(questions[currentQuestion].option2, questions[currentQuestion].correctoption)}>{questions[currentQuestion].option2}</button>
                    <button className="option-button" onClick={() => handleAnswerButtonClick(questions[currentQuestion].option3, questions[currentQuestion].correctoption)}>{questions[currentQuestion].option3}</button>
                    <button className="option-button" onClick={() => handleAnswerButtonClick(questions[currentQuestion].option4, questions[currentQuestion].correctoption)}>{questions[currentQuestion].option4}</button> 
              </div>
            </>
          )}
      </div>
    </>
  );
}

export default Quiz;