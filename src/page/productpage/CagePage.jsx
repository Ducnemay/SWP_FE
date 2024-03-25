import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Img1 from '/demo.jpg'
import './ProductPage.css';
import api from '../../components/utils/requestAPI';
import ComboBox from '../../components/combobox/ComboBox';

const CagePage = () => {
  const [cage, setCage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await api.get('/api/Product/get-for-customer', {
          headers: {
            'accept': '*/*'
          }
        }).then(response => {
          console.log(response)
          setCage(response.data);
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [])

  return (
    <div className="product-page">
      <ComboBox />

      <div className="product-items-section">
        {cage?.map(product => (
          <Link to={`/item-info/${product.productId}`} className="product-item">
            <div className="product-image">
              {product.image.map(image => (
                <img src={image.imageUrl} alt="Food" key={image.imageId} />
              ))}
            </div>
            <div className="product-details">
              <h4 className="product-title">{product.productName}</h4>
              <p className="product-price">{product.price}</p>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
};

export default CagePage;
