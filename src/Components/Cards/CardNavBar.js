import React from 'react';
import HsData from '../../Logic/HsData';

class CardNavBar extends React.Component {
    state = {  }
    render () {
        const expansions = [];
        for (const e in HsData.expansions) {
            expansions.push(<option value={e} key={e}>{HsData.expansions[e]["name"]}</option>);
        }

        return (
            <div className="card-filters">
                <div className="search-card">
                    <input type="text" id="search-query" placeholder="Search: Arcane Intellect…" onInput={void(0)}/>
                    <span className="material-icons">search</span>
                </div>
                <div className="filter-exp">
                    <select id="exp-menu" onChange={evt => this.props.displayExpansion(evt.target.value)} defaultValue="default">
                        <option value="null"> -- Choose an expansion -- </option>
                        {expansions}
                    </select>
                </div>
            </div>
        );
    }
}

export default CardNavBar;