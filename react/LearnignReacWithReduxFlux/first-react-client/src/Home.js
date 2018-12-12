import React from 'react';
import Layout from './Layout';

const pagraphStyles = { backgroundColor:"orange" };

export default function Home(){
    return(
      <Layout 
      title="Welcome to React"
      renderContent={()=>(
        <React.Fragment>
          <div className="App-intro" style={pagraphStyles}>Otro</div>
          Test
        </React.Fragment>
      )} 
      />
    );
}