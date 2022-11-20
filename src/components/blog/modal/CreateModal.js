import { useSelector } from "react-redux";

import BlogModal from "./BlogModal";

const CreateModal = () => {
    const isCreateMode = useSelector((state) => state.blogs.isCreateMode);

    const newBlog = useSelector(state => state.blogs.newBlog);
    const data = newBlog.data || {};

    return (
        <BlogModal
            isVisible={isCreateMode}
            title={'Create New Blog'}
            blogTitle={ data?.title || '' }
            changeType={'create'}
            description={ data?.description || '' }
        />
    );
}

export default CreateModal;

