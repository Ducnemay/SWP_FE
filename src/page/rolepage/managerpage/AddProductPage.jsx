import React, { Fragment, useEffect, useState } from 'react';
import './AddProductPage.css';
import ComboBox from '../../../components/combobox/ComboBox';
import { useParams } from 'react-router-dom';
import api from '../../../components/utils/requestAPI';
import { storage } from '../../../components/utils/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const AddProductPage = () => {

    const [avatarUrl, setAvatarUrl] = useState('');
    const [listStyle, setListStyle] = useState(null);

    const [name, setName] = useState('');
    const [selectSize, setSelectSize] = useState('');
    const [style, setStyle] = useState('');
    const [selectMaterial, setSelectMaterial] = useState('');
    const [selectColor, setSelectColor] = useState('');
    const [des, setDes] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const [imageU, setImageU] = useState('');

    const { action } = useParams();

    const handleAvatarChange = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        const data = await event.target.files[0].arrayBuffer();
        const metadata = {
            contentType: 'image/png',
        }
        const storageRef = ref(storage, `/lama/${event.target.value}`)
        await uploadBytes(storageRef, data, metadata)

        const imageUrl = await getDownloadURL(storageRef);

        console.log(imageUrl);

        setImageU(imageUrl);

        reader.onload = () => {
            setAvatarUrl(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };


    const fetchDataStyle = async () => {
        const urlStyle = '/api/Style/get-all'
        try {
            const responseStyle = await api.get(urlStyle);
            console.log(responseStyle.data);
            setListStyle(responseStyle.data);
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        fetchDataStyle();
    }, [])

    const handleSubmit = async () => {
        const priceDouble = parseFloat(price);
        const quantityNum = parseInt(quantity);
        const url = '/api/Product/create';
        const data = {
            productName: name,
            productDescription: des,
            quantity: quantityNum,
            price: priceDouble,
            discountPrice: 0,
            styles: [
                {
                    styleID: style
                }
            ],
            category: {
                categoryID: "Cate90fb2"
            },
            sizes: [
                {
                    sizeID: selectSize
                }
            ],
            colors: [
                {
                    colorID: selectColor
                }
            ],
            materials: [
                {
                    materialID: selectMaterial
                }
            ],
            imageUrl: imageU
        }
        try {
            const response = await api.post(url, data);
            console.log(response.data)
            if (response) {
                window.prompt('add success');
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleToySubmit = async () => {
        const priceDouble = parseFloat(price);
        const quantityNum = parseInt(quantity);
        const url = '/api/Product/create';
        const data = {
            productName: name,
            productDescription: des,
            quantity: quantityNum,
            price: priceDouble,
            discountPrice: 0,
            category: {
                categoryID: "Catef5d6d"
            },
            imageUrl: imageU
        }
        try {
            const response = await api.post(url, data);
            console.log(response.data)
            if (response) {
                window.prompt('add success');
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleFoodSubmit = async () => {
        const priceDouble = parseFloat(price);
        const quantityNum = parseInt(quantity);
        const url = '/api/Product/create';
        const data = {
            productName: name,
            productDescription: des,
            quantity: quantityNum,
            price: priceDouble,
            discountPrice: 0,
            category: {
                categoryID: "Cate7646a"
            },
            imageUrl: imageU
        }
        try {
            const response = await api.post(url, data);
            console.log(response.data)
            if (response) {
                window.prompt('add success');
            }
        } catch (error) {
            console.error(error)
        }
    }

    if (action === 'add-cage') {
        return (
            // tạo lồng
            <div className='add-product-page'>
                <div className="add-product-container">
                    <h2 className='add-product-container-title'>Thông tin</h2>
                    <div className="add-product-section">
                        <div className="add-product-of-img">
                            <h2>Ảnh sản phẩm</h2>
                            <img src={avatarUrl} alt="Product A" className="product-cage-img" />
                            <label htmlFor="imageInput" className="custom-file-upload">Thêm ảnh sản phẩm</label>
                            <input type="file" id="imageInput" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
                        </div>
                        <div className="add-product-of-profile">
                            <h2>Hồ sơ</h2>
                            <form>
                                <div className="add-product-input-container">
                                    <label htmlFor="name" className='add-product-input-container-label'>Tên sản phẩm</label>
                                    <input type="text" id="name" name="name" className='add-product-input' onChange={(event) => setName(event.target.value)} required />
                                </div>
                                <div className="add-product-check-shape">
                                    <label htmlFor="shape" className='add-product-input-container-label'>Hình dáng</label>
                                    <div className='add-product-style-input-container'>
                                        {listStyle?.map(style => (
                                            <div className='add-product-style-input'>
                                                <input type="radio" id='selectstyle' name="shape" value={style.styleId}
                                                    className='add-product-check-shape-button'
                                                    onClick={(event) => setStyle(event.target.value)}
                                                />
                                                <span className='button-title'>{
                                                    style.styleName}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="add-product-combobox">
                                    <label htmlFor="size" className='add-product-input-container-label'>Kích thước</label>
                                    <ComboBox classname={"size"} onChange={setSelectSize} />
                                </div>
                                <div className="add-product-combobox">
                                    <label htmlFor="material" className='add-product-input-container-label'>Chất liệu</label>
                                    <ComboBox classname={"material"} onChange={setSelectMaterial} />
                                </div>
                                <div className="add-product-combobox">
                                    <label htmlFor="color" className='add-product-input-container-label'>Màu sắc</label>
                                    <ComboBox classname={"color"} onChange={setSelectColor} />
                                </div>
                                <div className="add-product-input-container">
                                    <label htmlFor="description" className='add-product-input-container-label'>Mô tả</label>
                                    <textarea id="description" name="description" className='add-product-input des-textarea' required onChange={(event) => setDes(event.target.value)} />
                                </div>
                                <div className="add-product-input-container">
                                    <label htmlFor="price" className='add-product-input-container-label'>Giá tiền (&#8363;)</label>
                                    <input type="number" id="price" name="price" className='add-product-input' onChange={(event) => setPrice(event.target.value)} required />
                                </div>
                                <div className="add-product-input-container">
                                    <label htmlFor="inventory" className='add-product-input-container-label'>Số lượng hàng trong kho</label>
                                    <input type="number" id="inventory" name="inventory" className='add-product-input' onChange={(event) => setQuantity(event.target.value)} required />
                                </div>
                            </form>
                        </div>
                    </div>
                    <button type="submit" className='add-product-button' onClick={handleSubmit}>Lưu sản phẩm</button>
                </div>
            </div>
        )
    }
    if (action === 'add-food') {
        return (
            //food a&t
            <div className='add-product-page'>
                <div className="add-product-container">
                    <h2 className='add-product-container-title'>Thông tin</h2>
                    <div className="add-product-section">
                        <div className="add-product-food-at-of-img">
                            <h2>Ảnh sản phẩm</h2>
                            <img src={avatarUrl} alt="Product A" className="product-food-at-img" />
                            <label htmlFor="imageInput" className="custom-file-upload">Thêm ảnh sản phẩm</label>
                            <input type="file" id="imageInput" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
                        </div>
                        <div className="add-product-food-at-of-profile">
                            <h2>Hồ sơ</h2>
                            <form>
                                <div className="add-product-input-container">
                                    <label htmlFor="name" className='add-product-input-container-label'>Tên sản phẩm</label>
                                    <input type="text" id="name" name="name" className='add-product-input' required onChange={(event) => setName(event.target.value)} />
                                </div>
                                <div className="add-product-input-container">
                                    <label htmlFor="description" className='add-product-input-container-label'>Mô tả</label>
                                    <textarea id="description" name="description" className='add-product-input des-textarea' required onChange={(event) => setDes(event.target.value)} />
                                </div>
                                <div className="add-product-input-container">
                                    <label htmlFor="price" className='add-product-input-container-label'>Giá tiền (&#8363;)</label>
                                    <input type="number" id="price" name="price" className='add-product-input' required onChange={(event) => setPrice(event.target.value)} />
                                </div>
                                <div className="add-product-input-container">
                                    <label htmlFor="inventory" className='add-product-input-container-label'>Số lượng hàng trong kho</label>
                                    <input type="number" id="inventory" name="inventory" className='add-product-input' required onChange={(event) => setQuantity(event.target.value)} />
                                </div>
                            </form>
                        </div>
                    </div>
                    <button type="submit" className='add-product-button' onClick={handleFoodSubmit}>Lưu sản phẩm</button>
                </div>
            </div>
        )
    }
    if (action === 'add-toy') {
        return (
            <div className='add-product-page'>
                <div className="add-product-container">
                    <h2 className='add-product-container-title'>Thông tin</h2>
                    <div className="add-product-section">
                        <div className="add-product-food-at-of-img">
                            <h2>Ảnh sản phẩm</h2>
                            <img src={avatarUrl} alt="Product A" className="product-food-at-img" />
                            <label htmlFor="imageInput" className="custom-file-upload">Thêm ảnh sản phẩm</label>
                            <input type="file" id="imageInput" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
                        </div>
                        <div className="add-product-food-at-of-profile">
                            <h2>Hồ sơ</h2>
                            <form>
                                <div className="add-product-input-container">
                                    <label htmlFor="name" className='add-product-input-container-label'>Tên sản phẩm</label>
                                    <input type="text" id="name" name="name" className='add-product-input' required onChange={(event) => setName(event.target.value)} />
                                </div>
                                <div className="add-product-input-container">
                                    <label htmlFor="description" className='add-product-input-container-label'>Mô tả</label>
                                    <textarea id="description" name="description" className='add-product-input des-textarea' required onChange={(event) => setDes(event.target.value)} />
                                </div>
                                <div className="add-product-input-container">
                                    <label htmlFor="price" className='add-product-input-container-label'>Giá tiền (&#8363;)</label>
                                    <input type="number" id="price" name="price" className='add-product-input' required onChange={(event) => setPrice(event.target.value)} />
                                </div>
                                <div className="add-product-input-container">
                                    <label htmlFor="inventory" className='add-product-input-container-label'>Số lượng hàng trong kho</label>
                                    <input type="number" id="inventory" name="inventory" className='add-product-input' required onChange={(event) => setQuantity(event.target.value)} />
                                </div>
                            </form>
                        </div>
                    </div>
                    <button type="submit" className='add-product-button' onClick={handleToySubmit}>Lưu sản phẩm</button>
                </div>
            </div>
        )
    }
}
export default AddProductPage;
