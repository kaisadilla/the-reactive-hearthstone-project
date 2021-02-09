import React from 'react';
import CardToken from '../CardToken';

class DeckDisplayView extends React.Component {
    
    render () {
        return (
            <div className="deck-view">
                <div className="deck-hero">
                    <div className="deck-hero-frame">
                        <img src="https://art.hearthstonejson.com/v1/512x/HERO_08.jpg" />
                        <div className="deck-name">
                            <input type="text" id="deck-name" placeholder="New deck" value={"New deck"} maxlength="20"/>
                        </div>
                    </div>
                </div>
                <div className="deck-cards" onDrop={void(0)} onDragOver={void(0)}>
                    <CardToken />
                </div>
            </div>
        );
    }
}

export default DeckDisplayView;