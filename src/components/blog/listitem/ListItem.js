import { Link } from "react-router-dom";

import "./ListItem.css";

const ListItem = (props) => {
    const blogId = props.blogId;
    const redirectTo = 'blog/' + blogId;

    return (
        <div className="row blog-item px-3 pb-5">
            <div className="col-md-5">
                <img
                    className="img-fluid mb-4 mb-md-0"
                    src={require("../../../img/" + props.images[0])}
                    alt="Image"
                />
            </div>
            <div className="col-md-7">
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
                <p>{props.shortDescription}</p>
                <a className="btn btn-link p-0" href={props.blogId}>
                    Read More <i className="fa fa-angle-right"></i>
                </a>
            </div>
        </div>
    );
};

export default ListItem;
