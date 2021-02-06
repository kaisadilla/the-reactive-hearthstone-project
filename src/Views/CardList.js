import React from 'react';
import FilterPanel from "../Components/Cards/FilterPanel";
//import SearchIcon from "@material-ui/icons/SearchIcon";

class CardList extends React.Component {
    render () {
        return (
            <div>
                <FilterPanel />
                <main className="left-aside">
                    <div className="card-filters">
                        <div className="search-card">
                            <input type="text" id="search-query" placeholder="Search: Arcane Intellect…" oninput="filterByName()"/>
                            <span class="material-icons">search</span>
                        </div>
                        <div class="filter-exp">
                            <select id="exp-menu" onchange="displayExpansion()">
                                <option selected value> -- Choose an expansion -- </option>
                            </select>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default CardList;