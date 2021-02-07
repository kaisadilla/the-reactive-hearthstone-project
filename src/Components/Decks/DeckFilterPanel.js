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
                    <img src={DemonHunter} alt="demonhunter" className={`button class-icon`} onClick={void(0)} />
                    <img src={Druid}       alt="druid"       className={`button class-icon`} onClick={void(0)} />
                    <img src={Hunter}      alt="hunter"      className={`button class-icon`} onClick={void(0)} />
                    <img src={Mage}        alt="mage"        className={`button class-icon`} onClick={void(0)} />
                    <img src={Paladin}     alt="paladin"     className={`button class-icon`} onClick={void(0)} />
                    <img src={Priest}      alt="priest"      className={`button class-icon`} onClick={void(0)} />
                    <img src={Rogue}       alt="rogue"       className={`button class-icon`} onClick={void(0)} />
                    <img src={Shaman}      alt="shaman"      className={`button class-icon`} onClick={void(0)} />
                    <img src={Warlock}     alt="warlock"     className={`button class-icon`} onClick={void(0)} />
                    <img src={Warrior}     alt="warrior"     className={`button class-icon`} onClick={void(0)} />
                    <img src={Neutral}     alt="neutral"     className={`button class-icon`} onClick={void(0)} />
                </div>
            </aside>
        );
    }
}

export default DeckFilterPanel;