import React from "react";
import "./ConfirmPage.css";

const ConfirmPage = () => {
  const products = [
    {
      id: 1,
      name: "Chim Bồ Câu",
      price: "$19.99",
      description: "Description of Confirmed Product 1",
      
      status: "Confirmed", 
    },
    {
      id: 2,
      name: "Chim Họa Mi",
      price: "$29.99",
      description: "Description of Confirmed Product 2",
     
      status: "Confirmed", 
    },
    {
      id: 3,
      name: "Waiting Product 1",
      price: "$9.99",
      description: "Description of Waiting Product 1",
     
      status: "Waiting", 
    },
    
  ];

  
  const confirmedProducts = products.filter((product) => product.status === "Confirmed");

  return (
    <div className="confirm-page">
      <h1 className="confirm-page-title">Danh sách đơn hàng đã xác nhận</h1>
      <div className="confirmed-products">
        {confirmedProducts.map((product) => (
          <div key={product.id} className="confirmed-product">
           
            <div class="detail-product">
            <h2 className="product-name">{product.name}</h2>
            
            <p className="product-description">{product.description}</p>
            <p className="product-price">{product.price}</p>
            <p className="product-status">Trạng thái: {product.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConfirmPage;
