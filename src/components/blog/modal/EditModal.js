import { useSelector } from "react-redux";

import BlogModal from "./BlogModal";

const EditModal = () => {
    const isEditMode = useSelector((state) => state.blogs.isEditMode);

    const blogDetail = useSelector(state => state.blogs.blogDetail);
    const data = blogDetail.isSuccess ? blogDetail.data : {};

    return (
        <BlogModal
            isVisible={isEditMode}
            title={'Edit Blog'}
            blogTitle={data.title}
            changeType={'edit'}
            description={data.description}
        />
    );
}

export default EditModal;

