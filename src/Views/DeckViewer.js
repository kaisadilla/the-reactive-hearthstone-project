import React from 'react';
import CardFilterPanel from '../Components/Cards/CardFilterPanel';
import CardNavBar from '../Components/Cards/CardNavBar';
import DeckDisplayView from '../Components/Decks/DeckDisplayView';
import HsDB from '../Logic/HsDB';

class DeckViewer extends React.Component {
    constructor () {
        super();
        /*let deckId = window.location.pathname.split("/").pop();
        HsDB.openDatabase().then(() => HsDB.getDeckById(deckId).then(res => {
            this.setState({
                deck: res,
            });
        }));*/

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
        this.setToggledFilter = this.setToggledFilter.bind(this);
        this.setState = this.setState.bind(this);
    }

    componentDidMount () {
        document.title = "Deck viewer – the Hearthstone project";
        HsDB.openDatabase().then(() => this.setState({
            dbOpen: true,
        }));
    }

    componentDidUpdate () {
        /*if (this.state.dbOpen) {
            HsDB.getDeckById(3).then(res => console.log(res));
        }*/
        if (this.state.dbOpen && !this.state.deck) {
            let deckId = parseInt(window.location.pathname.split("/").pop());
            HsDB.getDeckById(deckId).then(res => this.setState({
                deck: res,
            }));
        }
        if (this.state.deck) {
            console.log(this.state.deck);
            document.title = `${this.state.deck.name} - the Hearthstone project`;
        }
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

        return (
            <div>
                <CardFilterPanel
                    displayMode="list" filters={filters}
                    setToggledFilter={this.setToggledFilter} setParentState={this.setState}
                />
                <main className="left-aside right-aside">
                    <CardNavBar setParentState={this.setState} />
                </main>
                {this.state.deck && <DeckDisplayView deck />}
            </div>
        );
    }
}

export default DeckViewer;