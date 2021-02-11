import React from 'react';

import DemonHunter from "../../img/class-demonhunter.png";
import Druid from "../../img/class-druid.png";
import Hunter from "../../img/class-hunter.png";
import Mage from "../../img/class-mage.png";
import Paladin from "../../img/class-paladin.png";
import Priest from "../../img/class-priest.png";
import Rogue from "../../img/class-rogue.png";
import Shaman from "../../img/class-shaman.png";
import Warlock from "../../img/class-warlock.png";
import Warrior from "../../img/class-warrior.png";
import Neutral from "../../img/class-neutral.png";

class DeckFilterPanel extends React.Component {
    render () {
        return (
            <aside className="aside-tools">
                <span className="title">Filters</span>
                <span className="section">Classes</span>
                <div className="class-buttons" id="class-buttons">
                    <img src={DemonHunter} alt="demonhunter" className={`button class-icon ${this.props.filters.deckClass.includes("DEMONHUNTER") && "chosen"}`} onClick={() => this.props.setToggledFilter("filterClass", "DEMONHUNTER")} />
                    <img src={Druid}       alt="druid"       className={`button class-icon ${this.props.filters.deckClass.includes("DRUID") && "chosen"}`}       onClick={() => this.props.setToggledFilter("filterClass", "DRUID")}/>
                    <img src={Hunter}      alt="hunter"      className={`button class-icon ${this.props.filters.deckClass.includes("HUNTER") && "chosen"}`}      onClick={() => this.props.setToggledFilter("filterClass", "HUNTER")}/>
                    <img src={Mage}        alt="mage"        className={`button class-icon ${this.props.filters.deckClass.includes("MAGE") && "chosen"}`}        onClick={() => this.props.setToggledFilter("filterClass", "MAGE")}/>
                    <img src={Paladin}     alt="paladin"     className={`button class-icon ${this.props.filters.deckClass.includes("PALADIN") && "chosen"}`}     onClick={() => this.props.setToggledFilter("filterClass", "PALADIN")}/>
                    <img src={Priest}      alt="priest"      className={`button class-icon ${this.props.filters.deckClass.includes("PRIEST") && "chosen"}`}      onClick={() => this.props.setToggledFilter("filterClass", "PRIEST")}/>
                    <img src={Rogue}       alt="rogue"       className={`button class-icon ${this.props.filters.deckClass.includes("ROGUE") && "chosen"}`}       onClick={() => this.props.setToggledFilter("filterClass", "ROGUE")}/>
                    <img src={Shaman}      alt="shaman"      className={`button class-icon ${this.props.filters.deckClass.includes("SHAMAN") && "chosen"}`}      onClick={() => this.props.setToggledFilter("filterClass", "SHAMAN")}/>
                    <img src={Warlock}     alt="warlock"     className={`button class-icon ${this.props.filters.deckClass.includes("WARLOCK") && "chosen"}`}     onClick={() => this.props.setToggledFilter("filterClass", "WARLOCK")}/>
                    <img src={Warrior}     alt="warrior"     className={`button class-icon ${this.props.filters.deckClass.includes("WARRIOR") && "chosen"}`}     onClick={() => this.props.setToggledFilter("filterClass", "WARRIOR")}/>
                    <img src={Neutral}     alt="neutral"     className={`button class-icon ${this.props.filters.deckClass.includes("NEUTRAL") && "chosen"}`}     onClick={() => this.props.setToggledFilter("filterClass", "NEUTRAL")}/>
                </div>
            </aside>
        );
    }
}

export default DeckFilterPanel;