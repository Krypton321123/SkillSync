import React from 'react';

const posts = [
  { id: 1, image: './post1.jpg', caption: 'Caption for Post 1' },
  { id: 2, image: './post2.jpg', caption: 'Caption for Post 2' },
  { id: 3, image: './post3.jpg', caption: 'Caption for Post 3' },
  { id: 4, image: './post4.jpg', caption: 'Caption for Post 4' },
];

const PostCard = () => {
  return (
    <div className='ml-4 mr-4'>
      {posts.map((post) => (
        <div key={post.id} className='mt-4 mb-6'>
          <div className='h-80 w-96'>
            <img src={post.image} alt={post.caption} className='rounded-lg h-64 w-96' />
            <p className='mt-2 mb-2'>{post.caption}</p>
            <div className='flex mb-2'>
              <p className='mr-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-thumb-up">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
                </svg>
              </p>
              <p className='mr-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-thumb-down">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3" />
                </svg>
              </p>
              <p className='mr-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-messages">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
                  <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
                </svg>
              </p>
            </div>
            <div className='border'></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostCard;
