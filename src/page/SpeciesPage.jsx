import React, { Fragment } from 'react';
import About from '../components/about/About';
import Carousel from '../components/carousel/Carousel';
import BirdList from '../components/bird-list/BirdList';
import './SpeciesPage.css';

const SpeciesPage = () => {
    return (
        <Fragment>
            <About />
            <div className="bird-of-species-section">
                <h3>Lồng phù hợp với chim</h3>
                <BirdList />
            </div>
            <div className="different-species-carousel">
                <h3>Các loài chim khác</h3>
                <Carousel />
            </div>
        </Fragment>
    );
}

export default SpeciesPage;
