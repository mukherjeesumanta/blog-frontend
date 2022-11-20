import { useSelector } from "react-redux";

import BlogModal from "./BlogModal";

const CreateModal = () => {
    const isCreateMode = useSelector((state) => state.blogs.isCreateMode);

    const blogDetail = useSelector(state => state.blogs.blogDetail);
    const data = blogDetail.isSuccess ? blogDetail.data : {};

    return (
        <BlogModal
            isVisible={isCreateMode}
            title={'Edit Blog'}
            blogTitle={data.title}
            changeType={'edit'}
            description={data.description}
        />
    );
}

export default CreateModal;

