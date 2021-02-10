import React from 'react';
import ReactDOM from "react-dom";

import DemonHunter from "../img/class-demonhunter.png";
import Druid from "../img/class-druid.png";
import Hunter from "../img/class-hunter.png";
import Mage from "../img/class-mage.png";
import Paladin from "../img/class-paladin.png";
import Priest from "../img/class-priest.png";
import Rogue from "../img/class-rogue.png";
import Shaman from "../img/class-shaman.png";
import Warlock from "../img/class-warlock.png";
import Warrior from "../img/class-warrior.png";

class CreateDeckForm extends React.Component {
    constructor () {
        super();
        this.updateName = this.updateName.bind(this);
        this.createDeck = this.createDeck.bind(this)

        this.nameField = React.createRef();

        this.state = {
            display: false,
            deckClass: "MAGE",
            deckName: "",
        }
    }

    updateName (evt) {
        this.setState({
            deckName: evt.target.value,
        })
    }

    render() {
        return (
            <div className="disable-screen no-scroll">
                <form className="modal-dialog large-dialog">
                    <div className="class-selection">
                        <img src={DemonHunter} alt="demonhunter" className={`button class-icon-large ${(this.state.deckClass === "DEMONHUNTER") && "chosen"}`} onClick={() => this.setState({deckClass: "DEMONHUNTER"})} />
                        <img src={Druid}       alt="druid"       className={`button class-icon-large ${(this.state.deckClass === "DRUID") && "chosen"}`}       onClick={() => this.setState({deckClass: "DRUID"})}/>
                        <img src={Hunter}      alt="hunter"      className={`button class-icon-large ${(this.state.deckClass === "HUNTER") && "chosen"}`}      onClick={() => this.setState({deckClass: "HUNTER"})}/>
                        <img src={Mage}        alt="mage"        className={`button class-icon-large ${(this.state.deckClass === "MAGE") && "chosen"}`}        onClick={() => this.setState({deckClass: "MAGE"})}/>
                        <img src={Paladin}     alt="paladin"     className={`button class-icon-large ${(this.state.deckClass === "PALADIN") && "chosen"}`}     onClick={() => this.setState({deckClass: "PALADIN"})}/>
                        <img src={Priest}      alt="priest"      className={`button class-icon-large ${(this.state.deckClass === "PRIEST") && "chosen"}`}      onClick={() => this.setState({deckClass: "PRIEST"})}/>
                        <img src={Rogue}       alt="rogue"       className={`button class-icon-large ${(this.state.deckClass === "ROGUE") && "chosen"}`}       onClick={() => this.setState({deckClass: "ROGUE"})}/>
                        <img src={Shaman}      alt="shaman"      className={`button class-icon-large ${(this.state.deckClass === "SHAMAN") && "chosen"}`}      onClick={() => this.setState({deckClass: "SHAMAN"})}/>
                        <img src={Warlock}     alt="warlock"     className={`button class-icon-large ${(this.state.deckClass === "WARLOCK") && "chosen"}`}     onClick={() => this.setState({deckClass: "WARLOCK"})}/>
                        <img src={Warrior}     alt="warrior"     className={`button class-icon-large ${(this.state.deckClass === "WARRIOR") && "chosen"}`}     onClick={() => this.setState({deckClass: "WARRIOR"})}/>
                    </div>
                    <div className="field">
                        <label htmlFor="deckName">Deck name: </label>
                        <input type="text" id="deckName" name="deckName" placeholder="New deck" maxLength="20" onChange={this.updateName} ref={this.nameField} onKeyPress={evt => this.createDeckFromEnter(evt)} />
                    </div>
                    <div className="button-row">
                        <button type="button" className="btn-cancel" value="Cancel" onClick={() => this.props.closeForm()}>Cancel</button>
                        <button type="button" className="btn-action" value="Submit" onClick={() => this.createDeck()}>Create deck</button>
                    </div>
                </form>
            </div>
        );
    }

    createDeckFromEnter (evt) {
        if (evt.key === "Enter") {
            evt.preventDefault();
            this.createDeck();
        }
    }

    createDeck () {
        if (this.state.deckName === "") {
            const DOMnameField = ReactDOM.findDOMNode(this.nameField.current);
            DOMnameField.className = "shake error";
            setTimeout(() => DOMnameField.className = "", 500);
        }
        else {
            const deck = {
                name: this.state.deckName,
                class: this.state.deckClass,
                cards: [],
            };
            this.props.createDeck(deck);
        }
    }
}

export default CreateDeckForm;