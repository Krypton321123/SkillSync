import React from 'react'
import { useRecoilValue } from 'recoil'
import { loginAtom } from '../../store/atoms/loginAtom'
import { useNavigate } from 'react-router-dom'

const AppBar = ({children}) => {
    const navigate = useNavigate(); 
    const loggedIn = useRecoilValue(loginAtom)

  return (
    <>
    <div className='w-full h-16 border-y-2 flex justify-between items-center'>
        <div className='logo'>
            <span className="text-xl whitespace-nowrap px-2">SkillSync</span>    
        </div>
        <div className="search hidden md:flex lg:flex justify-start items-center">
            <svg  xmlns="http://www.w3.org/2000/svg" width="26"  height="26"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round" className="mr-3 icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
            <input type="text" className="searchbar bg-green-300 rounded-3xl w-72 px-4 py-2 hover:opacity-70 focus:opacity-70" placeholder='Search anything...'/>
        </div>
        <div className="buttons">
            {loggedIn === true ? 
                <>
                    <button>Create</button>
                </>
                : <>
                    <button onClick={(e) =>{ 
                        e.preventDefault(); 
                        navigate('/signin')
                    }} className='login font-semibold w-16 p-2 hover:bg-gray-300 rounded-3xl'>Login</button>
                    <button onClick={(e) => {
                        e.preventDefault(); 
                        navigate('/signup')
                    }} className='signup font-semibold mr-2 w-20 p-2 hover:bg-gray-300 rounded-3xl'>Sign Up</button>
                </>}
        </div>
        
    </div>
    {children}
    </>
  )
}

export default AppBar