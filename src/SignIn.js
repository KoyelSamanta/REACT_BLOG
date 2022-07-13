import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Signin = () => {
    const [name, setName] = useState('');
    const [username,setUserName] = useState('');
    const [pass, setPass] = useState('');
    const [isLoading, setLoading] = useState(false);
    const history= useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog= {name, username, pass, role:'user'};
        console.log(blog);
        setLoading(true);
        fetch('http://localhost:3001/signin',{
            method: 'POST',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(blog)
        }).then(()=> {
            console.log('new user added');
            setLoading(false);
            //history.go(-1);//this leads to the page that is opened just before the current page
            history.push('/')})
    }

    return ( 
        <div className="signin"> 
            <h2>Sign in</h2>
            <form>
                <label>Enter name:</label>
                <input
                type="text"
                required
                value={name}
                onChange={(e)=> setName(e.target.value)}
                />
                <label>Enter username:</label>
                <input
                type="text"
                required
                value={username}
                onChange= {(e) => setUserName(e.target.value)}
                />
                <label>Enter password:</label>
                <input
                type="password"
                required
                value={pass}
                onChange= {(e) => setPass(e.target.value)}
                />
                {!isLoading && <button onClick={handleSubmit}>Sign in</button>}
                {isLoading && <button disabled>Adding..</button>}
            </form>
        </div>
     );
}
 
export default Signin;