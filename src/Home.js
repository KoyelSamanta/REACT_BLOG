import { Link } from 'react-router-dom';
import BlogList from './BlogList'
import Login from './Login';
import useFetch from "./useFetch";
import UseRole from './UseRole';
import UseToken from './UseToken';
//import { useLocation } from 'react-router-dom';
const Home = () => {
    //const { name } = useLocation().state;
    
    //console.log(name)
    let blogs= null;
    const token = UseToken();
    const role= UseRole()
    //const role = Login();
    console.log(role);
    console.log(token.token);
    let url=null;
    const name=token.token;
    if(role.role==='admin')
    {
        url='http://localhost:3001/blogs';
    }
    else if(role.role==='user')
    {
        url='http://localhost:3001/' +name;
    }
    const { data, isLoading, error, isNull}= useFetch(url);
    blogs=data;
    //console.log(blogs.length);
    console.log(isNull);
   // if(data.length===0)
        //len=false;
    return ( 
        <div className="home">
            {isLoading && <div>Loading...</div>}
            {error && <div>{error}</div>}
           {data && <BlogList blogs={ blogs } title="All blogs!"/>  }
           {isNull && <div className='links'><Link to="/create">Please add some blogs</Link></div>}
        </div>
     );
}
 
export default Home;