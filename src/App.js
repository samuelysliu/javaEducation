import './App.css';
import './index.css';
import Assessment from './pages/assessment';
import Register from './pages/register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Login from './pages/login';
import Index from './pages';
import WriteCode from './pages/writeCode';
import AddProject from './pages/addProject';
import ProjectList from './pages/projectList';
import Profile from './pages/profile';
import MyProject from './pages/myProject';
import AssessmentList from './pages/aseementList';
import ProjectStudentList from './pages/projectStudentList';
import EditProject from './pages/editProject';
import EditProjectContent from './pages/editProjectContent';


function App() {
  const apiPath = 'http://127.0.0.1:8000';
  const token = localStorage.getItem('token')

  const config = {
    headers: { Authorization: `JWT ${token}` }
  };

  const [username, setUsername] = useState();

  useEffect(() => {
    axios.get(apiPath + '/api/userProfile', config)
      .then((res) => {
        setUsername(res['data'].username)
      })
      .catch((error) => console.log())
  }, []);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/projectlist" element={<ProjectList config={config} />}></Route>
        <Route path="/writeCode" element={<WriteCode username={username} config={config}/>}></Route>
        <Route path='/assessmentList' element={<AssessmentList config={config}/>}></Route>
        <Route path='/projectStudentList' element={<ProjectStudentList config={config} />}></Route>
        <Route path="/assessment" element={<Assessment username={username} config={config}/>}></Route>
        <Route path="/addProject" element={<AddProject config={config}/>}></Route>
        <Route path="/profile" element={<Profile username={username} config={config}/>}></Route>
        <Route path="/editProject" element={<EditProject config={config} />}></Route>
        <Route path="/editProjectContent" element={<EditProjectContent config={config} />}></Route>
        {/*<Route path='/myProject' element={<MyProject config={config}/>}></Route>*/}
      </Routes>
    </Router >
  )
}

export default App;
