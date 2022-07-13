import { Link } from "react-router-dom";

const BlogList= ({blogs, title, handleDelete}) => {
    //const blogs=props.blogs;
    //const title=props.title;
    return ( 
        <div className="blog-list">
            <h2>{title}</h2>
            <hr style={{backgroundColor: "#f1356d"}}></hr>
            {blogs.map((blog) => (
                <div className="blog-preview" key={blog._id}>
                    <Link to={`/blogs/${blog._id}`}>
                        <h2>{ blog.title }</h2>
                        <p>written by { blog.author }</p>
                    </Link>
                </div>
            ))}
            
        </div>
     );
}

export default BlogList;