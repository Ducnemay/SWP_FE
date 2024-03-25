import React, { useEffect, useState } from "react";
import "./ComboBox.css"
import api from "../utils/requestAPI";

const ComboBox = ({ classname, onChange }) => {
    const [selected, setSelected] = useState('');
    const [listSize, setListSize] = useState(null);
    const [listMaterial, setListMaterial] = useState(null);
    const [listColor, setListColor] = useState(null);
    const priceOptions = [
        'Tăng dần',
        'Giảm dần',
    ];

    const handleChangeSelect = (e) => {
        setSelected(e.target.value);
        onChange(e.target.value);
    };

    const fetchDataSize = async () => {
        const url = '/api/Size/get';
        try {
            const response = await api.get(url);
            console.log(response.data);
            setListSize(response.data);
        } catch (error) {
            console.error(error)
        }
    }

    const fetchDataMaterial = async () => {
        const url = '/api/Material/get-all'
        try {
            const response = await api.get(url);
            console.log(response.data);
            setListMaterial(response.data);
        } catch (error) {
            console.error(error)
        }
    }

    const fetchDataColor = async () => {
        const url = '/api/Color/get-all'
        try {
            const response = await api.get(url);
            console.log(response.data);
            setListColor(response.data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchDataSize();
        fetchDataMaterial();
        fetchDataColor();
    }, [])

    if (classname === 'size') {
        return (
            <div className="combo-box-product">
                <select value={selected} onChange={handleChangeSelect}>
                    <option value="" disabled hidden selected>Chọn kích thước lồng</option>
                    {listSize?.map(size => (
                        <option key={size?.sizeId} value={size?.sizeId}>
                            {size?.size1}
                        </option>
                    ))}
                </select>
            </div>
        )
    }

    if (classname === 'material') {
        return (
            <div className="combo-box-product">
                <select value={selected} onChange={handleChangeSelect}>
                    <option value="" disabled hidden selected>Chọn chất liệu lồng</option>
                    {listMaterial?.map(material => (
                        <option key={material.materialId} value={material.materialId}>
                            {material.materialName}
                        </option>
                    ))}
                </select>
            </div>
        )
    }
    if (classname === 'color') {
        return (
            <div className="combo-box-product">
                <select value={selected} onChange={handleChangeSelect}>
                    <option value="" disabled hidden selected>Chọn màu lồng</option>
                    {listColor?.map(color => (
                        <option key={color.colorId} value={color.colorId}>
                            {color.colorName}
                        </option>
                    ))}
                </select>
            </div>
        )
    }
    else {
        return (
            <></>
            //product
            // <div className="combo-box-price">
            //     <select value={selected} onChange={e => setSelected(e.target.value)}>
            //         <option value="" disabled hidden selected>Sắp xếp theo giá</option>
            //         {priceOptions.map(priceOption => (
            //             <option key={priceOption} value={priceOption}>
            //                 {priceOption}
            //             </option>
            //         ))}
            //     </select>
            // </div>

            // size
            // <div className="combo-box-product">
            //     <select value={selected} onChange={e => setSelected(e.target.value)}>
            //         <option value="" disabled hidden selected>Chọn kích thước lồng</option>
            //         {sizeOptions.map(sizeOption => (
            //             <option key={sizeOption} value={sizeOption}>
            //                 {sizeOption}
            //             </option>
            //         ))}
            //     </select>
            // </div>

            // material
            // <div className="combo-box-product">
            //     <select value={selected} onChange={e => setSelected(e.target.value)}>
            //         <option value="" disabled hidden selected>Chọn chất liệu lồng</option>
            //         {materialOptions.map(materialOption => (
            //             <option key={materialOption} value={materialOption}>
            //                 {materialOption}
            //             </option>
            //         ))}
            //     </select>
            // </div>

            //color
            //<div className="combo-box-product">
            //    <select value={selected} onChange={e => setSelected(e.target.value)}>
            //        <option value="" disabled hidden selected>Chọn màu lồng</option>
            //        {colorOptions.map(colorOption => (
            //            <option key={colorOption} value={colorOption}>
            //                {colorOption}
            //            </option>
            //        ))}
            //    </select>
            //</div>


        )
    }
}

export default ComboBox;