import { useState } from 'react'
import SignUp from './components/AuthenticationComponents/SignUp.jsx'
import Login from './components/AuthenticationComponents/Login.jsx'
import CreateCommunityCard from './components/CommunityComponents/CreateCommunityCard.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppBar from './components/global/appBar.jsx'
import AppBarForAuth from './components/global/AppbarForAuth.jsx'
// import AppBar from './components/global/appBar.jsx'
import PostCard from './components/PostComponents/PostCard.jsx'


function App() {

  return (
    // <>
    //   <BrowserRouter>
    //     <Routes>
    //       <Route path="/signup" element={<AppBarForAuth><SignUp /></AppBarForAuth>}/>
    //       <Route path="/signin" element={<AppBarForAuth><Login /></AppBarForAuth>}/>
    //       <Route path="/test" element={<AppBarForAuth><Login /></AppBarForAuth>}/> 
    //       {/* // this route is for testing */}
    //     </Routes>
    //   </BrowserRouter>
    // </>
    <>
    <AppBar><CreateCommunityCard/></AppBar>
    
    </>
  )
}

export default App
