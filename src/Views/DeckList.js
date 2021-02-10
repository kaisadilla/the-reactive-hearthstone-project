import React from 'react';
import CreateDeckForm from '../Components/CreateDeckForm';
import DeckContainerList from '../Components/Decks/DeckContainerList';
import DeckFilterPanel from '../Components/Decks/DeckFilterPanel';
import HsDB from '../Logic/HsDB';

class DeckList extends React.Component {
    constructor () {
        super();
        this.openNewDeckForm = this.openNewDeckForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.createDeck = this.createDeck.bind(this);

        this.state = {
            dbOpen: false,
            decks: [],
            createDeckForm: false,
        }
    }

    componentDidMount () {
        document.title = "My decks – the Hearthstone project";
        HsDB.openDatabase().then(() => this.setState({
            dbOpen: true,
        }));
        setInterval(() => this.retrieveDecks(this), 200);
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
        HsDB.insertDeck(deck);
    }

    render() {
        return (
            <div>
                <DeckFilterPanel />
                <main className="left-aside">
                    <button className="action-btn" onClick={this.openNewDeckForm}>New deck</button>
                    <DeckContainerList decks={this.state.decks} />
                </main>
                {this.state.createDeckForm && <CreateDeckForm createDeck={this.createDeck} closeForm={this.closeForm} />}
            </div>
        );
    }
}

export default DeckList;