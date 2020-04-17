import React from 'react';
import FufflyFood from './pages';

const getUrlParas = () =>{
  var vars = {};
  
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (str, key, value)=>{
      vars[key] = value;
  });
  return vars;
}

function App() {
  const Id = getUrlParas().d;
  return (
        <FufflyFood d={Id}/>
  );
}

export default App;
