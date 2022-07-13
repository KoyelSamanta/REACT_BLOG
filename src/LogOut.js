import React from 'react';
import { useHistory } from "react-router-dom";
import Login from "./Login";
import UseName from "./UseName";
import UseRole from "./UseRole";
import ReactDOM from 'react-dom/client';
import App from './App';
const LogOut = () => {
    sessionStorage.clear();
    const root= ReactDOM.createRoot(
        document.getElementById('logout')
    );
    root.render(
        <App />
    )
    return ( 
        <div className='logout'></div>
     );
}
 
export default LogOut;