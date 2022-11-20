import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import SunEditor, { buttonList } from 'suneditor-react';

import { BlogThunk, closeEditMode, updateBlogTitle, updateBlogContent, updateBlogList } from "../../../reducers/blogReducer";
import { parseHtmlEntities } from "../../../utils/util";

import 'suneditor/dist/css/suneditor.min.css';
import './BlogModal.css'


const BlogModal = (props) => {
    const dispatch = useDispatch();

    const hideModal = () => {
        if(props.changeType === 'edit') {
            dispatch(closeEditMode())
        }
    }

    const editor = useRef();

    // The sunEditor parameter will be set to the core suneditor instance when this function is called
    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor;
    };

    const blogDetail = useSelector(state => state.blogs.blogDetail);
    const data = blogDetail.isSuccess ? blogDetail.data : {};

    const onTitleChange = (e) => {
        if(props.changeType === 'edit') {
            dispatch(updateBlogTitle(e.target.value))
        }
    }
    const onContentChange = (content) => {
        if(props.changeType === 'edit') {
            dispatch(updateBlogContent(content))
        }
    }

    const onClickSave = () => {
        //console.log('=========', data)
        if(props.changeType === 'edit') {
            dispatch(BlogThunk({
                endpoint: data._id,
                method: 'PATCH',
                body: data
            }))
            hideModal()
        }
        
        //updateBlogList(props.blogId)
    }

    return (
        <Modal show={props.isVisible} onHide={props.onHide} dialogClassName="blog-edit-modal">
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Control type="text" placeholder="Enter blog title" defaultValue={props.blogTitle} onChange={onTitleChange} />
                </Form.Group>
                <SunEditor
                    getSunEditorInstance={getSunEditorInstance}
                    setOptions={{
                        height: 200,
                        buttonList: buttonList.formatting,
                        charCounter: true,
                        charCounterType: 'char'
                    }}
                    name="blogEditor"
                    height="200"
                    width="100%"
                    placeholder="Start writing here..."
                    setContents={parseHtmlEntities(props.description)}
                    onChange={onContentChange}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={hideModal}>Cancel</Button>
                <Button variant="primary" onClick={onClickSave}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default BlogModal;

