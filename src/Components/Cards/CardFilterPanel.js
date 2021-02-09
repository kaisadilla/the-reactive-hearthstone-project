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

class CardFilterPanel extends React.Component {

    renderDisplayOptions () {
        let displayOptions;
        if (this.props.displayMode === "select") {
            displayOptions = (
                <div>
                    <span className="section">Display</span>
                    <span id="set-display-list " className={`option ${this.props.cardDisplay === "list" && "chosen"}`} onClick={() => this.props.setParentState({display: "list"})}>List</span>
                    <span id="set-display-gallery" className={`option ${this.props.cardDisplay === "gallery" && "chosen"}`} onClick={() => this.props.setParentState({display: "gallery"})}>Gallery</span>
                </div>
            );
        }
        return displayOptions;
    }

    render () {
        return (
            <aside className="aside-tools">
                <span className="title">Cards</span>
                {this.renderDisplayOptions()}
                <span className="section">Classes</span>
                <div className="class-buttons" id="class-buttons">
                    <img src={DemonHunter} alt="demonhunter" className={`button class-icon ${this.props.filters.cardClass.includes("DEMONHUNTER") && "chosen"}`} onClick={() => this.props.setToggledFilter("filterClass", "DEMONHUNTER")} />
                    <img src={Druid}       alt="druid"       className={`button class-icon ${this.props.filters.cardClass.includes("DRUID") && "chosen"}`}       onClick={() => this.props.setToggledFilter("filterClass", "DRUID")}/>
                    <img src={Hunter}      alt="hunter"      className={`button class-icon ${this.props.filters.cardClass.includes("HUNTER") && "chosen"}`}      onClick={() => this.props.setToggledFilter("filterClass", "HUNTER")}/>
                    <img src={Mage}        alt="mage"        className={`button class-icon ${this.props.filters.cardClass.includes("MAGE") && "chosen"}`}        onClick={() => this.props.setToggledFilter("filterClass", "MAGE")}/>
                    <img src={Paladin}     alt="paladin"     className={`button class-icon ${this.props.filters.cardClass.includes("PALADIN") && "chosen"}`}     onClick={() => this.props.setToggledFilter("filterClass", "PALADIN")}/>
                    <img src={Priest}      alt="priest"      className={`button class-icon ${this.props.filters.cardClass.includes("PRIEST") && "chosen"}`}      onClick={() => this.props.setToggledFilter("filterClass", "PRIEST")}/>
                    <img src={Rogue}       alt="rogue"       className={`button class-icon ${this.props.filters.cardClass.includes("ROGUE") && "chosen"}`}       onClick={() => this.props.setToggledFilter("filterClass", "ROGUE")}/>
                    <img src={Shaman}      alt="shaman"      className={`button class-icon ${this.props.filters.cardClass.includes("SHAMAN") && "chosen"}`}      onClick={() => this.props.setToggledFilter("filterClass", "SHAMAN")}/>
                    <img src={Warlock}     alt="warlock"     className={`button class-icon ${this.props.filters.cardClass.includes("WARLOCK") && "chosen"}`}     onClick={() => this.props.setToggledFilter("filterClass", "WARLOCK")}/>
                    <img src={Warrior}     alt="warrior"     className={`button class-icon ${this.props.filters.cardClass.includes("WARRIOR") && "chosen"}`}     onClick={() => this.props.setToggledFilter("filterClass", "WARRIOR")}/>
                    <img src={Neutral}     alt="neutral"     className={`button class-icon ${this.props.filters.cardClass.includes("NEUTRAL") && "chosen"}`}     onClick={() => this.props.setToggledFilter("filterClass", "NEUTRAL")}/>
                </div>
                <span className="section">Cost</span>
                <div className="cost-buttons" id="cost-buttons">
                    <div className={`button mana-crystal ${this.props.filters.cost.includes(0) && "chosen"}`}  onClick={() => this.props.setToggledFilter("filterCost", 0) }>0 </div>
                    <div className={`button mana-crystal ${this.props.filters.cost.includes(1) && "chosen"}`}  onClick={() => this.props.setToggledFilter("filterCost", 1) }>1 </div>
                    <div className={`button mana-crystal ${this.props.filters.cost.includes(2) && "chosen"}`}  onClick={() => this.props.setToggledFilter("filterCost", 2) }>2 </div>
                    <div className={`button mana-crystal ${this.props.filters.cost.includes(3) && "chosen"}`}  onClick={() => this.props.setToggledFilter("filterCost", 3) }>3 </div>
                    <div className={`button mana-crystal ${this.props.filters.cost.includes(4) && "chosen"}`}  onClick={() => this.props.setToggledFilter("filterCost", 4) }>4 </div>
                    <div className={`button mana-crystal ${this.props.filters.cost.includes(5) && "chosen"}`}  onClick={() => this.props.setToggledFilter("filterCost", 5) }>5 </div>
                    <div className={`button mana-crystal ${this.props.filters.cost.includes(6) && "chosen"}`}  onClick={() => this.props.setToggledFilter("filterCost", 6) }>6 </div>
                    <div className={`button mana-crystal ${this.props.filters.cost.includes(7) && "chosen"}`}  onClick={() => this.props.setToggledFilter("filterCost", 7) }>7 </div>
                    <div className={`button mana-crystal ${this.props.filters.cost.includes(8) && "chosen"}`}  onClick={() => this.props.setToggledFilter("filterCost", 8) }>8 </div>
                    <div className={`button mana-crystal ${this.props.filters.cost.includes(9) && "chosen"}`}  onClick={() => this.props.setToggledFilter("filterCost", 9) }>9 </div>
                    <div className={`button mana-crystal ${this.props.filters.cost.includes(10) && "chosen"}`} onClick={() => this.props.setToggledFilter("filterCost", 10)}>10+</div>
                </div>
                <span className="section">Rarity</span>
                <span className={`option ${this.props.filters.rarity.includes("COMMON") && "chosen"}`   } onClick={() => this.props.setToggledFilter("filterRarity", "COMMON")   }>Common</span>
                <span className={`option ${this.props.filters.rarity.includes("RARE") && "chosen"}`     } onClick={() => this.props.setToggledFilter("filterRarity", "RARE")     }>Rare</span>
                <span className={`option ${this.props.filters.rarity.includes("EPIC") && "chosen"}`     } onClick={() => this.props.setToggledFilter("filterRarity", "EPIC")     }>Epic</span>
                <span className={`option ${this.props.filters.rarity.includes("LEGENDARY") && "chosen"}`} onClick={() => this.props.setToggledFilter("filterRarity", "LEGENDARY")}>Legendary</span>
                <span className="section">Type</span>
                <span className={`option ${this.props.filters.type.includes("MINION") && "chosen"}`} onClick={() => this.props.setToggledFilter("filterType", "MINION")}>Minion</span>
                <span className={`option ${this.props.filters.type.includes("SPELL") && "chosen"}` } onClick={() => this.props.setToggledFilter("filterType", "SPELL") }>Spell</span>
                <span className={`option ${this.props.filters.type.includes("WEAPON") && "chosen"}`} onClick={() => this.props.setToggledFilter("filterType", "WEAPON")}>Weapon</span>
                <span className={`option ${this.props.filters.type.includes("HERO") && "chosen"}`  } onClick={() => this.props.setToggledFilter("filterType", "HERO")  }>Hero</span>
                <span className="section">Tribe</span>
                <span className={`option ${this.props.filters.tribe.includes("NONE")       && "chosen"}`} onClick={() => this.props.setToggledFilter("filterTribe", "NONE")      }>(none)</span>
                <span className={`option ${this.props.filters.tribe.includes("ALL")        && "chosen"}`} onClick={() => this.props.setToggledFilter("filterTribe", "ALL")       }>All (Amalgam)</span>
                <span className={`option ${this.props.filters.tribe.includes("BEAST")      && "chosen"}`} onClick={() => this.props.setToggledFilter("filterTribe", "BEAST")     }>Beast</span>
                <span className={`option ${this.props.filters.tribe.includes("DEMON")      && "chosen"}`} onClick={() => this.props.setToggledFilter("filterTribe", "DEMON")     }>Demon</span>
                <span className={`option ${this.props.filters.tribe.includes("DRAGON")     && "chosen"}`} onClick={() => this.props.setToggledFilter("filterTribe", "DRAGON")    }>Dragon</span>
                <span className={`option ${this.props.filters.tribe.includes("ELEMENTAL")  && "chosen"}`} onClick={() => this.props.setToggledFilter("filterTribe", "ELEMENTAL") }>Elemental</span>
                <span className={`option ${this.props.filters.tribe.includes("MECHANICAL") && "chosen"}`} onClick={() => this.props.setToggledFilter("filterTribe", "MECHANICAL")}>Mech</span>
                <span className={`option ${this.props.filters.tribe.includes("MURLOC")     && "chosen"}`} onClick={() => this.props.setToggledFilter("filterTribe", "MURLOC")    }>Murloc</span>
                <span className={`option ${this.props.filters.tribe.includes("PIRATE")     && "chosen"}`} onClick={() => this.props.setToggledFilter("filterTribe", "PIRATE")    }>Pirate</span>
                <span className={`option ${this.props.filters.tribe.includes("TOTEM")      && "chosen"}`} onClick={() => this.props.setToggledFilter("filterTribe", "TOTEM")     }>Totem</span>
            </aside>
        );
    }
}

export default CardFilterPanel;