import React from 'react';
import { CircularGridLines, LabelSeries, LineSeries, VerticalBarSeries, VerticalGridLines, XAxis, XYPlot, YAxis } from 'react-vis';

class Stores extends React.Component {
    render () {
        const data = [
            {x: "Kevin", y: 35},
            {x: "Wrw", y: 6},
            {x: "afds", y: 41},
            {x: "shf", y: 22},
            {x: "shfahsh", y: 15},
            {x: "faf", y: 15},
            {x: "gsgs", y: 21},
            {x: "gsgs", y: 33},
        ]
        return (
            <XYPlot xType="ordinal" width={800} height={500} yDomain={[0, 50]}>
                <VerticalBarSeries data={data} />
                <XAxis />
                <YAxis />
                <LabelSeries data={data.map(o => {return {...o, label: o.y.toString()}})}/>
                <VerticalGridLines width={800} height={500} tickValues={[5, 10, 15, 20]}/>
            </XYPlot>
        );
    }
}

export default Stores;