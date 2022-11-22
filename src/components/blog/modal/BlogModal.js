import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import SunEditor, { buttonList } from 'suneditor-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

import { BlogThunk, closeEditMode, closeCreateMode, updateBlogTitle, updateBlogContent, updateNewBlogTitle, updateNewBlogContent } from "../../../reducers/blogReducer";
import { parseHtmlEntities } from "../../../utils/util";

import 'suneditor/dist/css/suneditor.min.css';
import './BlogModal.css'


const BlogModal = (props) => {
    const navigate = useNavigate();
    let blogPath = '';
    const dispatch = useDispatch();

    const hideModal = () => {
        if(props.changeType === 'edit') {
            dispatch(closeEditMode())
        } else if(props.changeType === 'create') {
            dispatch(closeCreateMode())
        }
    }

    const editor = useRef();

    // The sunEditor parameter will be set to the core suneditor instance when this function is called
    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor;
    };

    if(props.changeType === 'edit') {
        blogPath = 'blogDetail'
    } else if(props.changeType === 'create') {
        blogPath = 'newBlog'
    }
    const blogData = useSelector(state => state.blogs[blogPath]);
    const data = (props.changeType === 'edit') ? (blogData.isSuccess) ? blogData.data : {} : blogData.data;

    const onTitleChange = (e) => {
        const title = e.target.value;
        if(props.changeType === 'edit') {
            dispatch(updateBlogTitle(title))
        } else if(props.changeType === 'create') {
            dispatch(updateNewBlogTitle(title))
        }
    }
    const onContentChange = (content) => {
        if(props.changeType === 'edit') {
            dispatch(updateBlogContent(content))
        } else if(props.changeType === 'create') {
            dispatch(updateNewBlogContent(content))
        }
    }

    const onClickSave = async () => {
        let result;
        if(props.changeType === 'edit') {
            result = await dispatch(BlogThunk({
                endpoint: data._id,
                method: 'PATCH',
                body: data
            }))
        } else if(props.changeType === 'create') {
            result = await dispatch(BlogThunk({
                endpoint: '',
                method: 'POST',
                body: data
            }))
        }

        if(!!result.error){
            toast.error(result.error.message || 'Something went wrong!!')
        } else {
            hideModal()
            navigate('/')
        }
    }

    return (
        <Modal show={props.isVisible} onHide={hideModal} dialogClassName="blog-edit-modal">
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

