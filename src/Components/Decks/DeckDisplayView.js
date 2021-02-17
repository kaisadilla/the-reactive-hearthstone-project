import jsPDF from 'jspdf';
import React from 'react';
import ReactDOM from "react-dom";
import HsData from '../../Logic/HsData';
import getLanguage from '../../Logic/Language';
import CardTokenDraggable from '../CardTokenDraggable';
import DeckCodeForm from './DeckCodeForm';

class DeckDisplayView extends React.Component {
    constructor (props) {
        super();

        this.setState = this.setState.bind(this);
        this.updateName = this.updateName.bind(this);
        this.importCode = this.importCode.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this._getDeckPdf = this._getDeckPdf.bind(this);
        this._getDeckCode = this._getDeckCode.bind(this);
        this._dropGalleryCard = this._dropGalleryCard.bind(this);

        this.deckCards = React.createRef();

        props.setParentState({
            deckName: props.deck.name,
            deckClass: props.deck.class,
            deckCards: props.deck.cards,
            deckCodeForm: false,
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

    importCode (deck) {
        console.log(deck.cards);
        this.props.setParentState({
            deckCards: deck.cards,
        })
        this.closeForm();
    }

    closeForm () {
        this.setState({
            deckCodeForm: false,
        })
    }
    
    render () {
        return (
            <div className="deck-view" onDrop={this._dropGalleryCard} onDragOver={this._allowDrop}>
                <div className="deck-hero">
                    <div className="deck-hero-frame">
                        <img src={`https://art.hearthstonejson.com/v1/512x/${HsData.getClassHeroId(this.props.parentState.deckClass)}.jpg`} />
                        <div className="deck-name">
                            <input type="text" id="deck-name" placeholder="New deck" value={this.props.parentState.deckName} maxLength="20" onChange={this.updateName}/>
                        </div>
                    </div>
                </div>
                <div className="deck-actions">
                    <button className="deck-save" onClick={this.props.saveDeck}>Save</button>
                    <button className="deck-save-exit" onClick={this.props.saveDeckAndExit}>Save and exit</button>
                    <span className="deck-card-count">{this.props.parentState.deckCards.length} / 30</span>
                </div>
                <div className="deck-code-actions">
                    <button className="deck-import" onClick={() => this.setState({deckCodeForm: "import"})}><span className="material-icons">system_update_alt</span><span>Import</span></button>
                    <button className="deck-export" onClick={() => this.setState({deckCodeForm: "export"})}><span className="material-icons">open_in_new</span><span>Export</span></button>
                    {/*<button className="deck-pdf" onClick={this._getDeckPdf}><span className="material-icons">picture_as_pdf</span><span>PDF</span></button>*/}
                </div>
                <div id="testi"  className={`deck-cards ${this.props.deckDropBorder ? "display-border" : ""} ${this.state.displayWarning ? "display-warning" : ""}`} ref={this.deckCards}>
                    {this._getAllCardElements()}
                </div>
                {this.state.deckCodeForm === "export" && <DeckCodeForm mode="export" code={this._getDeckCode()} closeForm={this.closeForm} />}
                {this.state.deckCodeForm === "import" && <DeckCodeForm mode="import" deckClass={this.props.parentState.deckClass} onImport={this.importCode} closeForm={this.closeForm} />}
            </div>
        );
    }

    // I've invested 30 seconds in this. TODO: Actually do this.
    _getDeckPdf () {
        const doc = new jsPDF();
        doc.setFontSize(12);
        doc.html(document.querySelector("#testi").innerHTML, {
            callback: doc => doc.save(),
        });
    }

    _getDeckCode () {
        return HsData.encodeDeckCode(this.props.parentState.deckClass, this.props.parentState.deckCards);
    }

    _getAllCardElements () {
        let elements = [];
        let sortedDeck = HsData.sortDeck([...this.props.parentState.deckCards]);
        
        let i = 0;
        while (i < sortedDeck.length) {
            let cardId = sortedDeck[i];
            let totalAmount = sortedDeck.filter(c => c === cardId).length;

            elements.push(<CardTokenDraggable key={cardId} cardId={cardId} count={totalAmount} displayDeleteArea={this.props.displayDeleteArea}/>);

            i += totalAmount;
        }

        return elements;
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