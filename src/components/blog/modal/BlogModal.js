import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import SunEditor, { buttonList } from 'suneditor-react';

import { BlogThunk, closeEditMode, updateBlogTitle, updateBlogContent, updateBlogList } from "../../../reducers/blogReducer";
import { parseHtmlEntities } from "../../../utils/util";

import 'suneditor/dist/css/suneditor.min.css';
import './BlogModal.css'


const BlogModal = (props) => {
    //console.log(props)
    const blogId = props.blog.blogId
    const isEditMode = useSelector((state) => state.blogs.isEditMode);
    const dispatch = useDispatch();

    const hideModal = () => {
        dispatch(closeEditMode())
    }

    const editor = useRef();

    // The sunEditor parameter will be set to the core suneditor instance when this function is called
    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor;
    };


    useEffect(() => {
        dispatch(BlogThunk({
            endpoint: blogId,
            method: 'GET'
        }))
    }, [blogId, props.blog.title, props.blog.description])

    const blogDetail = useSelector(state => state.blogs.blogDetail);
    const data = blogDetail.isSuccess ? blogDetail.data : {};

    const onTitleChange = (e) => {
        dispatch(updateBlogTitle(e.target.value))
    }
    const onContentChange = (content) => {
        dispatch(updateBlogContent({content, blogId}))
    }

    const updateBlogList = (blogId) => {
        dispatch(updateBlogList(blogId))
    }

    const onClickSave = () => {
        //console.log('=========', data)
        dispatch(BlogThunk({
            endpoint: blogId,
            method: 'PATCH',
            body: data
        }))
        hideModal()
        //updateBlogList(blogId)
    }

    return (
        <Modal show={isEditMode} onHide={hideModal} dialogClassName="blog-edit-modal">
            <Modal.Header closeButton>
                <Modal.Title>Edit Blog</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Control type="text" placeholder="Enter blog title" defaultValue={data.title} onChange={onTitleChange} />
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
                    setContents={parseHtmlEntities(data.description)}
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

