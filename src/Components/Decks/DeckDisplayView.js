import React from 'react';
import HsData from '../../Logic/HsData';
import CardTokenDraggable from '../CardTokenDraggable';

class DeckDisplayView extends React.Component {
    constructor (props) {
        super();

        this.updateName = this.updateName.bind(this);
        this.setState = this.setState.bind(this);

        props.setParentState({
            deckName: props.deck.name,
            deckClass: props.deck.class,
            deckCards: props.deck.cards,
        })
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
            <div className="deck-view">
                <div className="deck-hero">
                    <div className="deck-hero-frame">
                        <img src={`https://art.hearthstonejson.com/v1/512x/${HsData.getHeroImgId(this.props.parentState.deckClass)}.jpg`} />
                        <div className="deck-name">
                            <input type="text" id="deck-name" placeholder="New deck" value={this.props.parentState.deckName} maxLength="20" onChange={this.updateName}/>
                        </div>
                    </div>
                </div>
                <div className="deck-cards" onDrop={void(0)} onDragOver={void(0)}>
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
}

export default DeckDisplayView;