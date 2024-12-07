import { useState } from 'react'
import SignUp from './components/AuthenticationComponents/SignUp.jsx'
import Login from './components/AuthenticationComponents/Login.jsx'
import CreateCommunityCard from './components/CommunityComponents/CreateCommunityCard.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppBar from './components/global/AppBar.jsx'
import AppBarForAuth from './components/global/AppbarForAuth.jsx'
import Dashboard from "./components/Pages/Dashboard.jsx";
import UpdateProfileCard from "./components/UserComponents/UpdateProfileCard.jsx";
import CreateCommunity from "./components/Pages/CreateCommunity.jsx";
import DetailedCommunity from "./components/Pages/DetailedCommunity.jsx";
import Sidebar from "./components/global/Sidebar.jsx";
import DefaultPage from './components/global/DefaultPage.jsx'
import RoomCard from './Room/RoomCard.jsx'
import DetailedUserPage from "./components/Pages/DetailedUser.jsx";
import ChatPage from "./components/Pages/ChatPage.jsx";
import CreatePost from "./components/Pages/CreatePost.jsx";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultPage />} />
          {/* <Route path="/meeting" element={<meeting />} /> */}
    
          <Route path="/signup" element={<AppBarForAuth><SignUp /></AppBarForAuth>}/>
          <Route path="/signin" element={<AppBarForAuth><Login /></AppBarForAuth>}/>
          <Route path="/test" element={<AppBar><Sidebar><Dashboard /></Sidebar></AppBar>}/>
          <Route path={"/updateProfile"} element={<Sidebar><AppBar><UpdateProfileCard /></AppBar></Sidebar>}/>
          <Route path={"/createCommunity"} element={<Sidebar><AppBar><CreateCommunity /></AppBar></Sidebar>}/>
          <Route path={"/detailedcommunity/:id"} element={<Sidebar><AppBar><DetailedCommunity /></AppBar></Sidebar>}/>
          <Route path='/room' element={<Sidebar><AppBar><RoomCard /></AppBar></Sidebar>}/>
          <Route path={'/user/:id'} element={<Sidebar><AppBar><DetailedUserPage /></AppBar></Sidebar>}/>
          <Route path={'/chat'} element={<Sidebar><AppBar><ChatPage /></AppBar></Sidebar>}/>
          <Route path={"/createPost"} element={<Sidebar><AppBar><CreatePost /></AppBar></Sidebar>}/>
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
