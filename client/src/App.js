
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

//components
import {News} from "./components/news/news";
import {Settings} from "./components/settings/settings";
import {Chats} from "./components/chats/chats";
import {NoMatch} from "./components/404/noMatch";

function App() {
    console.log(process.env.NODE_ENV);
  return (
    <Router>
      <Routes>
          <Route exact path='signUp' element = { < SignUp /> }/>
          <Route exact path='signIn' element={ <Login/> }/>
          <Route path='main' element={ < Main /> } >
              {/*<Route index element={<Main/>}/>*/}
              <Route path='news' element={<News/>} />
              <Route path='chats' element={<Chats/>} />
              <Route path='settings' element={<Settings/>}/>
              <Route path='*' element={<NoMatch />}/>
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
