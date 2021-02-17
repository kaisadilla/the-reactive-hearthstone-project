import React from 'react';
import DeckToken from '../DeckToken';

class DeckContainerList extends React.Component {

    getAllDeckElements () {
        const decks = [];

        for (const deck of this.props.decks) {
            if (!this.props.filters || this.props.filters.deckClass.length === 0 || this.props.filters.deckClass.includes(deck.class)) {
                decks.push(<DeckToken deck={deck} key={deck.id}/>);
            }
        }
        return decks;
    }

    render () {
        return (
            <div className="deck-list">
                <h1>Decks containing this card:</h1>
                {this.getAllDeckElements()}
            </div>
        );
    }
}

export default DeckContainerList;