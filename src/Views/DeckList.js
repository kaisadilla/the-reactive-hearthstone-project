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
    }

    componentDidUpdate (prevProps, prevState) {
        if (this.state.dbOpen && this.state.decks.length === 0) {
            HsDB.getAllDecks().then(res => this.setState({
                decks: res,
            }));
        }
        else if (this.state.decks.length > 0) {
            console.log(`Decks found in the database: ${this.state.decks.length}`);
        }
    }

    testWhat() {
        let obj = HsDB.SayWhat().then(val => console.log(val));
    }

    render() {
        return (
            <div>
                <DeckFilterPanel />
                <main className="left-aside">
                    <DeckContainerList decks={this.state.decks} />
                </main>
            </div>
        );
    }
}

export default DeckList;