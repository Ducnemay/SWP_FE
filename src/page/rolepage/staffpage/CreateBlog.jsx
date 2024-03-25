import React, { useState } from 'react';
import './CreateBlog.css'

const BlogForm = () => {
    const [blogTitle, setBlogTitle] = useState('');
    const [blogSummary, setBlogSummary] = useState('');
    const [blogContent, setBlogContent] = useState('');
    const [blogType, setBlogType] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [imageUrls, setImageUrls] = useState([]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        const uploadedImages = files.map((file) => {
            const imageUrl = URL.createObjectURL(file);
            return imageUrl;
        });

        setImageUrls((prevImageUrls) => [...prevImageUrls, ...uploadedImages]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setBlogTitle('');
        setBlogSummary('');
        setBlogContent('');
        setBlogType('');
        setCreatedAt('');
        setImageUrls([]);
    };

    return (
        <div className='create-blog-page'>
            <div className='create-blog-container'>
                <h2 className='create-blog-container-title'>Tạo bài viết</h2>
                <div className='create-blog-section'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div className='create-blog-input-container'>
                                <label htmlFor="blogTitle">Tiêu đề</label>
                                <input
                                    className='create-blog-input'
                                    type="text"
                                    id="blogTitle"
                                    value={blogTitle}
                                    onChange={(e) => setBlogTitle(e.target.value)}
                                />
                            </div>
                            <div className='create-blog-input-container'>
                                <label htmlFor="blogSummary">Tóm tắt</label>
                                <textarea
                                    className='create-blog-input create-blog-textarea'
                                    id="blogSummary"
                                    value={blogSummary}
                                    onChange={(e) => setBlogSummary(e.target.value)}
                                ></textarea>
                            </div>
                            <div className='create-blog-input-container'>
                                <label htmlFor="blogContent">Nội dung</label>
                                <textarea
                                    className='create-blog-input create-blog-textarea'
                                    id="blogContent"
                                    value={blogContent}
                                    onChange={(e) => setBlogContent(e.target.value)}
                                ></textarea>
                            </div>
                            
                            <div className='create-blog-input-container'>
                                <label htmlFor="createdAt">Ngày tạo</label>
                                <input
                                    className='create-blog-input'
                                    type="date"
                                    id="createdAt"
                                    value={createdAt}
                                    onChange={(e) => setCreatedAt(e.target.value)}
                                />
                            </div>
                            <div className='create-blog-input-container'>
                                <label htmlFor="imageUpload" className='mutiple-img-upload'>Thêm hình ảnh</label>
                                <input
                                    // className='create-blog-input'
                                    type="file"
                                    id="imageUpload"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                    style={{display: 'none'}}
                                />
                            </div>
                            <div className='blog-add-image'>
                                {imageUrls.map((imageUrl, index) => (
                                    <img key={index} src={imageUrl} alt={`Image ${index}`} />
                                ))}
                            </div>
                            <button type="submit" className='create-blog-post'>Đăng bài</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BlogForm;
