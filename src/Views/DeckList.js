import React from 'react';
import DeckContainerList from '../Components/Decks/DeckContainerList';
import DeckFilterPanel from '../Components/Decks/DeckFilterPanel';
import HsDB from '../Logic/HsDB';

class DeckList extends React.Component {
    constructor () {
        super();

        this.state = {
            dbOpen: false,
            decks: [],
        }
    }

    componentDidMount () {
        document.title = "My decks – the Hearthstone project";
        HsDB.openDatabase().then(() => this.setState({
            dbOpen: true,
        }));
        setInterval(() => retrieveDecks(this), 200);
    }

    componentDidUpdate () {
        /*if (this.state.dbOpen && this.state.decks.length === 0) {
            retrieveDecks(this);
        }*/
    }

    retrieveDecks (thisClass) {
        if (this.state.dbOpen) {
            HsDB.getAllDecks().then(res => thisClass.setState({
                decks: res,
            }));
        }
    }
    
    createDeck() {
        deck = {
            class: "MAGE",
            cards: []
        }
    }

    render() {
        return (
            <div>
                <DeckFilterPanel />
                <main className="left-aside">
                    <button className="action-btn" onClick={void(0)}>New deck</button>
                    <DeckContainerList decks={this.state.decks} />
                </main>
            </div>
        );
    }
}

export default DeckList;