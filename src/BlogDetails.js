import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
    const { id } = useParams();
    //console.log(id);
    const {data, isLoading, error } = useFetch('http://localhost:3001/blogs/' +id);
    const history= useHistory();

    const handleDelete = () => {
        fetch('http://localhost:3001/blogs/'+id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/')
        })
    }


    return ( 
        <div className="blog-details">
            {isLoading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {data && (
                <article>
                    <h2>{data.title}</h2>
                    <p>Written by { data.author }</p>
                    <div>{ data.body }</div>
                </article>
            )}
            <button onClick={handleDelete}>delete</button>
        </div>
     );
}
 
export default BlogDetails;