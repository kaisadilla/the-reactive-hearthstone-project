import React from 'react';
import { CircularGridLines, LabelSeries, LineSeries, VerticalBarSeries, VerticalGridLines, XAxis, XYPlot, YAxis } from 'react-vis';
import HsData from '../Logic/HsData';

class CardChart extends React.Component {
    render () {
        const minionsPerCost = new Array(11).fill(0);
        const spellsPerCost = new Array(11).fill(0);
        const othersPerCost = new Array(11).fill(0);
        const totalPerCost = new Array(11).fill(0);

        for (let c of this.props.cards) {
            const card = HsData.getCardById(c);
            const cost = card["cost"] <= 10 ? card["cost"] : 10;
            totalPerCost[cost]++;
            if      (card["type"] === "MINION") minionsPerCost[cost]++;
            else if (card["type"] === "SPELL") spellsPerCost[cost]++;
            else othersPerCost[cost]++;
        }

        const minionsData = [], spellsData = [], othersData = [];
        for (let i = 0; i < totalPerCost.length; i++) {
            minionsData.push({x: i.toString(), y: minionsPerCost[i]});
            spellsData.push({x: i.toString(), y: spellsPerCost[i]});
            othersData.push({x: i.toString(), y: othersPerCost[i]});
        }

        const labels = totalPerCost.map((val, index) => {
            return {
                x: index,
                y: totalPerCost[index],
                label: totalPerCost[index] > 0 ? totalPerCost[index] : "",
            }
        });

        return (
            <div className="mana-chart">
                <XYPlot xType="ordinal" width={this.props.width} height={this.props.height} yDomain={[0, totalPerCost.reduce((acc, val) => val > acc ? val : acc)]} stackBy="y">
                    <VerticalBarSeries data={minionsData} color="#018db8" />
                    <VerticalBarSeries data={spellsData} color="#27bae7" />
                    <VerticalBarSeries data={othersData} color="#6ed5f4" />
                    <XAxis />
                    <YAxis tickFormat={val => Math.round(val) === val ? val : ""}/>
                    <LabelSeries className="strut" data={labels}/>
                    <VerticalGridLines />
                </XYPlot>
                <div className="legend">
                    <div className="entry">
                        <span className="color" style={{backgroundColor: "#018db8"}}></span>
                        <span className="label">Minions</span>
                    </div>
                    <div className="entry">
                        <span className="color" style={{backgroundColor: "#27bae7"}}></span>
                        <span className="label">Spells</span>
                    </div>
                    <div className="entry">
                        <span className="color" style={{backgroundColor: "#6ed5f4"}}></span>
                        <span className="label">Other</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default CardChart;