import { useState } from 'react'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import OpenRoute from './components/core/Auth/OpenRoute'
import PrivateRoute from './components/core/Auth/PrivateRoute'
import VerifyEmail from './pages/VerifyEmail'
import UpdatePassword from './pages/UpdatePassword'
import ForgotPassword from './pages/ForgotPassword'
import About from './pages/About'
import ContactUs from './pages/ContactUs'
import MyProfile from './components/core/Dashboard/MyProfile'
import Dashboard from './pages/Dashboard'
import Error from './pages/Error'
import Settings from './components/core/Dashboard/Settings/index'
import { useSelector } from 'react-redux'
import { ACCOUNT_TYPE } from './utils/Constant'
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses'
  function App(){
    const {user} = useSelector((state) => state.profile);
    return (
      <div className=' w-screen min-h-screen bg-richblack-900 flex flex-col font-inter '>
          <Navbar/>
          <Routes>
              <Route path='/' element = {<Home/>}/>
              <Route path='/login' element = {<OpenRoute><Login/></OpenRoute>}/>
              <Route path='/signup' element = {<OpenRoute><Signup/></OpenRoute>}/>
              <Route path='/verify-email' element = {<OpenRoute><VerifyEmail/></OpenRoute>}/>
              <Route path='/update-password/:id' element = {<OpenRoute><UpdatePassword/></OpenRoute>}/>
              <Route path='/forgot-password' element = {<OpenRoute><ForgotPassword/></OpenRoute>} />
              <Route path='/about' element = {<About/>}/>
              <Route path='/contact' element = {<ContactUs/>}/>
               <Route element={
                  <PrivateRoute>
                    <Dashboard/>
                  </PrivateRoute>
                }>
                <Route path='/dashboard/my-profile' element = {<MyProfile/>} />
                <Route path='/dashboard/settings' element = {<Settings/>}/>
                {
                  user?.accountType === ACCOUNT_TYPE.STUDENT && (
                    <>
                      <Route path = '/dashboard/enrolled-courses' element = {<EnrolledCourses/>}/>
                    </>
                  )
                }
               </Route>

               <Route path='*' element = {<Error/>}/>
          </Routes>
      </div>
    )
  }

export default App
