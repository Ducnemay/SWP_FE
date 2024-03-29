import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Artreport.css';
import api from "../components/utils/requestAPI";
import 'bootstrap/dist/css/bootstrap.min.css';
import useAuth from '../hooks/useAuth';

export default function Artreport() {
  const [product, setProduct] = useState(null);
  const [des, setdes] = useState(null);
  const [cartBtn, setCartBtn] = useState("Confirmation Reports");
  const [userMap, setUserMap] = useState({});
  const { auth } = useAuth(); // Lấy thông tin người dùng từ hook useAuth
  const navigate = useNavigate(); // Sử dụng useNavigate để chuyển hướng

  // Sử dụng useParams để lấy artworkId từ URL
  const { artworkId } = useParams();

  useEffect(() => {
    const fetchProductById = async () => {
      // Sử dụng artworkId để tạo URL cho API request
      const url = `https://localhost:7227/api/Artwork/get-by-id?id=${artworkId}`;

      try {
        const response = await api.get(url);
        const productData = response.data;
        setProduct(productData);

        // Lấy thông tin về người dùng sau khi nhận dữ liệu của tác phẩm nghệ thuật
        fetchUsers([productData.userId]);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductById();
  }, [artworkId]); // Đảm bảo useEffect được gọi lại khi artworkId thay đổi

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

  const handleReport = async () => {
    try {
      setCartBtn("Loading...");

      // Kiểm tra xem người dùng đã đăng nhập chưa
      if (!auth || !auth.user) {
        // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
        // Ví dụ: Chuyển hướng đến /login
        navigate('/login');
        return;
      }

      // Tạo dữ liệu order
      const orderData = {
        userID: auth.user.userId,
        description : des,
        artworkID: artworkId,
        date: new Date().toISOString()
      };

      // Gửi yêu cầu để thêm order
      await api.post(`https://localhost:7227/api/Report/create-new-report?UserId=${auth.user.userId}`, orderData);

      // Cập nhật trạng thái nút Purchase sau khi thành công
      setCartBtn("Confirmation Report");

      // Hiển thị thông báo thành công
      alert('Report created successfully!');

      // Chuyển hướng sang trang order-detail
      navigate('/home');
    } catch (error) {
      console.error('Error creating new report:', error);
      setCartBtn("Confirmation Report"); // Đặt lại nút Purchase nếu có lỗi xảy ra
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    // <div className="container my-5 py-3">
      <div className="row-report">
        <div className="col-md-6">
          <div className="d-flex justify-content-center mx-auto product">
            <img src={product.imageUrl} alt={product.title} height="400px" style={{ margin: '4em' }} />
          </div>
        </div>

        <div className="col-md-6">
          <div className="d-flex flex-column justify-content-between h-100">
            <div className="title-report">
              <h1 className="display-5 fw-bold text-underline" style={{ fontSize: '40px', marginTop: '0.5em', marginLeft: "60px"}}>{product.title}</h1>
              <p className="lead" style={{ fontSize: '1.4em', marginTop: '0', marginRight: '10em' }}>{product.desc}</p>
              <p className="lead" href="" style={{ fontSize: '1.5em', marginRight: '-2.5em', position: 'relative' }}>{userMap[product.userId]?.username}
                <div className="line"
                style={{width:"738px"}}></div>
              </p>
           
            <div className="d-flex flex-column align-items-start">
              <h2 className="my-4" style={{ fontSize: '3em', marginTop: '0', marginRight: '5em' }}>${product.price}</h2>
              </div>
              
              <div className="cofirm-form-report">
              <select
                  value={des}
                  onChange={(e) => setdes(e.target.value)}
                  style={{
                    marginBottom:"50px",
                    height:"40px",
                    fontSize:"20px",
                    width:"350px",
                    marginLeft:"85px"
                  }}
                >
                  <option style={{marginTop:'1em'}}>Choose reason of report<>&nbsp;&nbsp;&nbsp;&nbsp;</></option> 
                  <option>Violation of copyright regulations<>&nbsp;&nbsp;&nbsp;&nbsp;</></option> 
                  <option>Offensive or inappropriate<>&nbsp;&nbsp;&nbsp;&nbsp;</></option>
                  <option>Violating ethical or moral standards<>&nbsp;&nbsp;&nbsp;&nbsp;</></option>
                </select>
              </div>
              <button onClick={handleReport} className="btn btn-outline-primary" 
                style={{ 
                  fontSize: '1.4rem', 
                  background: 'black', 
                  color: 'white', 
                  width: '350px',
                  marginLeft:"90px",
                  marginLeft: "390px",
                  marginTop:"-166px"
                  }}>{cartBtn}</button>

            </div>
          </div>
        </div>
      </div>
    // </div>
  );
}