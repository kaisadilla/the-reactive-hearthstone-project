import React from 'react';
import HsData from '../Logic/HsData';

class CardShowcaseDraggable extends React.Component {
    constructor (props) {
        super ();
        let card = HsData.getCardById(props.cardId);
        this._dragGalleryCard = this._dragGalleryCard.bind(this);
        this._dragGalleryCardEnd = this._dragGalleryCardEnd.bind(this);

        this.state = {
            card: card
        }
    }
    render () {
        let card = this.state.card;
        return (
            <a className="gallery-card-item" draggable="true" onDragStart={evt => this._dragGalleryCard(evt, card["id"])} onDragEnd={this._dragGalleryCardEnd}>
                <img className={`card-showcase ${card["type"] === "HERO" && "hero-pos"}`} src={`https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${card["id"]}.png`} />
            </a>
        );
    }

    _dragGalleryCard (evt, cardId) {
        evt.dataTransfer.setData("operation", "addCard");
        evt.dataTransfer.setData("card-id", cardId);
        this.props.displayDeckDropBorder(true);
    }

    _dragGalleryCardEnd (evt) {
        this.props.displayDeckDropBorder(false);
    }
}

export default CardShowcaseDraggable;