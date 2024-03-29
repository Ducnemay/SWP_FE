import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './DetailsPage.css'; // Import your custom styles
import api from "../components/utils/requestAPI";
import useAuth from '../hooks/useAuth';
import { FaRegCommentDots, FaReply } from "react-icons/fa";

export default function Detailpage() {
  const [product, setProduct] = useState(null);
  const [cartBtn, setCartBtn] = useState("Purchase");
  const [userMap, setUserMap] = useState({});
  const [showComment, setShowComment] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { artworkId } = useParams();


  $(function() {
    $('.detail-product-imagee').watermark();
  });
  useEffect(() => {
    const fetchProductById = async () => {
      const url = `https://localhost:7227/api/Artwork/get-by-id?id=${artworkId}`;

      try {
        const response = await api.get(url);
        const productData = response.data;
        setProduct(productData);
        fetchUsers([productData.userId]);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductById();
  }, [artworkId]);

  useEffect(() => {
    if (showComment) {
      fetchAllComments();
    }
  }, [showComment]);

  const fetchUsers = async (userIds) => {
    try {
      const promises = userIds.map(userId =>
        api.post("https://localhost:7227/api/User/get-by-id", { userId })
      );
      const responses = await Promise.all(promises);
      const userMap = {};
      responses.forEach((response, index) => {
        const userData = response.data;
        const userId = userIds[index];
        userMap[userId] = userData;
      });
      setUserMap(userMap);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handlePurchase = async () => {
    try {
      setCartBtn("Loading...");

      if (!auth || !auth.user) {
        navigate('/log-in');
        return;
      }

      if (auth.user.userId === product.userId) {
        // Người dùng đang cố gắng mua sản phẩm mà họ đã tạo
        alert('You cannot purchase your own artwork.');
        return;
      }

      const orderData = {
        userID: auth.user.userId,
        artwokID: artworkId,
        createDate: new Date().toISOString()
      };

      const response = await api.post("https://localhost:7227/api/Order/create-new-order", orderData);
      const orderId = response.data.orderId;

      setCartBtn("Purchased");
      alert('Order created successfully!');
      navigate(`/order/${orderId}`);
    } catch (error) {
      console.error('Error creating new order:', error);
      setCartBtn("Purchase");
    }
  };

  const toggleCommentSection = () => {
    setShowComment(!showComment);
  };

  const addComment = async (replyIndex) => {
    try {
      if (!commentInput.trim()) {
        return;
      }

      if (!auth || !auth.user) {
        navigate('/log-in');
        return;
      }

      const commentData = {
        content: commentInput,
        userId: auth.user.userId,
        artWorkId: artworkId
      };

      const response = await api.post("https://localhost:7227/api/Comment/create-new", commentData);

      const newComment = {
        text: commentInput,
        user: auth.user
      };

      let updatedComments = [...comments];

      if (replyIndex !== null && replyIndex !== undefined) {
        // If replying to a specific comment, insert the new comment below it
        updatedComments.splice(replyIndex + 1, 0, newComment);
      } else {
        // Otherwise, add the new comment at the end
        updatedComments.push(newComment);
      }

      setComments(updatedComments);
      setCommentInput('');
      setReplyingTo(null);
    } catch (error) {
      console.error('Error creating new comment:', error);
    }
  };

  const handleReply = (index) => {
    const commentToReply = comments[index];
    setReplyingTo({ ...commentToReply, index }); // Lưu index của comment đang reply
    setShowComment(true); // Mở phần comment
    window.scrollTo(0, document.body.scrollHeight); // Cuộn đến cuối trang
  };


  const fetchAllComments = async () => {
    try {
      const url = `https://localhost:7227/api/Comment/get-all-comment-By-Artwork-Id?id=${artworkId}`;
      const response = await api.get(url);
      const commentsData = response.data;

      if (commentsData && commentsData.$values && Array.isArray(commentsData.$values)) {
        const commentsArray = commentsData.$values;

        // Extract userIds from comments
        const userIds = commentsArray.map(comment => comment.userId);

        // Fetch user information for each userId
        const userPromises = userIds.map(userId =>
          api.post("https://localhost:7227/api/User/get-by-id", { userId })
        );

        // Wait for all user information requests to resolve
        const userResponses = await Promise.all(userPromises);

        // Map userIds to usernames and imageUrls
        const userMap = {};
        userResponses.forEach((response, index) => {
          const userData = response.data;
          const userId = userIds[index];
          userMap[userId] = {
            fullname: userData.fullname,
            imageUrl: userData.imageUrl
          };
        });

        // Update comments with usernames and imageUrls
        const commentsWithUserinfo = commentsArray.map(comment => ({
          ...comment,
          ...userMap[comment.userId]
        }));

        // Set comments state
        setComments(commentsWithUserinfo);
      } else {
        console.error('Comments data is not in the expected format:', commentsData);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-custom">
      <div className="row">
        <div className="row-detail">
        <div className="col-md-6">
          <div className="d-flex justify-content-center mx-auto product">
            <img src={product.imageUrl} alt={product.title} className="detail-product-imagee" height="400px" style={{ margin: '20px' }} />
          </div>
        </div>

        <div className="col-md-6" style={{paddingTop:"50px", paddingBottom:"30px", paddingLeft:"100px"}}>
          <div className="d-flex flex-column justify-content-between h-70">
            <div>
              <h1 className="display-5 fw-bold text-underline" style={{ fontSize: '40px', marginTop: '0.5em', textAlign:"left", marginLeft: "224px"}}>{product.title}</h1>
              <p className="lead" style={{ fontSize: '1.4em', marginTop: '0', marginRight: '10em' }}>{product.desc}</p>
              <Link to={`/artist/${product.userId}`} className="lead" style={{ fontSize: '1.5em', marginRight: '11em', position: 'relative' }}>{userMap[product.userId]?.username}
                <div className="line"></div>
                </Link>
            </div>
            <div className="d-flex flex-column align-items-start">
              <h2 className="my-4" style={{ fontSize: '4em', marginTop: '0', marginRight: '5em', color:"black" }}>$&nbsp;{product.price}</h2>
              <button onClick={handlePurchase} className="btn btn-outline-primary" style={{ fontSize: '1.8rem', background: 'black', color: 'white', width: '37.3rem' }}>{cartBtn}</button>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="d-flex align-items-center mt-3">
              <FaRegCommentDots onClick={toggleCommentSection} style={{ cursor: 'pointer' }} />
              <span className="ms-2">Comments</span>
            </div>
            {showComment && (
              <div className="mt-3">
                <div className="comment-input-container">
                  <input
                    type="text"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Write a comment..."
                    className="comment-input"
                  />
                  <button onClick={() => addComment(replyingTo ? replyingTo.index : null)} className="btn btn-primary send-button">Send</button>
                </div>
                {/* Hiển thị danh sách comment */}
                <h3 className="my-3">Comments</h3>
                <div className="comment-list">
                  {comments.map((comment, index) => (
                    <div key={index} className="comment">
                      {comment.imageUrl && (
                        <img src={comment.imageUrl} alt="User Avatar" className="user-avatar" />
                      )}
                      <p>{comment.fullname}</p>
                      <div className="text-comment">
                        <p className="comment-text">{comment.text}</p>
                      </div>
                      {/* Nút reply */}
                      <button onClick={() => handleReply(index)} className="btn btn-sm btn-outline-primary">
                        <FaReply />
                      </button>
                      {/* Conditional rendering of reply text box */}
                      {replyingTo && replyingTo.index === index && (
                        <div className="reply-text-box">
                          <input
                            type="text"
                            style={{backgroundColor:"white", color:"black"}}
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                            placeholder="Write a reply..."
                            className="reply-text"
                          />
                          <button onClick={() => addComment(index)} className="btn btn-sm btn-primary">Send</button>
                        </div>
                      )}
                    </div>

                  ))}
                </div>
              </div>
            )}
    </div>
  );
}