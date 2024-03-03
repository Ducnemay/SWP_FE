import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import './DetailsPage.css';
import api from "../components/utils/requestAPI"; 
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Detailpage() {
  const [product, setProduct] = useState(null);
  const [cartBtn, setCartBtn] = useState("Purchase");
  const [userMap, setUserMap] = useState({}); 

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

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-5 py-3">
      <div className="row">
        <div className="col-md-6">
          <div className="d-flex justify-content-center mx-auto product">
            <img src={product.imageUrl} alt={product.title} height="400px" style={{ margin: '4em' }} />
          </div>
        </div>

        <div className="col-md-6">
          <div className="d-flex flex-column justify-content-between h-100">
            <div>
              <h1 className="display-5 fw-bold text-underline" style={{ fontSize: '4em', marginTop: '0.5em'}}>{product.title}</h1>
              <p className="lead" style={{ fontSize: '1.4em', marginTop: '0', marginRight: '10em' }}>{product.desc}</p>
              <p className="lead" style={{ fontSize: '1.5em', marginRight: '11em', position: 'relative' }}>{userMap[product.userId]?.username}
                <div className="line"></div>
              </p>
            </div>
            <div className="d-flex flex-column align-items-start">
              <h2 className="my-4" style={{ fontSize: '3em', marginTop: '0', marginRight: '5em' }}>${product.price}</h2>
              <button onClick={() => setCartBtn("Loading...")} className="btn btn-outline-primary" style={{ fontSize: '1.8rem', background: 'black', color: 'white', width: '450px' }}>{cartBtn}</button>
            </div>
            <i className="fa-regular fa-heart" style={{marginTop:'1em'}}> Save</i><>&nbsp;&nbsp;&nbsp;&nbsp;</>
            <i className="fa-regular fa-eye"> View</i><>&nbsp;&nbsp;&nbsp;&nbsp;</>
            <i className="fa-regular fa-share-from-square"> Share</i>
          </div>
        </div>
      </div>
    </div>
  );
}