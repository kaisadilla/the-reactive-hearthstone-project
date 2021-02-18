import React from 'react';
import CreateDeckForm from '../Components/CreateDeckForm';
import DeckContainerList from '../Components/Decks/DeckContainerList';
import DeckFilterPanel from '../Components/Decks/DeckFilterPanel';
import HsDB from '../Logic/HsDB';
import { useHistory } from "react-router-dom";
import DeckCodeForm from '../Components/Decks/DeckCodeForm';

class DeckList extends React.Component {
    constructor () {
        super();
        this.closeForm = this.closeForm.bind(this);
        this.createDeck = this.createDeck.bind(this);
        this.importCode = this.importCode.bind(this);
        this.setToggledFilter = this.setToggledFilter.bind(this);
        this.retrieveDecks = this.retrieveDecks.bind(this);
        this.updateInterval = undefined;

        this.state = {
            decks: [],
            deckFormDialog: false,
            filterClass: [],
        }
    }

    componentDidMount () {
        document.title = "My decks – the Hearthstone project";
        this.updateInterval = setInterval(this.retrieveDecks, 200);
    }

    componentWillUnmount () {
        clearInterval(this.updateInterval);
    }

    retrieveDecks () {
        if (typeof HsDB.db != "undefined") {
            HsDB.getAllDecks().then(res => this.setState({
                decks: res,
            }));
        }
    }

    /**
     * Toggles a value for the given filter on or off. If the value is present in the given filter, it will be removed.
     * If it's not, it will be added.
     * @param {*} filterName The filter in which to add or remove the value.
     * @param {*} value The value to add or remove.
     */
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

    closeForm () {
        this.setState({
            deckFormDialog: false,
        })
    }
    
    // creates a deck and redirects the browser to that deck's page.
    createDeck (deck) {
        this.closeForm();
        HsDB.insertDeck(deck).then(res => this.props.history.push(`/deck-viewer/${res}`));
    }

    // creates a deck with the given code and redirects the browser to that deck's page.
    importCode (deck) {
        let dbDeck = {
            name: "New deck",
            class: deck.class,
            cards: deck.cards,
        }
        HsDB.insertDeck(dbDeck).then(res => this.props.history.push(`/deck-viewer/${res}`));
    }

    render() {
        let filters = {
            deckClass: this.state.filterClass,
        }
        return (
            <div>
                <DeckFilterPanel setToggledFilter={this.setToggledFilter} filters={filters} />
                <main className="left-aside">
                    <button className="large-btn btn-action" onClick={() => {this.setState({deckFormDialog: "create"})}}>New deck</button>
                    <button className="large-btn btn-import" onClick={() => {this.setState({deckFormDialog: "import"})}}>Import deck</button>
                    <DeckContainerList decks={this.state.decks} filters={filters} />
                </main>
                {this.state.deckFormDialog === "create" && <CreateDeckForm createDeck={this.createDeck} closeForm={this.closeForm} />}
                {this.state.deckFormDialog === "import" && <DeckCodeForm mode="import" onImport={this.importCode} closeForm={this.closeForm} />}
            </div>
        );
    }
}

export default DeckList;