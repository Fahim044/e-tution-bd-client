import React from 'react';
import Header from './Header';
import LatestTutions from './LatestTutions';
import LatestTutors from './LatestTutors';
import HowItWorks from './HowItWorks';
import WhyChooseUs from './WhyChooseUs';

const Home = () => {
    return (
        <div>
        <Header></Header>
        <LatestTutions></LatestTutions>
        <LatestTutors></LatestTutors>
        <HowItWorks></HowItWorks>
        <WhyChooseUs></WhyChooseUs>
        </div>
    );
};

export default Home;