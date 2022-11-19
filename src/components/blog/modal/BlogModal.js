import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";

import { closeEditMode } from "../../../reducers/blogReducer";

const BlogModal = () => {

    let isEditMode = useSelector((state) => state.blogs.isEditMode);
    const dispatch = useDispatch();

    const hideModal = () =>{
        dispatch(closeEditMode())
    }

    return (
        <Modal show={isEditMode} onHide={hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Blog</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>Blog Content</div>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={hideModal}>Cancel</Button>
              <Button variant="primary">Save</Button>
          </Modal.Footer>
        </Modal>
    );
}

export default BlogModal;

