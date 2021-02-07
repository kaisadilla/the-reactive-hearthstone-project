import React from 'react';
import HsData from '../../Logic/HsData';
import CardShowcase from '../CardShowcase';

class CardContainerGallery extends React.Component {
    state = {  }
    render () {
        const cards = [];
        const chosenExp = this.props.chosenExp;
        for (const c of HsData.collectibleCards) {
            if ((chosenExp === "all" || c["set"] === chosenExp) && c["text"] !== undefined) {
                cards.push(<CardShowcase cardId={c["id"]} key={c["id"]} />);
            }
        }

        return (
            <div className="card-container-gallery" id="card-gallery">
                {cards}
            </div>
        );
    }
}

export default CardContainerGallery;