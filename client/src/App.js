
import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';


//pages
import {Login} from "./pages/login/login";
import {SignUp} from "./pages/register/sign_up";
import {Main} from './pages/main/main';
function App() {
    console.log(process.env.NODE_ENV);
  return (
    <Router>
      <Routes>
          <Route exact path='/signUp' element = { < SignUp /> }/>
          <Route exact path='/signIn' element={ <Login/> }/>
          <Route path='/main' element={ < Main />  } />
      </Routes>
    </Router>
  );
}

export default App;
