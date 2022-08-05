
import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';


//pages
import {SignUp} from "./pages/register/sign_up";

function App() {

    console.log(process.env.NODE_ENV);
  return (
    <Router>
      <Routes>
        <Route exact path='/signUp' element = { < SignUp /> }/>
      </Routes>


    </Router>
  );
}

export default App;
