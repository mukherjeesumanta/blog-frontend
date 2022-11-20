import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { BlogThunk, openEditMode } from "../../../reducers/blogReducer";
import { parseHtmlEntities, stripScript } from "../../../utils/util";
import EditModal from "../modal/EditModal";

import cover from "../../../img/detail.jpg";
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

    const isLoggedIn = useSelector((state) => state.userInfo.loggedIn);
    const blogDetail = useSelector(state => state.blogs.blogDetail);
    const data = blogDetail.isSuccess ? blogDetail.data : {};

    const onClickEdit = () => {
        dispatch(openEditMode())
    }

    return (
        <>
            <div className="container py-5 px-2 bg-white blog-details">
                <div className="row px-4">
                    <div className="col-12">
                        <img className="img-fluid mb-4 cover-img" src={cover} alt="Image" />
                        <h2 className="mb-3 font-weight-bold">{data.title}</h2>
                        <div className="d-flex">
                            <p className="mr-3 text-muted"><i className="fa fa-calendar-alt"></i> {new Date(data.createdAt).toLocaleDateString("en-US")}</p>
                            <p className="mr-3 text-muted"><i className="fa fa-folder"></i> {data.category}</p>
                            {isLoggedIn && <a href="#" className="edit-icon" onClick={onClickEdit}>
                                Edit&nbsp;
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                </svg>
                            </a>}
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: parseHtmlEntities(stripScript(data.description)) }}></div>
                    </div>
                </div>
            </div>
            <EditModal blog={{ ...data }} />
        </>
    );
}

export default BlogDetail;

