// src/components/Body.js
// import { Link } from 'react-router-dom';
import "./Body.css";
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import api from "../../../../components/utils/requestAPI";
import LayoutMorder from "../../../../components/layout/LayoutMorder";




// eslint-disable-next-line react/prop-types, no-unused-vars
export default function Requestpagedetail() {
  // const products = getProduct();
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const url = "https://localhost:7227/api/ArtCustome/get-all";
    try {
      const response = await api.get(url);
      console.log(response.data);
      setProducts(response.data.$values);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <LayoutMorder>
    <div className="bodys">
      
          {/* <div className="image-container"> */}
          <div className="body">
          {products.map((ins) => (
            !ins.statusProcessing &&
          <div key={ins.artworkId} className="box">
            <Link to={`/req-detail/${ins.artworkId}`}>
              <div className="overlay">
              <img src={ins.image} alt="artwork-image" />
              </div>
              {/* <img src={image?.imageUrl} alt="" /> */}
            </Link> 
                      <div className="details">
                      <div className="authors">{ins.description}</div>
                      <div  className="titles">{ins.deadlineDate}</div>   
                       </div>
                    </div>  
                                      
       ))}
      
          </div>  
          
          </div> 
          <><p
          style={{
            paddingTop:"20px"
          }}
          className="foot-sidebar">Copyright &copy; 2024 ArtWorks</p></>
          </LayoutMorder>  
  );
}

