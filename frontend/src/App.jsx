import { useState } from 'react'
import SignUp from './components/AuthenticationComponents/SignUp.jsx'
import Login from './components/AuthenticationComponents/Login.jsx'
import CreateCommunityCard from './components/CommunityComponents/CreateCommunityCard.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppBar from './components/global/AppBar.jsx'
import AppBarForAuth from './components/global/AppbarForAuth.jsx'
// import AppBar from './components/global/appBar.jsx'
import PostCard from './components/PostComponents/PostCard.jsx'
import Feed from './components/Pages/Feed.jsx'
import DefaultPage from './components/global/DefaultPage.jsx'
=======
import Dashboard from "./components/Pages/Dashboard.jsx";



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<AppBarForAuth><SignUp /></AppBarForAuth>}/>
          <Route path="/signin" element={<AppBarForAuth><Login /></AppBarForAuth>}/>
          <Route path="/test" element={<AppBar><Dashboard /></AppBar>}/>
          {/* // this route is for testing */}
          <Route path="/" element={<DefaultPage />} />
        </Routes>
      </BrowserRouter>
      
    </>
    // <>
    // <AppBarForAuth><CreateCommunityCard/></AppBarForAuth>
    
    // </>
  )
}

export default App
