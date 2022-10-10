import './App.css';
import './index.css';
import Assessment from './pages/assessment';
import Register from './pages/register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React, { useEffect, useState } from "react";
import Login from './pages/login';
import Index from './pages';
import WriteCode from './pages/writeCode';
import AddProject from './pages/addProject';
import ProjectList from './pages/projectList';
import Profile from './pages/profile';
import AssessmentList from './pages/aseementList';
import ProjectStudentList from './pages/projectStudentList';
import EditProject from './pages/editProject';
import EditProjectContent from './pages/editProjectContent';
import { Controller } from './components/controller';
import { useSelector } from 'react-redux'
import Group from './pages/group';
import AnswerSitulation from './pages/answerSitulation';
import ProjectAnswerSitulation from './pages/projectAnserSitulation';
import UserSitulaion from './pages/userSitulation';


function App() {
  const controller = new Controller()
  const apiPath = controller.viewApiPath()
  const userProfile = useSelector((state) => state.userProfile.value)

  const token = userProfile["token"] || localStorage.getItem("token")
  const [config, setConfig] = useState({
    headers: { Authorization: `Bearer ${token}` }
  });

  useEffect(() => {
    setConfig({
      headers: { Authorization: `Bearer ${token}` }
    })
  }, [token])


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index apiPath={apiPath} config={config} />}></Route>
        <Route path="/login" element={<Login apiPath={apiPath} />}></Route>
        <Route path="/register" element={<Register apiPath={apiPath} />}></Route>
        <Route path="/projectlist" element={<ProjectList apiPath={apiPath} config={config} />}></Route>
        <Route path="/writeCode" element={<WriteCode apiPath={apiPath} config={config} />}></Route>
        <Route path='/assessmentList' element={<AssessmentList apiPath={apiPath} config={config} />}></Route>
        <Route path='/projectStudentList' element={<ProjectStudentList apiPath={apiPath} config={config} />}></Route>
        <Route path="/assessment" element={<Assessment apiPath={apiPath} config={config} />}></Route>
        <Route path="/addProject" element={<AddProject apiPath={apiPath} config={config} />}></Route>
        <Route path="/profile" element={<Profile apiPath={apiPath} config={config} />}></Route>
        <Route path="/editProject" element={<EditProject apiPath={apiPath} config={config} />}></Route>
        <Route path="/editProjectContent" element={<EditProjectContent apiPath={apiPath} config={config} />}></Route>
        <Route path="/group" element={<Group apiPath={apiPath} config={config} />}></Route>
        <Route path="/answerSitulation" element={<AnswerSitulation apiPath={apiPath} config={config} />}></Route>
        <Route path="/ProjectAnswerSitulation" element={<ProjectAnswerSitulation apiPath={apiPath} config={config} />}></Route>
        <Route path="/userSitulation" element={<UserSitulaion apiPath={apiPath} config={config} />}></Route>
      </Routes>
    </Router >
  )
}

export default App;
