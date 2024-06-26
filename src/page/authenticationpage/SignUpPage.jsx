import React, { useState } from 'react';
import './AuthenticationPage.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import api from '../../components/utils/requestAPI';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    if (name === 'username') {
      const alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
      if (!alphanumericRegex.test(value)) {
        setError('Tên đăng nhập phải chứa cả chữ và số.');
      } else {
        setError('');
      }
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = 'https://localhost:7227/api/User/registration';
    
    // Kiểm tra mật khẩu có đạt yêu cầu mạnh hơn không
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.*[^\da-zA-Z]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError('Mật khẩu phải chứa ít nhất 8 ký tự bao gồm chữ thường, chữ hoa, số và ký tự đặc biệt.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu và xác nhận mật khẩu không khớp.');
      return;
    }

    try {
      const response = await api.post(url, formData);
      setAuth({ user: response.data, authen: true });
      navigate('/update-info');
    } catch (error) {
      console.error(error);
      alert("Đã xảy ra lỗi khi đăng ký!");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="authentication-section">
      <a href='/home' className='homepage-link'>Về trang chủ</a>
      <div className="authentication-container">
        <h2>Đăng ký</h2>
        <form onSubmit={handleSubmit}>
          <div className="authentication-input-container">
            <input type="text" id="username" name="username" className='authentication-input' required placeholder="..." value={formData.username} onChange={handleInputChange} />
            <label htmlFor="username" className='authentication-input-container-label'>Tên đăng nhập</label>
          </div>
          {error && <p className="error-message">{error}</p>} {/* Hiển thị thông báo lỗi nếu có */}
          <div className="authentication-input-container">
            <input placeholder="..." type={showPassword ? "text" : "password"} id="password" name="password" className='authentication-input' required value={formData.password} onChange={handleInputChange} />
            <label htmlFor="password" className='authentication-input-container-label'>Mật khẩu</label>
            <button type="button" className="log-in-password-toggle-button" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="authentication-input-container">
            <input placeholder="..." type={showConfirmPassword ? "text" : "password"} id="confirmPassword" name="confirmPassword" className='authentication-input' required value={formData.confirmPassword} onChange={handleInputChange} />
            <label htmlFor="confirmPassword" className='authentication-input-container-label'>Xác nhận mật khẩu</label>
            <button type="button" className="confirm-password-toggle-button" onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button type="submit" className='authentication-button'>Đăng ký</button>
        </form>
        <p>Bạn đã có tài khoản? <a href='/log-in'>Đăng nhập</a></p>
      </div>
    </div>
  );
};

export default SignUpPage;