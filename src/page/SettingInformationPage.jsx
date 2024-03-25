import React, { Fragment, useState } from 'react';
import './SettingInformationPage.css';

const SettingInformationPage = () => {

    const [avatarUrl, setAvatarUrl] = useState('');

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setAvatarUrl(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const validateDateOfBirth = (event) => {
        const selectedDate = new Date(event.target.value);
        const today = new Date();

        if (selectedDate >= today) {
            alert("Please select a valid date of birth.");
            event.target.value = "";
        }
    }

    return (
        <Fragment>
            <div className="setting-homepage-link-bar">
                <a href='/home' className='setting-homepage-link'> Về trang chủ</a>
            </div>
            <div className='update-info-page'>
                <div className="update-info-container">
                    <h2 className='update-info-container-title'>Chỉnh sửa thông tin</h2>
                    <div className="update-info-section">
                        <div className="update-info-of-img">
                            <h2>Ảnh đại diện</h2>
                            <img src={avatarUrl} alt="Avatar" className="avatar" />
                            <label htmlFor="avatarInput" className="custom-file-upload">Thay đổi ảnh đại diện</label>
                            <input type="file" id="avatarInput" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
                        </div>
                        <div className="update-info-of-profile">
                            <h2>Hồ sơ</h2>
                            <form>
                                <div className="update-info-input-container">
                                    <label htmlFor="name" className='update-info-input-container-label'>Họ và Tên</label>
                                    <input type="text" id="name" name="name" className='update-info-input' required />
                                </div>
                                <div className="update-info-check-container">
                                    <div className="update-info-check-sex">
                                        <label htmlFor="sex" className='update-info-input-container-label'>Giới tính</label>
                                        <input type="radio" name="sex" value="M" className='update-info-check-sex-button' /> <span className='button-title'>Nam</span>
                                        <input type="radio" name="sex" value="F" className='update-info-check-sex-button' /> <span className='button-title'>Nữ</span>
                                    </div>
                                    <div className="update-info-check-dob">
                                        <label htmlFor="dob" className='update-info-input-container-label'>Ngày sinh</label>
                                        <input type="date" name="dob" className='update-info-date' value={selectedDate} onChange={handleDateChange} onBlur={validateDateOfBirth} required />
                                    </div>
                                </div>
                                <div className="update-info-input-container">
                                    <label htmlFor="address" className='update-info-input-container-label'>Địa chỉ</label>
                                    <input type="text" id="address" name="address" className='update-info-input' required />
                                </div>
                                <div className="update-info-input-container">
                                    <label htmlFor="phone-number" className='update-info-input-container-label'>Số điện thoại</label>
                                    <input type="number" id="phone-number" name="phone-number" className='update-info-input' required />
                                </div>

                            </form>
                        </div>
                    </div>
                    <button type="submit" className='update-info-button'>Lưu thay đổi</button>
                </div>
            </div>
        </Fragment>
    );
}

export default SettingInformationPage;
