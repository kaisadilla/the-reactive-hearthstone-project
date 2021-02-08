import React from 'react';
import DeckToken from '../DeckToken';

class DeckContainerList extends React.Component {

    getAllDeckElements () {
        const decks = [];

        for (const deck of this.props.decks) {
            decks.push(<DeckToken deck={deck} key={deck.id}/>);
        }
        return decks;
    }

    render () {
        let decks = this.getAllDeckElements();
        return (
            <div className="deck-list">
                {decks}
            </div>
        );
    }
}

export default DeckContainerList;