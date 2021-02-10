import React from 'react';
import HsData from '../Logic/HsData';

class CardTokenDraggable extends React.Component {
    constructor (props) {
        super();
        this._dragDeckCard = this._dragDeckCard.bind(this);
        this._dragDeckCardEnd = this._dragDeckCardEnd.bind(this);

        this.state = {
            card: HsData.getCardById(props.cardId),
        }
    }

    // React's DOM is mean to JS events. onDragEnd won't trigger if the component is removed before the drag ends, so we'll end it manually.
    componentWillUnmount () {
        this._dragDeckCardEnd();
    }

    render () {
        let card = this.state.card;
        return (
            <div className="card-token-reduced draggable" draggable="true" onDragStart={evt => this._dragDeckCard(evt, card["id"])} onDragEnd={this._dragDeckCardEnd}>
                <div className={`card-cost rarity-${card["rarity"].toLowerCase()}`}>{card["cost"]}</div>
                <div className="card-name">
                    <img className="tile" src={`https://art.hearthstonejson.com/v1/tiles/${card["id"]}.png`} />
                    <span className="tile-fade-out"></span>
                    <span className="caption">{card["name"]}</span>
                </div>
                {(this.props.count == 1 && card["rarity"] === "LEGENDARY") && <div className="card-amount">★</div>}
                {this.props.count > 1 && <div className="card-amount">{this.props.count <= 9 ? this.props.count : "9+"}</div>}
                
            </div>
        );
    }

    _dragDeckCard (evt, cardId) {
        evt.dataTransfer.setData("operation", "deleteCard");
        evt.dataTransfer.setData("card-id", cardId);
        this.props.displayDeleteArea(true);
    }

    _dragDeckCardEnd () {
        this.props.displayDeleteArea(false);
    }
}

export default CardTokenDraggable;