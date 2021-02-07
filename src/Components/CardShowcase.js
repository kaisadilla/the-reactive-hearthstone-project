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
    state = {  }
    render () {
        //let card = HsData.getCardById(this.props.cardId);
        return (
            <a className="gallery-card-item" href={`card-info/${this.state.card["id"]}`} target="_blank">
                <img className="card-showcase" src={`https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${this.state.card["id"]}.png`} />
            </a>
        );
    }
}

export default CardShowcase;