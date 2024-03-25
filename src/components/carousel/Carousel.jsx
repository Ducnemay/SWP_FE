import React, { useEffect, useState } from 'react';
import api from '../../components/utils/requestAPI';
import axios from 'axios'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './Carousel.css'
import { Link } from 'react-router-dom';

const Carousel = ({ className }) => {

    const [birdData, setBirdData] = useState();
    const [productData, setProductData] = useState();
    const [toyData, setToyData] = useState();


    useEffect(() => {
        if (className === 'Bird') {
            const fetchData = async () => {
                try {
                    await api.get('/api/Bird/get-for-sort', {
                        headers: {
                            'accept': '*/*'
                        }
                    }).then(response => {
                        console.log(response)
                        setBirdData(response.data);
                    });
                } catch (error) {
                    console.error(error);
                }
            };

            fetchData();
        }
        if (className === 'Product') {
            const fetchData = async () => {
                try {
                    await api.get('api/Product/get-by-category?categoryId=Cate90fb2', {
                        headers: {
                            'accept': '*/*'
                        }
                    }).then(response => {
                        console.log(response)
                        setProductData(response.data);
                    });
                } catch (error) {
                    console.error(error);
                }
            };
            fetchData();
        }
        if (className === 'Toy') {
            const fetchData = async () => {
                try {
                    await api.get('/api/Product/get-by-category?categoryId=Catef5d6d', {
                        headers: {
                            'accept': '*/*'
                        }
                    }).then(response => {
                        console.log(response)
                        setToyData(response.data);
                    });
                } catch (error) {
                    console.error(error);
                }
            };
            fetchData();
        }
    }, [])
    const options = {
        items: 5, // Number of items to display
        autoplay: true, // Autoplay enabled
        autoplayTimeout: 2000, // Autoplay interval in milliseconds
        autoplayHoverPause: true, // Pause autoplay on hover
        loop: true, // Enable infinite loop
        nav: true, // Show navigation arrows
        dots: false,
        navClass: ["switch-icon-prev", "switch-icon-next"]
    };
    if (className === 'Bird') {
        return (
            <OwlCarousel className={className} {...options}>
                {birdData?.map(bird => (
                    <Link href={`/bird/${bird.birdId}`} className="bird-carousel-item" key={bird.birdId}>
                        {bird.image.map(image => (
                            <img src={image.imageUrl} alt={bird.birdName} key={image.imageId} />
                        ))}
                        <h4>{bird.birdName}</h4>
                    </Link>
                ))}
            </OwlCarousel>
        );
    }
    if (className === 'Product') {
        return (
            <OwlCarousel className={className} {...options}>
                {productData?.map(product => (
                    <Link href={`/cage/${product.productId}`} className="product-carousel-item" key={product.productId}>
                        {product.image.map(image => (
                            <img src={image.imageUrl} alt={product.productName} key={image.imageId} />
                        ))}
                        <h4>{product.productName}</h4>
                    </Link>
                ))}
            </OwlCarousel>
        );
    }
    if (className === 'Toy') {
        return (
            <OwlCarousel className={className} {...options}>
                {toyData?.map(toy => (
                    <Link href={`/bird/${toy.productId}`} className="product-carousel-item" key={toy.productId}>
                        {toy.image.map(image => (
                            <img src={image.imageUrl} alt={toy.productName} key={image.imageId} />
                        ))}
                        <h4>{toy.productName}</h4>
                    </Link>
                ))}
            </OwlCarousel>
        );
    }
};

export default Carousel;
