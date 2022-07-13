import { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import Home from "./Home";
import App from "./App";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Signin from "./SignIn";

const Login = ({setToken, setRole, setName}) => {
    const [username, setUsername]= useState('');
    const [pass, setPass]= useState('');
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const history= useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const user= {username, pass};
        console.log(user);
        setLoading(true);
        fetch('http://localhost:3001/login',{
            method: 'POST',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(user)
        }).then(res => res.json())
        .then((data)=> {
            console.log(data);
            setToken({token:data._id});
            console.log(data.role);
            setRole({role:data.role});
            setName({name:data.username})
            setLoading(false);
            //console.log('login successful');
            /*if(data!=null){
               return <Home role = {data.role}/>
            }*/
            console.log('login successfull')
            //history.go(-1);//this leads to the page that is opened just before the current page
            //history.push('/')//this leads to the page that is inside ''

        }).catch(err => {
            console.log(err);
            setLoading(false);
            console.log('login failed');
            setError(true);

        })
    }

    return ( 
        <div className="login"> 
        {isError && <div className="error"><p>Username or password is wrong!!</p></div>}
            <h2>Login</h2>
            <form>
                <label>Enter username:</label>
                <input
                type="text"
                required
                value={username}
                onChange={(e)=> setUsername(e.target.value)}
                />
                <label>Enter password:</label>
                <input
                type="password"
                required
                value={pass}
                onChange= {(e) => setPass(e.target.value)}
                />
                {!isLoading && <button onClick={handleSubmit}>Login</button>}
                {isLoading && <button disabled>Login...</button>}
                <div className="links">
                <p>New here <Link to="/signin">Signin</Link></p>
                </div>
            </form>
        </div>
     );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired,
    setRole: PropTypes.func.isRequired,
    setName: PropTypes.func.isRequired
  }
 
export default Login;