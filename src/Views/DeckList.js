import React from 'react';
import CreateDeckForm from '../Components/CreateDeckForm';
import DeckContainerList from '../Components/Decks/DeckContainerList';
import DeckFilterPanel from '../Components/Decks/DeckFilterPanel';
import HsDB from '../Logic/HsDB';
import { useHistory } from "react-router-dom";

class DeckList extends React.Component {
    constructor () {
        super();
        this.openNewDeckForm = this.openNewDeckForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.createDeck = this.createDeck.bind(this);
        this.setToggledFilter = this.setToggledFilter.bind(this);
        this.retrieveDecks = this.retrieveDecks.bind(this);
        this.updateInterval = undefined;

        this.state = {
            decks: [],
            createDeckForm: false,
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

    openNewDeckForm () {
        this.setState({
            createDeckForm: true, 
        })
    }

    closeForm () {
        this.setState({
            createDeckForm: false,
        })
    }
    
    createDeck (deck) {
        this.closeForm();
        HsDB.insertDeck(deck).then((res) => {
            this.props.history.push(`/deck-viewer/${res}`)
        });
    }

    render() {
        let filters = {
            deckClass: this.state.filterClass,
        }
        return (
            <div>
                <DeckFilterPanel setToggledFilter={this.setToggledFilter} filters={filters} />
                <main className="left-aside">
                    <button className="action-btn" onClick={this.openNewDeckForm}>New deck</button>
                    <DeckContainerList decks={this.state.decks} filters={filters} />
                </main>
                {this.state.createDeckForm && <CreateDeckForm createDeck={this.createDeck} closeForm={this.closeForm} />}
            </div>
        );
    }
}

export default DeckList;