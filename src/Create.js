import { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import App from "./App";
import Home from "./Home";
import UseToken from "./UseToken";

const Create = () => {
    const [title, setTitle]= useState('');
    const [body, setBody]= useState('');
    const [author, setAuthor]= useState('');
    //const [authorId, setAuthorId] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const history= useHistory();
    const token=UseToken();
    const authorId= token.token;
    //console.log(authorId.token);
    useEffect(()=>{
        alert("Create page loaded")
    },[])
    const handleSubmit = (e) => {
        e.preventDefault();
        const blog= {title, body, author,authorId};
        console.log(blog);
        setLoading(true);
        fetch('http://localhost:3001/create',{
            method: 'POST',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(blog)
        }).then(()=> {
            console.log('new blog added');
            setLoading(false);
            //history.go(-1);//this leads to the page that is opened just before the current page
            history.push('/')//this leads to the page that is inside ''

        }).catch(error => {
            setError(true);
        })
    }

    return (
        <div className="create"> 
            <h2>Add a new blog</h2>
            <form>
                <label>Blog title:</label>
                <input
                type="text"
                required
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
                />
                <label>Blog body:</label>
                <textarea
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <label>Blog author:</label>
                <input
                type="text"
                required
                value={author}
                onChange= {(e) => setAuthor(e.target.value)}
                />
                {isError && <App />}
                {!isLoading && <button onClick={handleSubmit}>Add blog</button>}
                {isLoading && <button disabled>Adding a new blog</button>}
            </form>
        </div>
     );
}
 
export default Create;