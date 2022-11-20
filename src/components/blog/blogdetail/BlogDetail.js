import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { BlogThunk } from "../../../reducers/blogReducer";

import cover from "../../../img/detail.jpg";
import blogImg from "../../../img/blog-1.jpg";
import './BlogDetail.css';


const BlogDetail = () => {
    let { blogId } = useParams();
    //console.log(blogId)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(BlogThunk({
            endpoint: blogId,
            method: 'GET'
        }))
    }, [blogId])

    const blogDetail = useSelector(state => state.blogs.blogDetail);
    const data = blogDetail.isSuccess ? blogDetail.data : {};
    
    return (
            <div className="container py-5 px-2 bg-white">
            <div className="row px-4">
                <div className="col-12">
                    <img className="img-fluid mb-4" src={cover} alt="Image" />
                    <h2 className="mb-3 font-weight-bold">{data.title}</h2>
                    <div className="d-flex">
                        <p className="mr-3 text-muted"><i className="fa fa-calendar-alt"></i> {new Date(data.createdAt).toLocaleDateString("en-US")}</p>
                        <p className="mr-3 text-muted"><i className="fa fa-folder"></i> {data.category}</p>
                    </div>
                    <p>{data.description}</p>
                    
                </div>               
            </div>
        </div>
        
    );
}

export default BlogDetail;

