import React, { useEffect, useState } from "react";
import "./ProductPage.css"
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import api from "../../../components/utils/requestAPI";
import useAuth from '../../../hooks/useAuth'
import { data } from "jquery";

const ProductPage = () => {

    const { auth } = useAuth();

    const { action } = useParams();
    const [listProduct, setListProduct] = useState(null);
    const [listCage, setListCage] = useState(null);
    const [listFood, setListFood] = useState(null);
    const [listToy, setListToy] = useState(null);

    const fetchData = async () => {
        const url = '/api/Product/get-all';
        try {
            const response = await api.get(url);
            console.log(response.data);
            setListProduct(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async (id) => {
        const url = `/api/Product/delete-product?id=${id}`;
        try {
            const response = await api.delete(url);
            console.log(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchData();
    }, [auth, handleDelete]);

    useEffect(() => {
        const sortByCage = () => {
            const list = [];
            listProduct?.map(cage => {
                cage?.categoryProduct.map(cate => {
                    console.log(cate.category)
                    if (cate?.category.categoryName === 'Cage')
                        list.push(cage);
                })
            })
            setListCage(list);
        }

        const sortByFood = () => {
            const list = [];
            listProduct?.map(food => {
                food.categoryProduct.map(cate => {
                    if (cate?.category.categoryName === 'Food')
                        list.push(food);
                })
            })
            setListFood(list);
        }

        const sortByToy = () => {
            const list = [];
            listProduct?.map(toy => {
                toy.categoryProduct.map(cate => {
                    if (cate?.category.categoryName === 'Toy')
                        list.push(toy);
                })
            })
            console.log(list);
            setListToy(list);
        }

        if (listProduct) {
            sortByCage();
            sortByFood();
            sortByToy();
        }
    }, [listProduct]);
    //listProduct
    if (action === 'view-product') {
        return (
            <div className="product-manager-page">
                {listCage?.length > 0 ? (
                    <div>
                        <h2 className="product-manager-page-title">Lồng chim</h2>
                        {listCage.map(cage => (
                            <div className="product-manager-page-section" key={cage.productId}>
                                <h3 className="product-name">{cage.productName}</h3>
                                <div className="product-info">
                                    <div className="product-img">
                                        <img src={cage?.image[0]?.imageUrl} alt="cage" />
                                    </div>
                                    <div className="product-description">
                                        <p className="product-description-title">Mô tả sản phẩm</p>
                                        <p>{cage.description}</p>
                                    </div>
                                    <div className="quantity-and-price">
                                        <p>Đang có {cage.quantity} sản phẩm</p>
                                        <p>Giá tiền ${cage.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <h2 className="product-manager-page-title">Lồng chim</h2>
                        <h4>Không có sản phẩm</h4>
                    </div>
                )}
                {listFood?.length > 0 ? (
                    <div>
                        <h2 className="product-manager-page-title">Thức ăn cho chim</h2>
                        {listFood?.map(food => (
                            <div className="product-manager-page-section" key={food.productId}>
                                <h3 className="product-name">{food.productName}</h3>
                                <div className="product-info">
                                    <div className="product-img">
                                        <img src={food?.image[0]?.imageUrl} alt="avatar" />
                                    </div>
                                    <div className="product-description">
                                        <p className="product-description-title">Mô tả sản phẩm</p>
                                        <p>{food.description}</p>
                                    </div>
                                    <div className="quantity-and-price">
                                        <p>Đang có {food.quantity} sản phẩm</p>
                                        <p>Giá tiền ${food.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <h2 className="product-manager-page-title">Thức ăn cho chim</h2>
                        <h4>Không có sản phẩm</h4>
                    </div>
                )}
                {listToy?.length > 0 ? (
                    <div>
                        <h2 className="product-manager-page-title">Phụ kiện - Đồ chơi</h2>
                        {listToy?.map(toy => (
                            <div className="product-manager-page-section" key={toy.productId}>
                                <h3 className="product-name">{toy.productName}</h3>
                                <div className="product-info">
                                    <div className="product-img">
                                        <img src={toy?.image[0]?.imageUrl} alt="avatar" />
                                    </div>
                                    <div className="product-description">
                                        <p className="product-description-title">Mô tả sản phẩm</p>
                                        <p>{toy.description}</p>
                                    </div>
                                    <div className="quantity-and-price">
                                        <p>Đang có {toy.quantity} sản phẩm</p>
                                        <p>Giá tiền ${toy.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <h2 className="product-manager-page-title">Phụ kiện - Đồ chơi</h2>
                        <h4>Không có sản phẩm</h4>
                    </div>
                )}
            </div>

        )
    }

    if (action === 'edit-product') {
        return (
            <div className="product-manager-page">
                {listCage?.length > 0 ? (
                    <div>
                        <h2 className="product-manager-page-title">Lồng chim</h2>
                        {listCage?.map(cage => {
                            return (
                                <div className="product-manager-page-section" key={cage.productId}>
                                    <div className="product-manager-page-section-header">
                                        <h3 className="product-name">{cage.productName}</h3>
                                        <div className="role-page-edit-button">
                                            <button className="update-button"><FaRegEdit /></button>
                                            <button className="remove-button" onClick={() => handleDelete(cage.productId)}><FaTrashAlt /></button>
                                        </div>
                                    </div>
                                    <div className="product-info">
                                        <div className="product-img">
                                            <img src={cage?.image[0]?.imageUrl} alt="avatar" />
                                        </div>
                                        <div className="product-description">
                                            <p className="product-description-title">Mô tả sản phẩm</p>
                                            <p>{cage.description}</p>
                                        </div>
                                        <div className="quantity-and-price">
                                            <p>Đang có {cage.quantity} sản phẩm</p>
                                            <p>Giá tiền ${cage.price}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div>
                        <h2 className="product-manager-page-title">Lồng chim</h2>
                        <h4>Không có sản phẩm</h4>
                    </div>
                )}

                {listFood?.length > 0 ? (
                    <div>
                        <h2 className="product-manager-page-title">Thức ăn cho chim</h2>
                        {listFood?.map(food => {
                            return (
                                <div className="product-manager-page-section" key={food.productId}>
                                    <div className="product-manager-page-section-header">
                                        <h3 className="product-name">{food.productName}</h3>
                                        <div className="role-page-edit-button">
                                            <button className="update-button"><FaRegEdit /></button>
                                            <button className="remove-button" onClick={() => handleDelete(food.productId)}><FaTrashAlt /></button>
                                        </div>
                                    </div>
                                    <div className="product-info">
                                        <div className="product-img">
                                            <img src={food?.image[0]?.imageUrl} alt="avatar" />
                                        </div>
                                        <div className="product-description">
                                            <p className="product-description-title">Mô tả sản phẩm</p>
                                            <p>{food.description}</p>
                                        </div>
                                        <div className="quantity-and-price">
                                            <p>Đang có {food.quantity} sản phẩm</p>
                                            <p>Giá tiền ${food.price}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div>
                        <h2 className="product-manager-page-title">Lồng chim</h2>
                        <h4>Không có sản phẩm</h4>
                    </div>
                )}

                {listToy?.length > 0 ? (
                    <div>
                        <h2 className="product-manager-page-title">Phụ kiện - Đồ chơi</h2>
                        {listToy?.map(toy => (
                            <div className="product-manager-page-section" key={toy.productId}>
                                <div className="product-manager-page-section-header">
                                    <h3 className="product-name">{toy?.productName}</h3>
                                    <div className="role-page-edit-button">
                                        <button className="update-button"><FaRegEdit /></button>
                                        <button className="remove-button" onClick={() => handleDelete(toy.productId)}><FaTrashAlt /></button>
                                    </div>
                                </div>
                                <div className="product-info">
                                    <div className="product-img">
                                        <img src={toy?.image[0].imageUrl} alt="avatar" />
                                    </div>
                                    <div className="product-description">
                                        <p className="product-description-title">Mô tả sản phẩm</p>
                                        <p>{toy.description}</p>
                                    </div>
                                    <div className="quantity-and-price">
                                        <p>Đang có {toy.quantity} sản phẩm</p>
                                        <p>Giá tiền ${toy.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <h2 className="product-manager-page-title">Lồng chim</h2>
                        <h4>Không có sản phẩm</h4>
                    </div>
                )}
            </div>
        )
    }
}

export default ProductPage;