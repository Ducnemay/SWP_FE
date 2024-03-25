import React, { useEffect, useState } from "react";
import "./BlogPage.css";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import api from "../components/utils/requestAPI";
import { Link, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const BlogPage = () => {
  const { auth } = useAuth();
  const { action } = useParams();

  const [blogItem, setBlogItem] = useState(null);
  const [remove, setRemove] = useState(null);

  const fetchData = async () => {
    const url = "/api/Blog/get-for-customer";
    try {
      const response = await api.get(url);
      console.log(response.data);
      setBlogItem(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const removeBlog = async (blogId) => {
    setRemove(blogId);
    const urlRemove = "/api/Blog/remove-blog";
    const data = {
      blogID: remove,
    };
    try {
      const response = await api.delete(urlRemove, {
        headers: {
          "Content-Type": "application/json-patch+json",
        },
        data: JSON.stringify(data),
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = () => {
    window.location.href = "/home";
  };

  if (auth?.user?.roleId === "3") {
    if (action === "view") {
      return (
        <div className="blog-page">
          <div className="blog-list">
            {blogItem?.map((blog) => (
              <Link
                to={`/view-blog/${blog.blogId}`}
                key={blog.blogId}
                className="blog-item"
              >
                <div className="blog-item-detail">
                  <div className="blog-item-image">
                    {blog.image.map((image) => (
                      <img src={image?.imageUrl} alt="blog-image" />
                    ))}
                  </div>
                  <div className="blog-item-information">
                    <h3 className="blog-title">{blog.blogTitle}</h3>
                    <p className="blog-meta">
                      <span className="blog-date">{blog.createAt}</span> .{" "}
                      <span className="blog-author">
                        bởi {blog.user.fullName}
                      </span>
                    </p>
                    <p className="blog-description">{blog.blogSummary}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="blog-page">
          <div className="blog-list">
            {blogItem?.map((blog) => (
              <div className="blog-item">
                <div className="role-page-edit-button">
                  <button onClick={handleButtonClick} className="update-button">
                    <FaRegEdit />
                  </button>
                  <button
                    onClick={() => removeBlog(blog.blogId)}
                    className="remove-button"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
                <div className="blog-item-detail">
                  <div className="blog-item-image">
                    {blog.image.map((image) => (
                      <img src={image?.imageUrl} alt="blog-image" />
                    ))}
                  </div>
                  <div className="blog-item-information">
                    <h3 className="blog-title">{blog.blogTitle}</h3>
                    <p className="blog-meta">
                      <span className="blog-date">{blog.createAt}</span> .{" "}
                      <span className="blog-author">
                        bởi {blog.user.fullName}
                      </span>
                    </p>
                    <p className="blog-description">{blog.blogSummary}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }

  return (
    <div className="blog-page">
      <div className="blog-list">
        {blogItem?.map((blog) => (
          <Link
            to={`/blog-content/${blog.blogId}`}
            key={blog.blogId}
            className="blog-item"
          >
            <div className="blog-item-detail">
              <div className="blog-item-image">
                {blog.image.map((image) => (
                  <img src={image?.imageUrl} alt="blog-image" />
                ))}
              </div>
              <div className="blog-item-information">
                <h3 className="blog-title">{blog.blogTitle}</h3>
                <p className="blog-meta">
                  <span className="blog-date">{blog.createAt}</span> .{" "}
                  <span className="blog-author">bởi {blog.user.fullName}</span>
                </p>
                <p className="blog-description">{blog.blogSummary}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>

    // quản lí blog của staff (thêm 2 nút xóa và sửa)
    // <div className="blog-page">
    //   <div className="blog-list">
    //     {blogs.map((blog) => (
    //       <div className="blog-item">
    //         <div className="role-page-edit-button">
    //           <button onClick={handleButtonClick} className="update-button"><FaRegEdit /></button>
    //           <button onClick={() => removeBlog(blog.id)} className="remove-button"><FaTrashAlt /></button>
    //         </div>
    //         <div className="blog-item-detail">
    //           <div className="blog-item-image">
    //             <img src={blog.image} alt="blog-image" />
    //           </div>
    //           <div className="blog-item-information">
    //             <h3 className="blog-title">{blog.title}</h3>
    //             <p className="blog-meta">
    //               <span className="blog-date">{blog.date}</span> . <span className="blog-author">bởi {blog.author}</span>
    //             </p>
    //             <p className="blog-description">{blog.content}</p>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default BlogPage;
