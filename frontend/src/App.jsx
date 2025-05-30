import React from 'react'
import './App.css'
import NavBar from './components/NavBar.jsx'
import Landing from './pages/Landing.jsx'
import Footer from './components/Footer.jsx'
import Show from './pages/Show.jsx'
import New from './pages/New.jsx'
import Edit from './pages/edit.jsx'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import ApplyPage from './pages/ApplyPage.jsx'
import ShowApplications from './pages/ShowApplications.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import YourJobs from './pages/YourJobs.jsx'
import YourApplications from './pages/YourApplications.jsx'
import Profile from './pages/Profile.jsx'
function App() {
 

  return (
    <>
    <div className="body-main">
      <NavBar></NavBar>
      <div className="main-container">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/new" element={<New />} />
            <Route path="/:id" element={<Show/>} />
            <Route path="/edit/:id" element={<Edit/>}/>
            <Route path="/apply/:id" element={<ApplyPage/>}/>
            <Route path="/applications/:id" element={<ShowApplications/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/your-jobs" element={<YourJobs/>}/>
            <Route path="/your-applications" element={<YourApplications/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Routes>
      </div>
      <Footer></Footer>
    </div>
    </>
  )
}

export default App
