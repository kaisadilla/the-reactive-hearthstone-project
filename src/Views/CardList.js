import React from 'react';
import CardFilterPanel from "../Components/Cards/CardFilterPanel";
import CardNavBar from "../Components/Cards/CardNavBar";
import CardContainerGallery from '../Components/Cards/CardContainerGallery';
import CardContainerList from '../Components/Cards/CardContainerList';
//import SearchIcon from "@material-ui/icons/SearchIcon";

class CardList extends React.Component {
    constructor () {
        super();
        this.setToggledFilter = this.setToggledFilter.bind(this);
        this.setState = this.setState.bind(this);
        this.state = {
            display: "list",
            chosenExp: "null",
            nameQuery: "",
            filterClass: [],
            filterCost: [],
            filterRarity: [],
            filterType: [],
            filterTribe: [],
        };
    }

    componentDidMount () {
        document.title = "Card list – the Hearthstone project";
    }

    setToggledFilter (filterName, value) {
        if (this.state[filterName].includes(value)) {
            let newFilter = this.state[filterName].filter(c => c !== value);
            this.setState({
                [filterName]: newFilter
            });
        }
        else {
            this.setState(prev => ({
                [filterName]: [...prev[filterName], value]
            }));
        }
    }

    render () {
        let filters = {
            nameQuery: this.state.nameQuery,
            cardClass: this.state.filterClass,
            cost: this.state.filterCost,
            rarity: this.state.filterRarity,
            type: this.state.filterType,
            tribe: this.state.filterTribe,
        }

        let displayComponent;
        if (this.state.display === "list") {
            displayComponent = <CardContainerList chosenExp={this.state.chosenExp} filters={filters} />;
        }
        else {
            displayComponent = <CardContainerGallery chosenExp={this.state.chosenExp} filters={filters} />;
        }

        return (
            <div>
                <CardFilterPanel displayMode="select"
                    cardDisplay={this.state.display}
                    filters={filters} setToggledFilter={this.setToggledFilter} setParentState={this.setState}
                />
                <main className="left-aside">
                    <CardNavBar setParentState={this.setState} />
                    {displayComponent}
                </main>
            </div>
        );
    }
}

export default CardList;