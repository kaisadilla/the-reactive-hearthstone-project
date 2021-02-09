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

    componentDidUpdate () {
        if (this.state.dbOpen && this.state.decks.length === 0) {
            retrieveDecks(this);
            setInterval(() => retrieveDecks(this), 200);
        }

        function retrieveDecks (thisClass) {
            HsDB.getAllDecks().then(res => thisClass.setState({
                decks: res,
            }));
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