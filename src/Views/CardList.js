import React from 'react';
import FilterPanel from "../Components/Cards/FilterPanel";
import CardNavBar from "../Components/Cards/CardNavBar";
import CardContainerGallery from '../Components/Cards/CardContainerGallery';
//import SearchIcon from "@material-ui/icons/SearchIcon";

class CardList extends React.Component {
    constructor () {
        super();
        this.displayExpansion = this.displayExpansion.bind(this);
        this.state = {
            chosenExp: "null"
        };
    }

    displayExpansion (expId) {
        this.setState({
            chosenExp: expId
        })
    }

    render () {
        return (
            <div>
                <FilterPanel />
                <main className="left-aside">
                    <CardNavBar displayExpansion={this.displayExpansion}/>
                    <CardContainerGallery chosenExp={this.state.chosenExp}/>
                </main>
            </div>
        );
    }
}

export default CardList;