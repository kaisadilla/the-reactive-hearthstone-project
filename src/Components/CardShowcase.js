import React from 'react';
import HsData from '../Logic/HsData';

class CardShowcase extends React.Component {
    constructor (props) {
        super ();
        let card = HsData.getCardById(props.cardId);
        this.state = {
            card: card
        }
    }
    render () {
        let card = this.state.card;
        return (
            <a className="gallery-card-item" href={`card-info/${card["id"]}`} target="_blank">
                <img className={`card-showcase ${card["type"] === "HERO" && "hero-pos"}`} src={`https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${card["id"]}.png`} />
            </a>
        );
    }
}

export default CardShowcase;