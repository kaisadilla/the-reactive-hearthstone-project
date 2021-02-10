import React from 'react';

class DeckCardDeleteArea extends React.Component {
    constructor () {
        super();

        this._allowDrop = this._allowDrop.bind(this);
        this._dropDeckCard = this._dropDeckCard.bind(this);
    }

    render() {
        return (
            <div className="deck-card-delete-area" id="deck-card-delete-area" onDrop={this._dropDeckCard} onDragOver={this._allowDrop}>
                <span>Drop card here to remove it from the deck.</span>
            </div>
        );
    }

    _allowDrop (evt) {
        evt.preventDefault();
    }

    _dropDeckCard (evt) {
        if (evt.dataTransfer.getData("operation") === "deleteCard") {
            let removedCard = evt.dataTransfer.getData("card-id");
            this.props.removeCard(removedCard);
        }
    }
}

export default DeckCardDeleteArea;