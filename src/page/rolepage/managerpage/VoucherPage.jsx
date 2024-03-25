import React, { useEffect, useState } from "react";
import "./VoucherPage.css"
import { FaTrashAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import api from "../../../components/utils/requestAPI";
import moment from "moment";

const VoucherPage = () => {

    const { action } = useParams();
    const [listVoucher, setListVoucher] = useState(null);

    const fetchData = async () => {
        const url = '/api/Voucher/get-all'
        try {
            const response = await api.get(url);
            console.log(response.data);
            setListVoucher(response.data);
        } catch (error) {
            console.error(error)
        }
    }

    const handleDelete = async (id) => {
        const url = `/api/Voucher/delete-voucher?voucherId=${id}`
        try {
            const response = await api.delete(url);
            console.log(response.data);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [handleDelete])

    if (action === 'view-voucher') {
        return (
            <div className="voucher-page">
                {listVoucher?.map(voucher => (
                    <div className="voucher-page-info">
                        <div className="voucher-info-section">
                            <h3 className="voucher-name">{voucher.voucherName}</h3>
                            <div className="voucher-page-info-des">
                                <h4 className="voucher-des-title">Mô tả</h4>
                                <p className="voucher-des">{voucher.description}</p>
                            </div>
                            <div className="voucher-page-info-discount">
                                <h4 className="voucher-discount-title">Giá trị giảm</h4>
                                <p className="voucher-discount">{voucher.discount}</p>
                            </div>
                            <div className="voucher-page-info-date">
                                <p className="voucher-date">Ngày tạo: {moment(voucher.startDate).format('DD-MM-YYYY')}</p>
                                <p className="voucher-date">Ngày hết hạn: {moment(voucher.endDate).format('DD-MM-YYYY')}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    } else {
        return (
            //xóa voucher
            <div className="voucher-page">
                {listVoucher?.map(voucher => (
                    <div className="voucher-page-info">
                        <button className="remove-button" onClick={() => handleDelete(voucher.voucherId)}><FaTrashAlt /></button>
                        <div className="voucher-info-section">
                            <h3 className="voucher-name">{voucher.voucherName}</h3>
                            <div className="voucher-page-info-des">
                                <h4 className="voucher-des-title">Mô tả</h4>
                                <p className="voucher-des">{voucher.description}</p>
                            </div>
                            <div className="voucher-page-info-discount">
                                <h4 className="voucher-discount-title">Giá trị giảm</h4>
                                <p className="voucher-discount">{voucher.discount}</p>
                            </div>
                            <div className="voucher-page-info-date">
                                <p className="voucher-date">Ngày tạo: {moment(voucher.startDate).format('DD-MM-YYYY')}</p>
                                <p className="voucher-date">Ngày hết hạn: {moment(voucher.endDate).format('DD-MM-YYYY')}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

}
export default VoucherPage;