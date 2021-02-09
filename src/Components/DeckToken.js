import React from 'react';
import HsData from '../Logic/HsData';
import HsDB from '../Logic/HsDB';

class DeckToken extends React.Component {

    purgeDeckToHell () {
        HsDB.deleteDeck(this.props.deck.id);
    }

    render () {
        let deck = this.props.deck;
        return (
            <div className="deck-token">
                <a className="deck-name" href={`deck-viewer/${deck.id}`}>
                    <img className="tile" src={`https://art.hearthstonejson.com/v1/512x/${HsData.getHeroImgId(deck.class)}.jpg`} />
                    <span className={`tile-fade-out ${deck.class}`}></span>
                    <span className="caption">{deck.name}</span>
                </a>
                <a className="deck-remove" href={void(0)} onClick={() => this.purgeDeckToHell()}>
                    <span className="material-icons">clear</span>
                </a>
            </div>
        );
    }
}

export default DeckToken;