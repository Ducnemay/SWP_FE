import React, { useState, useEffect } from 'react';
import './AuthenticationPage.css';
import api from '../../components/utils/requestAPI';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const UpdateInformationPage = () => {
    const { auth } = useAuth();
    const [fullname, setFullname] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [imageBase64, setImageBase64] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [bank, setBank] = useState('');
    const [bankAccount, setBankAccount] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.user.dateOfBird) {
            const date = new Date(auth.user.dateOfBird);
            const formattedDateOfBirth = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
            setDateOfBirth(formattedDateOfBirth);
        }
    }, [auth.user.dateOfBird]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const imageUrl = reader.result;
            setImageBase64(imageUrl);
            setImageUrl(URL.createObjectURL(file));
        };
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            imgURL: imageBase64,
            fullName: fullname,
            gender: gender,
            address: address,
            phone: phone,
            dateOfBird: dateOfBirth,
            bannk: bank,
            bankAccount: bankAccount
        };

        try {
            const response = await api.post(`https://localhost:7227/api/User/update?id=${auth.user.userId}`, data);
            if (response.data != null)
                navigate('/log-in');
            else
                alert('Failed to update user information. Please try again.');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='authentication-section'>
            <div className="authentication-container">
                <h2>Update User Information</h2>
                <form onSubmit={handleSubmit}>
                    <div className="authentication-input-container">
                        <label htmlFor="fullname" className='authentication-input-container-label'></label>
                        <input type="text" id="fullname" name="fullname" className='authentication-input' required
                            value={fullname}
                            placeholder="Full Name"
                            onChange={(event) => setFullname(event.target.value)} />
                    </div>
                    <div className="authentication-input-container">
                        <label htmlFor="gender" className='authentication-input-container-label'></label>
                        <input type="text" id="gender" name="gender" className='authentication-input' required
                            value={gender}
                            placeholder="Gender"
                            onChange={(event) => setGender(event.target.value)} />
                    </div>
                    <div className="authentication-input-container">
                        <label htmlFor="phone" className='authentication-input-container-label'></label>
                        <input type="text" id="phone" name="phone" className='authentication-input' required
                            value={phone}
                            placeholder="Phone"
                            onChange={(event) => setPhone(event.target.value)} />
                    </div>
                    <div className="authentication-input-container">
                        <label htmlFor="address" className='authentication-input-container-label'></label>
                        <input type="text" id="address" name="address" className='authentication-input' required
                            value={address}
                            placeholder="Address"
                            onChange={(event) => setAddress(event.target.value)} />
                    </div>
                    <div className="authentication-input-container">
                        <label htmlFor="dateOfBirth" className='authentication-input-container-label'></label>
                        <input type="date" id="dateOfBirth" name="dateOfBirth" className='authentication-input' required
                            value={dateOfBirth}
                            // placeholder="Date of Birth"
                            onChange={(event) => setDateOfBirth(event.target.value)} />
                    </div>
                    <div className="authentication-input-container">
                        <label htmlFor="bank" className='authentication-input-container-label'></label>
                        <input type="text" id="bank" name="bank" className='authentication-input' required
                            value={bank}
                            placeholder="Bank"
                            onChange={(event) => setBank(event.target.value)} />
                    </div>
                    <div className="authentication-input-container">
                        <label htmlFor="bankAccount" className='authentication-input-container-label'></label>
                        <input type="text" id="bankAccount" name="bankAccount" className='authentication-input' required
                            value={bankAccount}
                            placeholder="Bank Account"
                            onChange={(event) => setBankAccount(event.target.value)} />
                    </div>
                    <div className="authentication-input-container">
                        <label htmlFor="image" className='authentication-input-container-label'></label>
                        <input type="file" id="image" name="image" className='authentication-input' required
                            onChange={handleImageChange} />
                    </div>
                    {imageUrl && (
                        <img src={imageUrl} alt="Uploaded" style={{ width: '100px', height: '100px' }} />
                    )}
                    <button type="submit" className='authentication-button'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateInformationPage;
