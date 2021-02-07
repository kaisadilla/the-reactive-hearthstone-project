import React from 'react';
import DeckToken from '../DeckToken';

class DeckContainerList extends React.Component {
    render () {
        return (
            <div className="deck-list">
                <DeckToken />
            </div>
        );
    }
}

export default DeckContainerList;