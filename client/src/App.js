import React, { useLayoutEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from './components/Navigation'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Logout from './components/Logout'
import Quiz from './components/Quiz'
import EditQuestion from './components/EditQuestion'
import AddQuiz from './components/AddQuiz'
import Result from './components/Result'
import Subjects from './components/Subjects'
import StudentDashboard from './components/StudentDashboard'
import ModifyQuiz from './components/ModifyQuiz'
import './App.css'
import AddQuestion from './components/AddQuestion';
import ModifyQuestion from './components/modifyQuestion';
import ModifySubject from './components/ModifySubject';
import SubjectChart from './components/Analytics/SubjectChart';
import ResultChart from './components/Analytics/ResultChart';
import StudentCounter from './components/Analytics/StudentCounter';
import SubjectCards from './components/Analytics/SubjectCards';
import PieChart from './components/Analytics/PieChart';
import TopStudents from './components/Analytics/TopStudents';
// import AddQuiz from './components/AddQuiz';

const App = () => {
  return(
    <Router>
       <Navigation />
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>
      <Route exact path="/login">
       <Login/>
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/quiz/:quizid">
        <Quiz />
      </Route>
      <Route exact path="/addquestion/:quizid">
        <AddQuestion/>
      </Route>
      <Route exact path="/editQuestion/:quizid">
        <EditQuestion />
      </Route>
      <Route exact path="/result">
        <Result />
      </Route>
      <Route exact path="/student">
        <StudentDashboard />
      </Route>
      <Route exact path="/subjects">
        <Subjects />
      </Route>
      <Route exact path="/addQuiz">
        <AddQuiz />
      </Route>
      <Route exact path="/modifyQuiz">
        <ModifyQuiz />
      </Route>
      <Route exact path="/modifyQuestion/:qid">
        <ModifyQuestion />
      </Route>
      <Route exact path="/subjectChart">
        <SubjectChart />
      </Route>
      <Route exact path="/logout">
        <Logout />
      </Route>
      <Route exact path="/studentCounter">
        <StudentCounter />
      </Route>
      <Route exact path="/subjectCards">
        <SubjectCards />
      </Route>
      <Route exact path="/resultChart">
        <ResultChart />
      </Route>
      <Route exact path="/pieChart">
        <PieChart />
      </Route>
      <Route exact path="/topStudents">
        <TopStudents />
      </Route>
      <Route exact path="/modifySubject/:qid">
        <ModifySubject />
      </Route>
    </Switch>
  </Router> 
  )
}


export default App;
