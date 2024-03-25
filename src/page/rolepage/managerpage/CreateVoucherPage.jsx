import React, { useState } from 'react';
import './CreateVoucherPage.css';

function CreateVoucherPage() {
  const [voucher, setVoucher] = useState({
    name: '',
    description: '',
    value: '',
    expiry: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVoucher({ ...voucher, [name]: value });
  };

  const handleAddVoucher = () => {
    if (voucher.name && voucher.value && voucher.expiry) {
      console.log('Voucher added:', voucher);
      setVoucher({
        name: '',
        description: '',
        value: '',
        expiry: '',
      });
    } else {
      alert('Vui lòng điền đầy đủ thông tin tên, giá trị và ngày hết hạn.');
    }
  };

  return (
    <div className="create-voucher-page">
      <h1 className="create-voucher-title">Tạo Voucher</h1>
      <form>
        <div className="create-voucher-input-container">
          <label className="create-voucher-input-label" htmlFor="name">Tên voucher</label>
          <input className="create-voucher-input-field" type="text" id="name" name="name" value={voucher.name} onChange={handleInputChange} required />
        </div>
        <div className="create-voucher-input-container">
          <label className="create-voucher-input-label" htmlFor="description">Mô tả</label>
          <input className="create-voucher-input-field" type="text" id="description" name="description" value={voucher.description} onChange={handleInputChange} />
        </div>
        <div className="create-voucher-input-container">
          <label className="create-voucher-input-label" htmlFor="discount">Giá Trị Giảm (%)</label>
          <input className="create-voucher-input-field" type="number" id="discount" name="discount" value={voucher.discount} onChange={handleInputChange} required />
        </div>
        <div className="create-voucher-input-container">
          <label className="create-voucher-input-label" htmlFor="expiry">Ngày bắt đầu</label>
          <input className="create-voucher-input-field" type="date" id="expiry" name="expiry" value={voucher.expiry} onChange={handleInputChange} required />
        </div>
        <div className="create-voucher-input-container">
          <label className="create-voucher-input-label" htmlFor="expiry">Ngày hết hạn</label>
          <input className="create-voucher-input-field" type="date" id="expiry" name="expiry" value={voucher.expiry} onChange={handleInputChange} required />
        </div>
        <button className="add-button" type="button" onClick={handleAddVoucher}>Thêm voucher</button>
      </form>
    </div>
  );
}

export default CreateVoucherPage;
