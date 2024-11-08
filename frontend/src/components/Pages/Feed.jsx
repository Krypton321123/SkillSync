import React, { useEffect, useState } from 'react';
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import PostCard from '../PostComponents/PostCard';
import UpdateProfileCard from '../UserComponents/UpdateProfileCard';

function Feed () {
  const [sizes, setSizes] = useState(['0%', '35%', 'auto']);

  const adjustLayout= ()=>{
    if(window.innerWidth<1280){
      setSizes(['05', '100%', '0%']);
    }
    else{
      setSizes(['0%', '35%', 'auto']);
    }
  }

  useEffect(()=>{
    adjustLayout();
    window.addEventListener('resize', adjustLayout);
    return ()=>{
      window.removeEventListener('resize', adjustLayout);
    }

    // Its a solution event listeners I dont understand this completelty yet used for testing purposes.

  })

  const layoutCSS = {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    overflowY: 'scroll',
    scrollbarWidth: 'none',
    
  };

  

  return (
    <div style={{ height: 500 }} className='mt-4'>
      <SplitPane
        split='vertical'
        sizes={sizes}
        onChange={setSizes}
      >
        <Pane minSize={50} maxSize='50%'>
          <div style={{ ...layoutCSS, background: '#36454F' }}>
            User Settings will be shown here
          </div>
        </Pane>
        <div style={{ ...layoutCSS, background: 'black' }}>
          <PostCard />
        </div>
        <div style={{ ...layoutCSS, background: '#36454F' }}>
          <UpdateProfileCard /> 
        </div>
      </SplitPane>
    </div>
  );
};

export default Feed;