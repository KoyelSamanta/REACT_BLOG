import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import Signin from './SignIn';
import Login from './Login';
import { useState } from 'react';
import UseToken from './UseToken';
import UseRole from './UseRole';
import UseName from './UseName';
import LogOut from './LogOut';
import UseNavbar from './UseNavbar';


function App() {
  const { token, setToken} = UseToken();
  const { role, setRole } = UseRole();
  const { name, setName } = UseName();
  const { navbar, setNavbar} = UseNavbar();
  //const arr=[setToken, setRole]
 
  /*if(!token) {
    return <Login setToken= {setToken} setRole= {setRole} setName = {setName}/>
  }*/
  console.log(token);
  console.log(name);
  return (
    <Router>
      <div className="App">
       {token && <Navbar />}
        <div className='content'>
          <Switch>
            <Route exact path='/'>
              {!token && <Login setToken= {setToken} setRole= {setRole} setName = {setName}/>}
              {token && <Home/>}
            </Route>
            <Route path='/create'>
              <Create/>
            </Route>
            <Route path='/blogs/:id'>
              <BlogDetails/>
            </Route>
            <Route path='/logout'>
              <Login/>
            </Route>
            <Route path='/signin'>
              <Signin/>
            </Route>
            <Route path='*'>
              <NotFound/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
