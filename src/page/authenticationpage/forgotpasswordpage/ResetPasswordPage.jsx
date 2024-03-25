import React, { useState } from 'react';
import '../AuthenticationPage.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
      <div className="authentication-section">
        <a href='/log-in' className='homepage-link'> Về trang đăng nhập</a>
        <div className="authentication-container">
          <h2>Đặt lại mật khẩu</h2>
          <form>
            <div className="authentication-input-container">
              <label htmlFor="password" className='authentication-input-container-label'>Mật khẩu</label>
              <input type={showPassword ? "text" : "password"} id="password" name="password" className='authentication-input' required/>
              <button type="button" className="reset-password-toggle-button" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="authentication-input-container">
              <label htmlFor="password-confirm" className='authentication-input-container-label'>Xác nhận mật khẩu</label>
              <input type={showConfirmPassword ? "text" : "password"} id="password-confirm" name="password-confirm" className='authentication-input' required/>
              <button type="button" className="confirm-reset-password-toggle-button" onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button type="submit" className='authentication-button'>Xác nhận</button>
          </form>
        </div>
      </div>
  );
}

export default ResetPasswordPage;
