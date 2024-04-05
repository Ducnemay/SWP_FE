import React, { useState, useEffect } from 'react';
import './CreatorConfirm.css'; // Import CSS file
import api from "../components/utils/requestAPI";
import useAuth from "../hooks/useAuth";
import { useParams, useNavigate } from 'react-router-dom';

const ConfirmationPage = () => {
  const { auth } = useAuth();
  const [order, setOrder] = useState(null);
    const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  // const { artworkId } = useParams();
  const [show, setShow] = useState(false);
  const[artworkCustomeId,setArtworkCustomId]=useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get("https://localhost:7227/api/ArtCustome/get-all");
      const data = response.data.$values; // Assuming you only need one order
      setOrder(data);
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };
  useEffect(() => {
    const fetchProductById = async () => {
      
      try {
        if(auth.user){

        
        const url = `https://localhost:7227/api/ArtCustome/get-custome-artwork-by-Userid?userid=${auth.user.userId}`;
      
        const response = await api.get(url);
        const productData = response.data;
        setProduct(productData);
        // fetchUsers([productData.userId]);
        if (auth.user.userId === productData.userId) {
          setShow(true);
        } else {
          setShow(false);
        }
      }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductById();
  }, [auth.user]);

  const handleConfirm = async (artworkCustomeId, userId) => {
    try {
      if (!auth || !auth.user) {
        navigate('/log-in');
        return;
      }
  
      if (auth.user.userId === userId) {
        // Người dùng đang cố gắng mua sản phẩm mà họ đã tạo
        alert('You cannot purchase your own artwork.');
        return;
      }
  
      const orderData = {
        userID: auth.user.userId,
        artworkCustomeID: artworkCustomeId,
      };
  
      const response = await api.post("https://localhost:7227/api/OrderRequire/Create-New-Order-Require", orderData);
      
  
      alert('Order to do art successfully!');
      navigate(`/manager-require`);
    } catch (error) {
      console.error('Error creating new order:', error);
    }
  };
  const handleView = async () => {
    try {
      if (!auth || !auth.user) {
        navigate('/log-in');
        return;
      }
  
  
      const response = await api. get('https://localhost:7227/api/OrderRequire/get-all');
      const orderId = response.data.$values;
      const userOrders = orderId.filter(order => order.artworkCustomeId === artworkCustomeId);
      setArtworkCustomId(userOrders)
      navigate(`/customer-confirm/${artworkCustomeId}`);
    } catch (error) {
      console.error('Error creating new order:', error);
    }
  };

  return (
    <div className="creator-confirm-container">
      <h2>ORDER REQUIRE</h2>
      <div>
        <table>
          <thead>
            <tr>
              <th>CustomeArtID</th>
              <th>Description</th>
              <th>Deadline Day</th>
              <th>Image</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          {order && (
            <tbody>
              {order.map((product) => (
                <tr key={product.artworkCustomeId}>
                  <td>{product.artworkCustomeId}</td>
                  <td>{product.description}</td>
                  <td>{product.deadlineDate}</td>
                  <td><img src={product.image} alt="" /></td>
                  <td>{product.price}</td>
                  {!show &&(
                  <td><button onClick={() => handleConfirm(product.artworkCustomeId, product.userId)}>Confirm Order</button></td>)}
                  
                  
                  <td>{!product.status &&(<button onClick={() => handleView(product.artworkCustomeId)}>View</button>)}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default ConfirmationPage;
