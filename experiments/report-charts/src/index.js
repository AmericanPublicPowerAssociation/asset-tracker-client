import React from 'react';
import ReactDOM from 'react-dom';
import Histogram from './components/Histogram';
import PieChart from './components/PieChart';
import Sunburst from './components/Sunburst';


ReactDOM.render(
    <div>
        <Histogram />
        <PieChart />
        <Sunburst />
    </div>,
    document.getElementById('root')
);