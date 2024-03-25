import React, {useState} from 'react';
import Img1 from '/demo.jpg'
import './ProductPage.css';
import ComboBox from '../../components/combobox/ComboBox';

const FoodPage = () => {

  return (
    <div className="product-page">
      <ComboBox />
      <div className="product-items-section">
        <a href='/item-info' className="product-item" >
          <div className="product-image">
            <img src={Img1} alt="Food" />
          </div>
          <div className="product-details">
            <h4 className="product-title">Cage Title</h4>
            <p className="product-price">$99.99</p>
          </div>
        </a>
      </div>
      <div className="product-items-section">
        <a href='/item-info' className="product-item" >
          <div className="product-image">
            <img src={Img1} alt="Food" />
          </div>
          <div className="product-details">
            <h4 className="product-title">Cage Title</h4>
            <p className="product-price">$99.99</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default FoodPage;
