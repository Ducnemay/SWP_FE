/* eslint-disable react/prop-types */
// src/components/ProductPage.js

import './ProductPageDetail.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AiFillBell } from "react-icons/ai";
import api from '../../../../components/utils/requestAPI';
import LayoutMorder from "../../../../components/layout/LayoutMorder";
import useAuth from '../../../../hooks/useAuth';



// eslint-disable-next-line no-unused-vars, react/prop-types
export default function ProductPage (){
  const {productId} = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rejectReason, setRejectReason] = useState('');
  const [approveImgurl, setApproveImgurl] = useState('');
  const [approved, setApproved] = useState(false);
  const [notificationContent, setNotificationContent] = useState('');
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const navigate = useNavigate();
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const { auth } = useAuth();
  const [user, setUser] = useState(null);
  const CANVA_URL = 'https://www.canva.com/design/DAF4nuGQopE/gXZjUMsbqAWaoGKkg_S8Dw/edit';
  // const history = useHistory();

  useEffect(() => {
    async function fetchDataProduct() {
      const url = `https://localhost:7227/api/Artwork/get-by-id?id=${productId}`;
      try {
        const response = await api.get(url);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDataProduct();
  }, [productId]);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  const handleApprove = async () => {
    try {
      const updateProcessingUrl = `https://localhost:7227/api/Artwork/update-artwork-proccessing?artworkId=${productId}`;
      const updateImageData = {
        reason: rejectReason        
      };
      const processingResponse = await api.post(updateProcessingUrl, updateImageData);
      console.log(processingResponse.data);
      console.log("Product Approved");
  
      const updateImageUrl = `https://localhost:7227/api/Artwork/update-artwork-image?artworkId=${productId}`;
      const imageData = {
        imageUrl: approveImgurl        
      };
      const imageResponse = await api.post(updateImageUrl, imageData);
      console.log(imageResponse.data);
      console.log("Image Uploaded");
  
      setApproved(true);
      navigate("/content");
  
      localStorage.setItem(`notification_${auth.user.userId}`, "Tranh của bạn đã được duyệt");
    } catch (error) {
      console.error("Error approving product:", error);
    }
  };
  const handleUnApprove = async () => {
    try {
      // if (auth.user) {
      const url = `https://localhost:7227/api/Artwork/delete-artwork?id=${productId}`;
      const data = {
          reason: rejectReason        
      };
      const response = await api.delete(url,data);
      console.log(response.data);
      console.log("Product are delete");
      navigate("/content");
     
      localStorage.setItem(`notification_${auth.user.userId}`, `Tranh của bạn không được duyệt với lý do: ${rejectReason}`);
    // Hiển thị thông báo
      // }
    } catch (error) {
      console.error("Error approving product:", error);
    }
  }
  const toggleNotification = () => {
    // Đóng hoặc mở thông báo khi nhấn vào icon
    setIsNotificationVisible(!isNotificationVisible);
  };

  const handleEditImage = () => {
    window.open(CANVA_URL, '_blank');
  };
  return ( 
    <LayoutMorder>
    <div className="productdetail-page">
      <div className="body1">
     
          <img src={product.imageUrl} alt="Product" />
          <img src={product.imageUrl2} alt="Product" />
        <div className="info-container">
        {/* <div className='Box-notification'>
        <div className="notification-icon" >
        <AiFillBell onClick={toggleNotification}/>
        </div>
        {!isNotificationVisible && (
        <div className="notification-popup">
          Nội dung thông báo
          <p>{notification}</p>
          
        </div>
      )}
        </div> */}
        {/* <button class="back-button"></button> */}
          <div className="details">
            <div className="author">{product.description}</div>
            <div className="title">{product.title}</div>
            <div className="image-info">
              <div className='price'>{product.price}$</div>
            </div>
          </div>
          <div className="actions">
          {showUploadForm && (
            
  <div className="upload-form">
    <button onClick={handleEditImage}className="edit-image-button">Edit Image</button> 
    {/* < className='upload-form'> */}
    <input placeholder="Input link of image after edited " className='button-upload'
    value={approveImgurl}
            onChange={(f) => setApproveImgurl(f.target.value)}>  
    </input>
    <button onClick={() => {setShowUploadForm(false);setShowButtons(true);}} className='Back-to-approve'>Back</button>
    <button onClick={handleApprove}className="show-approve-button">CONFIRM</button> 
  </div>
)}
          {showRejectReason && (
            <div className='showReason'>
            <textarea placeholder="Lý do " className="reject-reason"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            >
            </textarea>
            <button onClick={() =>{ setShowRejectReason(false);
            setShowButtons(true); } } className="Back-to-approve">BACK</button>
            <button onClick={handleUnApprove}className="show-reject-button">CONFIRM</button> 
            </div>
            )}
            {showButtons && ( 
              <div className='actions'>
            <button onClick={() =>{ setShowRejectReason(true);
            setShowButtons(false); }               
            }className="reject-button">UNAPPROVE</button>
            <div className="posting-time">Thời gian đăng: {product.time}</div>
            <button onClick={() =>{ setShowButtons(false);
            setShowUploadForm(true); } }className="approve-button">APPROVE</button>
            </div>
            )}
          </div>
        </div>
      </div>
      </div>
      </LayoutMorder>
  );
}

