import React from 'react';
import { Link } from 'react-router-dom';
import './CustomerConfirm.css';
import { useParams, useNavigate } from 'react-router-dom';
const CustomerConfirm = ({ authorName, price, description }) => {
  const { artworkCustomeId } = useParams();
  return (
    <div className="customer-confirm">
        <Link><ol><i class="fa-solid fa-backward"></i> Back</ol></Link>
      <h2>INFORMATION</h2>
      <div className="author-info">
        <p><strong>Author:</strong> {authorName}</p>
      </div>
      {/* <div className="product-info">
        <p><strong>Price:</strong> {price}</p>
        <p><strong>Description:</strong> {description}</p>
      </div> */}
      <nav>Accept</nav>
      <nav>Reject</nav>
    </div>
  );
}

export default CustomerConfirm;