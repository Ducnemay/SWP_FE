import React, { useState, useEffect } from "react";
import api from "../components/utils/requestAPI";
import useAuth from "../hooks/useAuth";
import "./Page.css"
import { Link } from "react-router-dom";

const Page = () => {
  
  const { auth } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [genreID, setGenreID] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // Sử dụng để lưu đường dẫn đến hình ảnh dưới dạng base64
  const [imageUrl2, setImageUrl2] = useState("");
  const [reason, setReason] = useState("");
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    // Fetch genre list
    const fetchGenres = async () => {
      try {
        const response = await api.get("https://localhost:7227/api/Genre/get-all");
        const data = response.data.$values;
        setGenreList(data);
      } catch (error) {
        console.error('Error fetching genre data:', error);
      }
    };

    fetchGenres();
  }, []);
  const setNumericPrice = (value) => {
    // Ensure that the entered value is a valid number
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      setPrice(numericValue);
    }
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Lấy file từ sự kiện onChange

    // Tạo một đối tượng FileReader
    const reader = new FileReader();

    // Đọc file như một chuỗi dạng data URL
    reader.readAsDataURL(file);

    // Được gọi khi quá trình đọc file hoàn thành
    reader.onload = () => {
      const imageUrl = reader.result; // Nhận kết quả dạng base64
      setImageUrl(imageUrl); // Cập nhật state imageUrl với đường dẫn mới
      
    };
  };

  const handleImageChange2 = (event) => {
    const file = event.target.files[0]; // Lấy file từ sự kiện onChange

    // Tạo một đối tượng FileReader
    const reader = new FileReader();

    // Đọc file như một chuỗi dạng data URL
    reader.readAsDataURL(file);

    // Được gọi khi quá trình đọc file hoàn thành
    reader.onload = () => {
      
      const imageUrl2 = reader.result;
      setImageUrl2(imageUrl2);
    };
  };
  const UserAllowtoPost=auth.user.statusPost ===true || auth.user.premiumId !==null;
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    
    if (!imageUrl && !imageUrl2) {
      window.alert("Please upload both images before submitting.");
      return;
    }
    if(!UserAllowtoPost){
      window.alert("Please upgrade your account to premium.");
      return;
    }
    const artworkData = {
      userID:auth.user.userId,
      title: title,
      description: description,
      price: price,
      genreID: genreID,
      imageUrl: imageUrl,
      imageUrl2: imageUrl2,
      reason: reason,
    };
  
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      
      // Check if auth.token exists before adding Authorization header
      if (auth && auth.token) {
        headers.Authorization = `Bearer ${auth.token}`;
      }
      
      // Create the artwork
      const createArtworkResponse = await api.post(
        `https://localhost:7227/api/Artwork/create-new-artwork?userID=${auth.user.userId}`,
        artworkData,
        { headers }
      );

      console.log("Artwork created successfully:", createArtworkResponse.data);

      // Update the status of the user's post
      const updateStatusResponse = await api.post(
        `https://localhost:7227/api/User/update-status-post?id=${auth.user.userId}`,
        { status: "0" }, // Replace with the actual data you want to update
        { headers }
      );

      console.log("User post status updated successfully:", updateStatusResponse.data);

      // Handle success here, e.g., redirect user to another page
      window.alert("Artwork created successfully!");

    } catch (error) {
      console.error("Error creating artwork:", error);
      // Handle error here, e.g., show error message to the user
      window.alert("Error creating artwork. Please upgrade your account to premium.");
    }
  };
 

  return (
    <div className="add-artwork-form">
      <Link to ="/"><button className="cus-submit-button">Back to home</button></Link>
      <h1 className="cus-form-title">Create Artwork</h1>
      
      <form onSubmit={handleSubmit}>

        <label className="cus-form-label">
          Genre:
          <select
            value={genreID}
            onChange={(e) => setGenreID(e.target.value)}
          >
            <option value="">Select a genre</option>
            {genreList.map(genre => (
              <option key={genre.genreID} value={genre.genreID}>{genre.name}</option>
            ))}
          </select>
        </label>
        <br />
        <label className="cus-form-label">
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="cus-form-input"
          />
        </label>
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
        <label className="cus-form-label">
          Price Paid:
          <input
            type="number"
            value={price}
            onChange={(e) => setNumericPrice(e.target.value)}
            className="cus-form-input"
          />
        </label>
        <br />
        <div className="upload-information">
          <div className="img-column-left">
            <p>your artwork in upload Image</p>

            <img src="/public/i.png" alt="your artwork in upload Image" />

          </div>
          <div className="img-column-right">
            <p>your artwork with your sign in Upload Image With Your Sign</p>

            <img src="/public/i_sign.png" alt="your artwork in upload Image" />

          </div>
        </div>
        <br />
        <div className="cus-image-upload">
          <label className="cus-form-label">
            Upload Image:
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="cus-form-select"
            />
          </label>
        
        {/* Hiển thị hình ảnh */}
        {imageUrl && (
          <img src={imageUrl} alt="Artwork" style={{ maxWidth: "100px", maxHeight: "100px" }} />
        )}</div>
        <br />
        <div className="cus-image-upload">
          <label className="cus-form-label">
            Upload Image With Your Sign:
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange2}
              className="cus-form-select"
            />
          </label>
        </div>
        {imageUrl2 && (
          <img src={imageUrl2} alt="Artwork" style={{ maxWidth: "100px", maxHeight: "100px" }} />
        )}
        <br />
        
        <button type="submit" className="cus-submit-button">Add Artwork</button>
      </form>
    </div>
  );
};

export default Page;