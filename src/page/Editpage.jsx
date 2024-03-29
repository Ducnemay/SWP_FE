import React, { useState, useEffect } from 'react';
import "./Edit.css";
import useAuth from "../hooks/useAuth";
import api from "../components/utils/requestAPI";
import { useNavigate } from 'react-router-dom';

const Editpage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    imgURL: null,
    dateOfBirth: '',
    phone: '',
    gender: '',
    address: '',
    bannk: '', // New field
    bankAccount: '', // New field
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Gọi API để lấy thông tin người dùng khi component được tạo
    const fetchUserData = async () => {
      try {
        const response = await api.post(`https://localhost:7227/api/User/get-by-id`, { userId: auth.user.userId });
        if (response.data) {
          // Nếu có dữ liệu trả về, cập nhật state formData
          const userData = response.data;
          setFormData({
            fullName: userData.fullname || '',
            dateOfBirth: userData.dateOfBirth || '',
            phone: userData.phoneNumber || '',
            gender: userData.sex || '',
            address: userData.address || '',
            imgURL: userData.imageUrl || null,
            bannk: userData.bank || '', // New field
            bankAccount: userData.bankAccount || '', // New field
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [auth.user.userId]);

  const handleSave = async () => {
    try {
      // Gửi dữ liệu người dùng đã chỉnh sửa đến API
      const response = await api.post(`https://localhost:7227/api/User/update?id=${auth.user.userId}`, formData);
      if (response.data) {
        // Xử lý sau khi lưu thành công
        console.log('Profile updated successfully.');
        setSuccessMessage('Profile updated successfully.');
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/home'); // Quay lại trang Home sau khi update thành công
        }, 3000); // Ẩn thông báo sau 3 giây
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        imgURL: URL.createObjectURL(file), // Tạo đường dẫn tạm thời đến hình ảnh đã chọn
      });
    }
  };

  return (
    <div className="edit-page">
      <h1>Edit Profile</h1>

      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className="form-group">
        <label htmlFor="avatar" className="input-label1">Choose Avatar:</label>
        <input
          type="file"
          id="avatar"
          accept="image/*"
          onChange={handleAvatarChange}
        />
        
        {formData.imgURL && <img src={formData.imgURL} alt="Avatar" className="avatar-preview" />}
      </div>

      <div className="form-group">
        <input
          type="text"
          id="fullName"
          className="input-field"
          value={formData.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          required
        />
        <label htmlFor="fullName" className='input-label'>Full Name</label>
      </div>

      <div className="form-group">
        <input
          type="text"
          id="dateOfBirth"
          className="input-field"
          value={formData.dateOfBirth}
          onChange={(e) => handleChange('dateOfBirth', e.target.value)}
          required
        />
        <label htmlFor="dateOfBirth" className='input-label'>Date of Birth (YYYY-MM-DD)</label>
      </div>

      <div className="form-group">
        <input
          type="text"
          id="phone"
          className="input-field"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          required
        />
        <label htmlFor="phone" className='input-label'>Phone</label>
      </div>

      <div className="form-group">
        <input
          type="text"
          id="gender"
          className="input-field"
          value={formData.gender}
          onChange={(e) => handleChange('gender', e.target.value)}
          required
        />
        <label htmlFor="gender" className='input-label'>Gender</label>
      </div>

      <div className="form-group">
        <input
          type="text"
          id="address"
          className="input-field"
          value={formData.address}
          onChange={(e) => handleChange('address', e.target.value)}
          required
        />
        <label htmlFor="address" className='input-label'>Address</label>
      </div>

      {/* New fields */}
      <div className="form-group">
        <input
          type="text"
          id="bank"
          className="input-field"
          value={formData.bannk}
          onChange={(e) => handleChange('bannk', e.target.value)}
          required
        />
        <label htmlFor="bank" className='input-label'>Bank</label>
      </div>

      <div className="form-group">
        <input
          type="text"
          id="bankAccount"
          className="input-field"
          value={formData.bankAccount}
          onChange={(e) => handleChange('bankAccount', e.target.value)}
          required
        />
        <label htmlFor="bankAccount" className='input-label'>Bank Account</label>
      </div>

      <button className="save-button" onClick={handleSave}>Save</button>
    </div>
  );
};

export default Editpage;