import { useState } from 'react'
import SignUp from './components/AuthenticationComponents/SignUp.jsx'
import Login from './components/AuthenticationComponents/Login.jsx'
import CreateCommunityCard from './components/CommunityComponents/CreateCommunityCard.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppBar from './components/global/appBar.jsx'
import AppBarForAuth from './components/global/AppbarForAuth.jsx'
// import AppBar from './components/global/appBar.jsx'
import PostCard from './components/PostComponents/PostCard.jsx'
import Feed from './components/Pages/Feed.jsx'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<AppBarForAuth><SignUp /></AppBarForAuth>}/>
          <Route path="/signin" element={<AppBarForAuth><Login /></AppBarForAuth>}/>
          <Route path="/test" element={<AppBar><Feed /></AppBar>}/> 
          {/* // this route is for testing */}
        </Routes>
      </BrowserRouter>
      
    </>
    // <>
    // <AppBarForAuth><CreateCommunityCard/></AppBarForAuth>
    
    // </>
  )
}

export default App
