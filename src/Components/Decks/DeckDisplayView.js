import React from 'react';
import ReactDOM from "react-dom";
import HsData from '../../Logic/HsData';
import CardTokenDraggable from '../CardTokenDraggable';

class DeckDisplayView extends React.Component {
    constructor (props) {
        super();

        this.setState = this.setState.bind(this);
        this.updateName = this.updateName.bind(this);
        this._dropGalleryCard = this._dropGalleryCard.bind(this);

        this.deckCards = React.createRef();

        props.setParentState({
            deckName: props.deck.name,
            deckClass: props.deck.class,
            deckCards: props.deck.cards,
        })
        this.state = {
            displayWarning: false,
        }
    }

    updateName (evt) {
        this.props.setParentState({
            deckName: evt.target.value,
        })
    }

    componentDidMount () {
        this.props.setParentState({
            deckCards: [
                "AT_001",
                "AT_002",
                "AT_002",
                "AT_009",
                "AT_003",
                "AT_005",
                "AT_012",
                "AT_003",
                "AT_005",
                "AT_021",
            ]
        })
    }
    
    render () {
        return (
            <div className="deck-view" onDrop={this._dropGalleryCard} onDragOver={this._allowDrop}>
                <div className="deck-hero">
                    <div className="deck-hero-frame">
                        <img src={`https://art.hearthstonejson.com/v1/512x/${HsData.getHeroImgId(this.props.parentState.deckClass)}.jpg`} />
                        <div className="deck-name">
                            <input type="text" id="deck-name" placeholder="New deck" value={this.props.parentState.deckName} maxLength="20" onChange={this.updateName}/>
                        </div>
                    </div>
                </div>
                <div className="deck-actions">
                    <button className="deck-save">Save</button>
                    <button className="deck-save-exit">Save and exit</button>
                    <span className="deck-card-count">{this.props.parentState.deckCards.length} / 30</span>
                </div>
                <div className={`deck-cards ${this.props.deckDropBorder ? "display-border" : ""} ${this.state.displayWarning ? "display-warning" : ""}`} ref={this.deckCards}>
                    {this._getAllCardElements()}
                </div>
            </div>
        );
    }

    _getAllCardElements () {
        let elements = [];
        let sortedDeck = this._sortedDeck();
        
        let i = 0;
        while (i < sortedDeck.length) {
            let cardId = sortedDeck[i];
            let totalAmount = sortedDeck.filter(c => c === cardId).length;

            elements.push(<CardTokenDraggable key={cardId} cardId={cardId} count={totalAmount} displayDeleteArea={this.props.displayDeleteArea}/>);

            i += totalAmount;
        }

        return elements;
    }

    _sortedDeck () {
        let deck = [...this.props.parentState.deckCards];
        if (deck === undefined) {
            console.log("wut");
            return;
        };

        deck.sort((a, b) => {
            let cardA = HsData.getCardById(a);
            let cardB = HsData.getCardById(b);
            if (cardA["cost"] > cardB["cost"]) return 1;
            if (cardA["cost"] < cardB["cost"]) return -1;
            return cardA["name"] > cardB["name"];
        })

        return deck;
    }

    _dropGalleryCard (evt) {
        evt.preventDefault();
        if (evt.dataTransfer.getData("operation") === "addCard") {
            let potentialCard = evt.dataTransfer.getData("card-id");
            let wasAdded = this.props.addCard(potentialCard);
    
            if (!wasAdded) {
                this.setState({displayWarning: true})
                setTimeout(() => this.setState({displayWarning: false}), 100);
            }
        }
        }

    _allowDrop (evt) {
        evt.preventDefault();
    }
}

export default DeckDisplayView;