import React from 'react';

class DeckToken extends React.Component {
    render () {
        return (
            <div className="deck-token">
                <a className="deck-name" href={void(0)}>
                    <img className="tile" src="https://art.hearthstonejson.com/v1/512x/HERO_08.jpg" />
                    <span className="tile-fade-out DEMONHUNTER"></span>
                    <span className="caption">Wichiwachi Mage</span>
                </a>
                <a className="deck-remove" href={void(0)}>
                    <span className="material-icons">clear</span>
                </a>
            </div>
        );
    }
}

export default DeckToken;