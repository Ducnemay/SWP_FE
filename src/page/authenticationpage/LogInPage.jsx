import React, { useEffect, useState } from 'react';
import './AuthenticationPage.css';
import { FaEye, FaEyeSlash, FaGlobeAmericas } from 'react-icons/fa';
import jwtDecode from 'jwt-decode';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import api from '../../components/utils/requestAPI';

const LogInPage = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authen, setAuthen] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'https://localhost:7227/api/User/login';
        const data = {
            userName: username,
            password: password
        };

        try {
            console.log(data);
            const response = await api.post(url, data);
            console.log(response.data)
            localStorage.setItem('Authen', JSON.stringify(response.data));
            setAuthen(response.data)
        } catch (error) {
            console.error(error);
            setLoginError('Tên đăng nhập hoặc mật khẩu không chính xác'); 
            window.alert('Tên đăng nhập hoặc mật khẩu không chính xác'); 
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        const authData = localStorage.getItem('Authen');
        if (authData) {
            try {
                const decodedAuth = JSON.parse(authData);
                const decodedToken = jwtDecode(decodedAuth);
                const currentTime = Date.now() / 1000;
                if (decodedToken.exp > currentTime) {
                    setAuthen(decodedAuth);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }, []);

    useEffect(() => {
        async function fetchUserData() {
            try {
                var decode = jwtDecode(authen);
                var userid = decode.userid;
                const url = 'https://localhost:7227/api/User/get-by-id';
                const headers = {
                    'accept': '*/*',
                    'Content-Type': 'application/json-patch+json'
                };
                const data = {
                    userID: userid
                };
                const response = await api.post(url, data);
                var user = response.data;
                setAuth({ user, authen });
                if (user.roleId === '1') {
                    console.log('ys');
                    navigate('/home');
                }
                if (user.roleId === '2') {
                    navigate('/admin-page');
                } 
                if (user.roleId === '4') {
                    navigate('/content');
                }
                if (user.roleId === '3') {
                    navigate('/staff-page');
                    window.alert('Đăng nhập thành công');
                }
            } catch (error) {
                console.error(error);
                localStorage.removeItem('Authen'); // Xóa thông tin đăng nhập khi có lỗi xảy ra
            }
        }
        if (authen) {
            fetchUserData();
        }
    }, [authen, navigate]);

    return (
        <div className='authentication-section'>
            <a href='/home' className='homepage-link'> Về trang chủ</a>
            <div className="authentication-container">
                <h2>Đăng nhập</h2>
                <form onSubmit={handleSubmit}>
                    <div className="authentication-input-container">
                        <input type="text" id="email" name="email" className='authentication-input' required placeholder="..." onChange={(event) => setUsername(event.target.value)} />
                       
                        <label htmlFor="email" className='authentication-input-container-label'>Tên đăng nhập</label>
                    </div>
                    <div className="authentication-input-container">
                   
                        <input type={showPassword ? "text" : "password"} id="password" name="password" className='authentication-input' required placeholder="..." onChange={(event) => setPassword(event.target.value)} />
                        <label htmlFor="password" className='authentication-input-container-label'>Mật khẩu</label>
                        <button type="button" className="log-in-password-toggle-button" onClick={togglePasswordVisibility}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <button type="submit" className='authentication-button'>Đăng nhập</button>
                </form>
                <p>Chưa có tài khoản đăng nhập? <a href='/sign-up'>Đăng ký</a></p>
            </div>
        </div>
    );
}

export default LogInPage;
