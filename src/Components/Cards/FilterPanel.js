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

class FilterPanel extends React.Component {
    //state = {  }
    render() {
        return (
            <aside className="aside-tools">
                <span className="title">Cards</span>
                <span className="section">Display</span>
                <span id="set-display-list" className="option">List</span>
                <span id="set-display-gallery" className="option">Gallery</span>
                <span className="section">Classes</span>
                <div className="class-buttons" id="class-buttons">
                    <a href={void(0)}><img className="class-button" src={DemonHunter} alt="demonhunter" data-toggled="false" /></a>
                    <a href={void(0)}><img className="class-button" src={Druid} alt="druid" data-toggled="false" /></a>
                    <a href={void(0)}><img className="class-button" src={Hunter} alt="hunter" data-toggled="false" /></a>
                    <a href={void(0)}><img className="class-button" src={Mage} alt="mage" data-toggled="false" /></a>
                    <a href={void(0)}><img className="class-button" src={Paladin} alt="paladin" data-toggled="false" /></a>
                    <a href={void(0)}><img className="class-button" src={Priest} alt="priest" data-toggled="false" /></a>
                    <a href={void(0)}><img className="class-button" src={Rogue} alt="rogue" data-toggled="false" /></a>
                    <a href={void(0)}><img className="class-button" src={Shaman} alt="shaman" data-toggled="false" /></a>
                    <a href={void(0)}><img className="class-button" src={Warlock} alt="warlock" data-toggled="false" /></a>
                    <a href={void(0)}><img className="class-button" src={Warrior} alt="warrior" data-toggled="false" /></a>
                    <a href={void(0)}><img className="class-button" src={Neutral} alt="neutral" data-toggled="false" /></a>
                </div>
                <span className="section">Cost</span>
                <div className="cost-buttons" id="cost-buttons">
                    <a href={void(0)}><div className="mana-crystal" data-toggled="false">0</div></a>
                    <a href={void(0)}><div className="mana-crystal" data-toggled="false">1</div></a>
                    <a href={void(0)}><div className="mana-crystal" data-toggled="false">2</div></a>
                    <a href={void(0)}><div className="mana-crystal" data-toggled="false">3</div></a>
                    <a href={void(0)}><div className="mana-crystal" data-toggled="false">4</div></a>
                    <a href={void(0)}><div className="mana-crystal" data-toggled="false">5</div></a>
                    <a href={void(0)}><div className="mana-crystal" data-toggled="false">6</div></a>
                    <a href={void(0)}><div className="mana-crystal" data-toggled="false">7</div></a>
                    <a href={void(0)}><div className="mana-crystal" data-toggled="false">8</div></a>
                    <a href={void(0)}><div className="mana-crystal" data-toggled="false">9</div></a>
                    <a href={void(0)}><div className="mana-crystal" data-toggled="false">10+</div></a>
                </div>
                <span className="section">Rarity</span>
                <span className="option">Common</span>
                <span className="option">Rare</span>
                <span className="option">Epic</span>
                <span className="option">Legendary</span>
                <span className="section">Type</span>
                <span className="option">Minion</span>
                <span className="option">Spell</span>
                <span className="option">Weapon</span>
                <span className="option">Hero</span>
                <span className="section">Tribe</span>
                <span className="option">(none)</span>
                <span className="option">All (Amalgam)</span>
                <span className="option">Beast</span>
                <span className="option">Demon</span>
                <span className="option">Dragon</span>
                <span className="option">Elemental</span>
                <span className="option">Mech</span>
                <span className="option">Murloc</span>
                <span className="option">Pirate</span>
                <span className="option">Totem</span>
            </aside>
        );
    }
}

export default FilterPanel;