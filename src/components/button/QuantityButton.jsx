import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import './QuantityButton.css'

const QuantityButton = ({ initialQuantity, onQuantityChange }) => {
    const [quantity, setQuantity] = useState(initialQuantity);

    useEffect(() => {
        setQuantity(initialQuantity);
    }, [initialQuantity]);

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            onQuantityChange(quantity - 1);
        }
    };

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
        onQuantityChange(quantity + 1);
    };

    const handleInputChange = (event) => {
        const value = event.target.value.trim();
        if (value === null || (value >= 1 && !isNaN(value))) {
            setQuantity(value === null ? 0 : parseInt(value));
        }
        if (value == 0) {
            setQuantity(null)
        } else if (value === null) {
            setQuantity(1)
        }
    };

    return (
        <div className="quantity">
            <button className="quantity-button left" onClick={decrementQuantity}><FaMinus className="quantity-icon" /></button>
            <input className="quantity-number" type="number" value={quantity} onChange={handleInputChange} />
            <button className="quantity-button right" onClick={incrementQuantity}><FaPlus className="quantity-icon" /></button>
        </div>
    );
}

export default QuantityButton;