import React, { useState } from "react";
import RelatedPost from "../components/related-post/RelatedPost";
import "./BlogContentPage.css";
import { useParams } from "react-router-dom";
import api from "../components/utils/requestAPI";
import { useEffect } from "react";

const BlogContentPage = () => {

    const { blogId } = useParams();

    const [blog, setBlog] = useState(null);

    const fetchData = async () => {
        const url = '/api/Blog/get-blog-by-id';
        const data = {
            blogID: blogId
        }
        try {
            const response = await api.post(url, data);
            console.log(response.data);
            setBlog(response.data);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const formatContent = (content) => {
        const paragraphs = content?.split("\n\n");
        return paragraphs?.map((paragraph, index) => (
            <p key={index} className="blog-content-section-content">
                {paragraph.split("\n").map((line, lineIndex) => (
                    <React.Fragment key={lineIndex}>
                        {line}
                        <br />
                    </React.Fragment>
                ))}
            </p>
        ));
    };


    return (
        <div className="blog-content-page">
            <div key={blog?.blogId} className="blog-content-item">
                <div className="blog-content-item-information">
                    <h2 className="blog-content-title">{blog?.blogTitle}</h2>
                    <p className="blog-content-meta">
                        <span className="blog-content-date">{blog?.createAt}</span> . <span className="blog-content-author">bởi {blog?.user.fullName}</span>
                    </p>
                </div>
                <div className="blog-content-section">
                    <img className="blog-content-section-image" src={blog?.image[0].imageUrl} alt="blog-content-image" />
                    <h3 className="blog-content-section-heading">{blog?.blogTitle}</h3>
                    {formatContent(blog?.blogContent)}
                </div>
            </div>
            <RelatedPost />
        </div>
    );
};

export default BlogContentPage;
