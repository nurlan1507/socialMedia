
import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';


//pages
import {SignUp} from "./pages/register/sign_up";

function App() {


  return (
    <Router>
      <Routes>
        <Route exact path='/signUp' element = { < SignUp /> }/>
      </Routes>


    </Router>
  );
}

export default App;
