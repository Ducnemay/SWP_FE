import React, { Fragment } from 'react'
import Carousel from '../components/carousel/Carousel'
import Article from '../components/article/Article'
import Slider from '../components/slider/Slider'

function UserPage() {
    return (
        <Fragment>
            <Slider />
            <div className="home-page-carousel-section">
                <h3>Loài chim</h3>
                <Carousel className="Bird" />
                <h3>Lồng chim</h3>
                <Carousel className="Product" />
                <h3>Phụ kiện - Đồ chơi</h3>
                <Carousel className="Toy" />
            </div>
            <Article />
        </Fragment>
    )
}

export default UserPage