import React, { useState } from 'react';
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import PostCard from '../PostComponents/PostCard';

function Feed () {
  const [sizes, setSizes] = useState([100, '30%', 'auto']);

  const layoutCSS = {
    height: '100%',
    display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    overflow: 'auto'
  };

  return (
    <div style={{ height: 500 }}>
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
          Communties might be shown here 
        </div>
      </SplitPane>
    </div>
  );
};

export default Feed;