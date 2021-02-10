import React from 'react';

class DeckCardDeleteArea extends React.Component {
    constructor () {
        super();

        this.allowDrop = this.allowDrop.bind(this);
        this.dropDeckCard = this.dropDeckCard.bind(this);
    }

    allowDrop (evt) {
        evt.preventDefault();
    }

    dropDeckCard (evt) {
        if (evt.dataTransfer.getData("operation") === "deleteCard") {
            let removedCard = evt.dataTransfer.getData("card-id");
            this.props.removeCard(removedCard);
        }
    }

    render() {
        return (
            <div className="deck-card-delete-area" id="deck-card-delete-area" onDrop={this.dropDeckCard} onDragOver={this.allowDrop}>
                <span>Drop card here to remove it from the deck.</span>
            </div>
        );
    }
}

export default DeckCardDeleteArea;