import React from 'react';
import HsData from '../Logic/HsData';
import useMousePos from "../Logic/MouseTracker";

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
import Neutral from "../img/class-neutral.png";
import CardHoverDisplay from './Cards/CardHoverDisplay';

import getLanguage from "../Logic/Language";

class CardTokenExpanded extends React.Component {
    constructor () {
        super();

        this.setDisplayShowcase = this.setDisplayShowcase.bind(this);
        this.state = {
            displayShowcase: false,
        }
    }

    getClassIcon (className) {
        switch (className) {
            case "DEMONHUNTER": return DemonHunter;
            case "DRUID": return Druid;
            case "HUNTER": return Hunter;
            case "MAGE": return Mage;
            case "PALADIN": return Paladin;
            case "PRIEST": return Priest;
            case "ROGUE": return Rogue;
            case "SHAMAN": return Shaman;
            case "WARLOCK": return Warlock;
            case "WARRIOR": return Warrior;
            case "NEUTRAL": return Neutral;
        }
    }

    setDisplayShowcase (val) {
        //const {x, y} = useMousePos();

        this.setState({
            displayShowcase: val,
            pos: {top: "50px", left: "20px"},
        });
    }

    render() {
        let card = HsData.getCardById(this.props.cardId);
        let lang = getLanguage();
        // the card description comes "pre-rendered" in the Json (it includes <b>html tags</b>), so we'll need to set it "dangerously". I'd never do this in a real app.
        return (
            <a className="list-card-item" href={`card-info/${card["id"]}`} target="_blank">
                <div className="card-token">
                    <div className={`card-cost rarity-${card["rarity"].toLowerCase()}`}>{card["cost"]}</div>
                    <div className="card-name" onMouseEnter={() => this.setDisplayShowcase(true)} onMouseLeave={() => this.setDisplayShowcase(false)}>
                        <img className="tile" src={`https://art.hearthstonejson.com/v1/tiles/${card["id"]}.png`} />
                        <span className="tile-fade-out"></span>
                        <span className="caption">{card["name"][lang]}</span>
                    </div>
                    <div className="card-stats">
                        {card["type"] === "MINION" ? <div className="card-atk">{card["attack"]}</div> : <div className="card-void"></div>}
                        {card["type"] === "MINION" ? <div className="card-hp" >{card["health"]}</div> : <div className="card-void"></div>}
                    </div>
                    <span className="card-exp">{HsData.getExpSymbol(card["set"])}</span>
                    <div className="card-class">
                        <img className="class-display-icon class-icon" src={this.getClassIcon(card["cardClass"])}/>
                        <span className="class-label">{HsData.getClassName(card["cardClass"])}</span>
                    </div>
                    <div className="card-desc">
                        <span title={HsData.stripTags(card["text"][lang])} dangerouslySetInnerHTML={{__html: HsData.normalizeCardText(card["text"][lang])}}></span>
                    </div>
                </div>
                {this.state.displayShowcase && <CardHoverDisplay cardId={card["id"]} position={this.state.pos} />}
            </a>
        );
    }
}

export default CardTokenExpanded;