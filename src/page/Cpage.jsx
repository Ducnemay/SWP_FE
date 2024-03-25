import "./Cpage.css";
import React from 'react';
import { useEffect, useState } from 'react';
import api from '../components/utils/requestAPI';
// import jwtDecode from 'jwt-decode';
import useAuth from '../hooks/useAuth';
import Na from "./Napage";
import { Link } from "react-router-dom";


export default function Cpage() {

  // const { auth, setAuth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [artworkList, setArtworkList] = useState([]);

  const { auth } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (auth.user) { // Kiểm tra xem auth.user đã được định nghĩa chưa
          const response = await api.post("https://localhost:7227/api/User/get-by-id", { userId: auth.user.userId });
          setUser(response.data);
          // Lấy tất cả các artwork từ API
          const responseArtworks = await api.get("https://localhost:7227/api/Artwork/get-all");
          const allArtworks = responseArtworks.data.$values;

          // Lọc ra các artwork có userId trùng với userId của user
          const userArtworks = allArtworks.filter(artwork => artwork.userId === auth.user.userId);

          setArtworkList(userArtworks);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }

    };

    fetchUserData();
  }, [auth]);

  return (

    <div >
      <Na className="Navuser" />

      <div className="upload-button-container">
        <Link to="/page-c">
          <button className="upload-image">Upload image</button>
        </Link>
      </div>
      <div className='my-collection'>
        {artworkList.map((artwork) => (
          <div key={artwork.$id} className="image-collection">
            <div className="overlay">
              <img src={artwork.imageUrl} alt="artwork-image"
                className={artwork.statusProcessing ? '' : 'processing-false'}
              />
              {!artwork.statusProcessing && <div className="waiting-text">Chờ duyệt</div>}

            </div>
            <div className="details">
              <div className="authors">{artwork.description}</div>
              <div className="titles">{artwork.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};
