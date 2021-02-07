import React from 'react';
import DeckContainerList from '../Components/Decks/DeckContainerList';
import DeckFilterPanel from '../Components/Decks/DeckFilterPanel';
import Database from '../Logic/Database';

class DeckList extends React.Component {
    componentDidMount () {
        Database.openDatabase();
    }

    render() {
        return (
            <div>
                <DeckFilterPanel />
                <main className="left-aside">
                    <DeckContainerList />
                </main>
            </div>
        );
    }
}

export default DeckList;