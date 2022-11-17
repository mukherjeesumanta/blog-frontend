import { useSelector } from 'react-redux';

import ListItem from "../listitem/ListItem";

const BlogList = () => {
    const blogs = useSelector(state => state.blogs)
    const data = blogs.isSuccess ? blogs.data : [];
    //console.log('========', data)
    
    const listItems = data.map((blog) =>
        <ListItem
            title={blog.title}
            createdAt={blog.createdAt}
            category={blog.category}
            comments={blog.comments}
            shortDescription={blog.shortDescription}
            images={blog.images}
            blogId={blog._id}
            key={blog._id}
        />
    );
    return <div className="container bg-white pt-5">{listItems}</div>
}

export default BlogList;

