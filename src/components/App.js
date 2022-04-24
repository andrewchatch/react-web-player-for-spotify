import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import UnauthApp from './no-auth/UnauthApp';
import AuthApp from './auth/AuthApp';

const url = 'http://localhost:8000';

const App = (props) => {

    return (
      <div className="App">

        <Router>
          <Routes>
            <Route path="/" exact element={<UnauthApp url={url} />} />
            <Route path="/auth/*" exact element={<AuthApp/>} />
          </Routes>
        </Router>
        
      </div>
    );
  
}

export default App;
