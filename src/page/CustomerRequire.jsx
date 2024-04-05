import React, { useState, useEffect } from "react";
import api from "../components/utils/requestAPI";
import useAuth from "../hooks/useAuth";
import "./Page.css"
import { useParams, useNavigate } from 'react-router-dom';

const CustomerRequire = () => {
  const { auth } = useAuth();
  const [description, setDescription] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [image, setImage] = useState("");
  const [money, setPrice] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth || !auth.user) {
      // Redirect to login page or handle unauthorized access
      navigate("/log-in");
    }
  }, [auth, navigate]);

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Lấy file từ sự kiện onChange
    // Tạo một đối tượng FileReader
    const reader = new FileReader();
    // Đọc file như một chuỗi dạng data URL
    reader.readAsDataURL(file);
    // Được gọi khi quá trình đọc file hoàn thành
    reader.onload = () => {
      const image = reader.result; // Nhận kết quả dạng base64
      setImage(image); // Cập nhật state imageUrl với đường dẫn mới

    };
  };

  const setNumberDeadlineDate = (value) => {
    // Remove the "day" suffix
    const numericValue = parseFloat(value);
    
    // Check if the entered value is a valid number
    if (!isNaN(numericValue)) {
      setDeadlineDate(numericValue + " day");
    } 
  };
  
  const setNumericPrice = (value) => {
    // Ensure that the entered value is a valid number
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      setPrice(numericValue);
    }
  };

  const UserAllowtoPost = auth && auth.user && (auth.user.statusPost === true || auth.user.premiumId !== null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!auth || !auth.user) {
      window.alert("Please log in to submit the request.");
      return;
    }

    const artworkData = {
      userID: auth.user.userId,
      description: description,
      deadlineDate: deadlineDate,
      image: image,
      money: money
    };

    try {
      const headers = {
        "Content-Type": "application/json",
      };

      if (auth.token) {
        headers.Authorization = `Bearer ${auth.token}`;
      }

      if (!UserAllowtoPost) {
        window.alert("Please upgrade your account to premium.");
        navigate("/page-m");
        return;
      }
      if (!description) {
        window.alert("Please write your description before send request.");
        return;
      } else if (!deadlineDate) {
        window.alert("Please write days that you want to artwork done before send request.");
        return;
      } else if (!image) {
        window.alert("Please upload image before send request.");
        return;
      }else if (!money) {
        window.alert("Please write a price that you think that enough before send request.");
        return;
      }

      const createArtworkResponse = await api.post(
        `https://localhost:7227/api/ArtCustome/create-new-art-custome?userid=${auth.user.userId}`,
        artworkData,
        { headers }
      );

      console.log("Send request successfully:", createArtworkResponse.data[0]);

      window.alert("Send request successfully!");
      navigate("/creator-confirm");
    } catch (error) {
      console.error("Error creating artwork:", error);
      window.alert("Error creating artwork.");
    }
  };

  return (
    <div className="add-artwork-form">
      <h1 className="cus-form-title">Request for Custom Art</h1>

      <form onSubmit={handleSubmit}>
        <br />
        <label className="cus-form-label">
          Description:
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="cus-form-textarea"
          />
        </label>
        <br />

        <br />
        <label className="cus-form-label">
          Time To Done The Artwork:
          <input
            placeholder="day"
            style={{ color: "black" }}
            value={deadlineDate !== "" ? deadlineDate :""}
            onChange={(e) => setNumberDeadlineDate(e.target.value)}
            className="cus-form-textarea"
          />
        </label>
        <br />

        <br />
        <label className="cus-form-label">
          Price That You Expect For The Artwork:
          <input
            type="number"
            value={money}
            onChange={(e) => setNumericPrice(e.target.value)}
            className="cus-form-input"
          />
        </label>
        <br />

        <br />
        <div className="cus-image-upload">
          <label className="cus-form-label">
            Upload Example Image That You Want:
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="cus-form-select"
            />
          </label>

          {image && (
            <img src={image} alt="Artwork" style={{ maxWidth: "100px", maxHeight: "100px" }} />
          )}
        </div>
        <br />

        <br />

        <button type="submit" className="cus-submit-button">
          Send request
        </button>
      </form>
    </div>
  );
};

export default CustomerRequire;
