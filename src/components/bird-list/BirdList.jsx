import React from 'react';
import './BirdList.css'; // Import the CSS file

const BirdList = () => {
    return (
        <div className="list-item">

            <a href='/home' className="item">
                <img src="bocau.jpg" alt="Item 1" />
                <h4>Item 1</h4>
            </a>
            <a href='/home' className="item">
                <img src="bocau.jpg" alt="Item 2" />
                <h4>Item 1</h4>
            </a>
            <a href='/home' className="item">
                <img src="bocau.jpg" alt="Item 3" />
                <h4>Item 1</h4>
            </a>
            <a href='/home' className="item">
                <img src="bocau.jpg" alt="Item 4" />
                <h4>Item 1</h4>
            </a>

            <a href='/home' className="item">
                <img src="sao.jpg" alt="Item 5" />
                <h4>Item 1</h4>
            </a>
            <a href='/home' className="item">
                <img src="sao.jpg" alt="Item 6" />
                <h4>Item 1</h4>
            </a>
            <a href='/home' className="item">
                <img src="sao.jpg" alt="Item 7" />
                <h4>Item 1</h4>
            </a>
            {/* <a className="item">
                    <img src="sao.jpg" alt="Item 8" />
                    <h4>Item 1</h4>
                </a> */}
        </div>
    );
}

export default BirdList;
