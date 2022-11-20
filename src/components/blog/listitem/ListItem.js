import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from 'react-hot-toast';

import { BlogThunk } from "../../../reducers/blogReducer";
import { stripHtml } from "../../../utils/util";

import "./ListItem.css";


const ListItem = (props) => {
    const blogId = props.blogId;
    const redirectTo = 'blog/' + blogId;

    const dispatch = useDispatch();

    const onClickDelete = async (e) => {
        e.preventDefault();

        const result = await dispatch(BlogThunk({
            endpoint: blogId,
            method: 'DELETE'
        }))

        if(!!result.error){
            toast.error(result.error.message || 'Something went wrong!!')
        }
    }

    const isLoggedIn = useSelector((state) => state.userInfo.loggedIn);
    return (
        <div className="row blog-item px-3 pb-5">
            <div className="col-md-5">
                <img
                    className="img-fluid mb-4 mb-md-0"
                    src={ require("../../../img/" + props.images[0]) }
                    alt="Image"
                />
            </div>
            <div className="col-md-7">
                {isLoggedIn && <a href="#" className="delete-icon" onClick={onClickDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg>
                </a>}

                <Link className="link-dark" to={redirectTo}>
                    <h3 className="mt-md-4 px-md-3 mb-2 py-2 bg-white font-weight-bold">
                        {props.title}
                    </h3>
                </Link>
                <div className="d-flex mb-3">
                    <small className="mr-2 text-muted">
                        <i className="fa fa-calendar-alt"></i>{" "}
                        {new Date(props.createdAt).toLocaleDateString("en-US")}
                    </small>
                    <small className="mr-2 text-muted">
                        <i className="fa fa-folder"></i> {props.category}
                    </small>
                    <small className="mr-2 text-muted">
                        <i className="fa fa-comments"></i> {props.comments} Comments
                    </small>
                </div>
                <p>{stripHtml(props.shortDescription)}</p>
                <Link className="link-dark" to={redirectTo}>
                    Read More <i className="fa fa-angle-right"></i>
                </Link>
            </div>
        </div>
    );
};

export default ListItem;
