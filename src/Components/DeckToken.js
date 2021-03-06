import React from 'react';
import { Link } from 'react-router-dom';
import HsData from '../Logic/HsData';
import HsDB from '../Logic/HsDB';

class DeckToken extends React.Component {

    //TODO: This has a stupid mage so I don't forget to add a notification later. Probably.
    purgeDeckToHell () {
        HsDB.deleteDeck(this.props.deck.id);
    }

    render () {
        let deck = this.props.deck;
        return (
            <div className="deck-token">
                <Link className="deck-name" to={`${process.env.PUBLIC_URL}/deck-viewer/${deck.id}`}>
                    <img className="tile" src={`https://art.hearthstonejson.com/v1/512x/${HsData.getClassHeroId(deck.class)}.jpg`} />
                    <span className={`tile-fade-out ${deck.class}`}></span>
                    <span className="caption">{deck.name}</span>
                </Link>
                <a className="deck-remove" href={void(0)} onClick={() => this.purgeDeckToHell()}>
                    <span className="material-icons">clear</span>
                </a>
            </div>
        );
    }
}

export default DeckToken;