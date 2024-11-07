import React from 'react'

const PostCard = () => {
  return (
    <div className=''>
      <div>
        <div className='h-80 w-96'>
          <img src='./pexels-brett-sayles-1073083.jpg' className='rounded-lg' />
          <p className='mt-2 mb-1'>Caption</p>
          <div className='flex'>
          <p className='mr-2'>Up</p>
          <p className='mr-2'>down</p>
          <p className='mr-2'>Comments</p>
        </div>
        </div>
      </div>
      <div>
        <div className='h-80 w-96'>
          <img src='./pexels-brett-sayles-1073083.jpg' className='rounded-lg' />
          <p className='mt-2 mb-2'>Caption</p>
          <div className='flex'>
          <p className='mr-2'>Up</p>
          <p className='mr-2'>down</p>
          <p className='mr-2'>Comments</p>
        </div>
        </div>
      </div>
      <div>
        <div className='h-80 w-96'>
          <img src='./pexels-brett-sayles-1073083.jpg' className='rounded-lg' />
          <p className='mt-2 mb-2'>Caption</p>
          <div className='flex'>
          <p className='mr-2'><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-thumb-up"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" /></svg></p>
          <p className='mr-2'>down</p>
          <p className='mr-2'>Comments</p>
        </div>
        </div>
      </div>
      
    </div>
  )
}

export default PostCard
