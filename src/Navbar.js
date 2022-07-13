import { Link } from 'react-router-dom';
import App from './App';
import UseName from './UseName';
import UseToken from './UseToken';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
const Navbar= () => {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    const name=UseName().name;
    const handleLogout = () => {
        sessionStorage.clear();
        const token=UseToken.token;
        if(!token){
            root.render(
                  <App />
              );
        }
    }
    return ( 
        <nav className="navbar">
            <h1>Travels Blogs</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create">New Blog</Link>
                <button onClick={handleLogout}>Log out</button>
            </div>
            <div className='profile'>
                <p>{name}</p>
            </div>
        </nav>
    );
}

export default Navbar;