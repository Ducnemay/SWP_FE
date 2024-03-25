import React, { useState } from 'react';
import './CreateUser.css';
import api from '../../../components/utils/requestAPI';

const CreateUser = () => {

    const [fullname, setFullname] = useState(null);
    const [gender, setGender] = useState(false);
    const [job, setJob] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (fullname && gender
            && job && dob
            && address && phoneNumber
            && username && password) {
            const url = '/api/User/create-user'
            const data = {
                username: username,
                password: password,
                roleId: job,
                fullname: fullname,
                gender: gender,
                dateOfBirth: dob,
                address: address,
                phonenumber: phoneNumber
            }
            try {
                const response = await api.post(url, data);
                console.log(response.data)
                if (response)
                    window.prompt("Thêm thành công")
                else
                    window.prompt("Thêm thất bại")
            } catch (error) {
                console.error(error);
            }
        } else {
            window.prompt("Hãy nhập đầy đủ các field");
        }

    };

    return (
        <div className="create-user-container">
            <h1 className="create-user-title">Tạo tài khoản nhân viên & quản lý</h1>
            <form>
                <div className="create-user-input-container">
                    <label className="create-user-label">Họ và Tên</label>
                    <input
                        type="text"
                        name="fullName"
                        onChange={(event) => setFullname(event.target.value)}
                        className="create-user-input"
                    />
                </div>
                <div className="create-user-input-container">
                    <label className="create-user-label">Giới tính</label>
                    <input
                        type="radio"
                        name="gender"
                        className='create-user-radio-button'
                        onClick={(event) => setGender(true)}
                    />  <span className='create-user-button-title'>
                        Nam
                    </span>
                    <input
                        type="radio"
                        name="gender"
                        onClick={(event) => setGender(false)}
                        className='create-user-radio-button'
                    /> <span className='create-user-button-title'>
                        Nữ
                    </span>
                </div>

                <div className="create-user-input-container">
                    <label className="create-user-label"> Chức vụ </label>
                    <input
                        type="radio"
                        name="job"
                        className='create-user-radio-button'
                        onClick={(event) => setJob('2')}
                    />  <span className='create-user-button-title'>
                        Manager
                    </span>
                    <input
                        type="radio"
                        name="job"
                        className='create-user-radio-button'
                        onClick={(event) => setJob('3')}
                    /> <span className='create-user-button-title'>
                        Staff
                    </span>
                </div>

                <div className="create-user-input-container">
                    <label className="create-user-label">Ngày sinh</label>
                    <input
                        type="date"
                        name="birthDate"
                        className="create-user-input"
                        onChange={(event) => setDob(event.target.value)}
                        required
                    />
                </div>
                <div className="create-user-input-container">
                    <label className="create-user-label">Địa chỉ</label>
                    <input
                        type="text"
                        name="address"
                        className="create-user-input"
                        onChange={(event) => setAddress(event.target.value)}
                    />
                </div>
                <div className="create-user-input-container">
                    <label className="create-user-label">Số điện thoại</label>
                    <input
                        type="number"
                        name="phoneNumber"
                        className="create-user-input"
                        onChange={(event) => setPhoneNumber(event.target.value)}
                    />
                </div>
                <div className="create-user-input-container">
                    <label className="create-user-label">Tên đăng nhập</label>
                    <input
                        type="text"
                        name="username"
                        className="create-user-input"
                        onChange={(event) => setUsername(event.target.value)}
                        required
                    />
                </div>
                <div className="create-user-input-container">
                    <label className="create-user-label">Mật khẩu</label>
                    <input
                        type="password"
                        name="password"
                        className="create-user-input"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                <button type="submit" className="create-user-button" onClick={handleSubmit}>Tạo mới</button>
            </form>
        </div>
    );
};

export default CreateUser;
