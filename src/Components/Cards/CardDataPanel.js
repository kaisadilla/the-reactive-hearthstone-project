import React from 'react';
import HsData from '../../Logic/HsData';
import getLanguage from "../../Logic/Language";

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

class CardDataPanel extends React.Component {
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

    getHtmlAttack () {
        let card = this.props.card;
        if (card["type"] === "MINION") return (
            <div className="legend-info">
                <span className="legend">Attack</span>
                <span className="value">{card["attack"]}</span>
            </div>
        );
        if (card["type"] === "WEAPON") return (
            <div className="legend-info">
                <span className="legend">Damage</span>
                <span className="value">{card["attack"]}</span>
            </div>
        );
        else return undefined;
    }

    getHtmlHealth () {
        let card = this.props.card;
        if (card["type"] === "MINION") return (
            <div className="legend-info">
                <span className="legend">Health</span>
                <span className="value">{card["health"]}</span>
            </div>
        );
        else if (card["type"] === "WEAPON") return  (
            <div className="legend-info">
                <span className="legend">Durability</span>
                <span className="value">{card["durability"]}</span>
            </div>
        );
        else if (card["type"] === "HERO") return (
            <div className="legend-info">
                <span className="legend">Armor</span>
                <span className="value">{card["armor"]}</span>
            </div>
        );
        else return undefined;
    }

    getCreatureSounds () {
        let card = this.props.card;
        let audioIntro = new Audio(`https://hearthstonesounds.s3.amazonaws.com/${card["id"]}_S.wav`);
        let audioPlay = new Audio(`https://hearthstonesounds.s3.amazonaws.com/${card["id"]}_P.wav`);
        let audioAttack = new Audio(`https://hearthstonesounds.s3.amazonaws.com/${card["id"]}_A.wav`);
        let audioDeath = new Audio(`https://hearthstonesounds.s3.amazonaws.com/${card["id"]}_D.wav`);

        console.log(audioIntro);
        console.log(audioPlay);

        return (
            <div>
                <span className="section">Sounds</span>
                {card["rarity"] === "LEGENDARY" && (
                    <div className="legend-info">
                        <span className="legend">Intro</span>
                        <span className="value"><button className="play-audio material-icons" onClick={() => audioIntro.play()}>play_arrow</button></span>
                    </div>)
                }
                <div className="legend-info">
                    <span className="legend">Play</span>
                    <span className="value"><button className="play-audio material-icons" onClick={() => audioPlay.play()}>play_arrow</button></span>
                </div>
                <div className="legend-info">
                    <span className="legend">Attack</span>
                    <span className="value"><button className="play-audio material-icons" onClick={() => audioAttack.play()}>play_arrow</button></span>
                </div>
                <div className="legend-info">
                    <span className="legend">Death</span>
                    <span className="value"><button className="play-audio material-icons" onClick={() => audioDeath.play()}>play_arrow</button></span>
                </div>
            </div>
        );
    }

    getHeroSounds () {
        let card = this.props.card;
        let audioIntro = new Audio(`https://hearthstonesounds.s3.amazonaws.com/${card["id"]}_I1.wav`);
        let audioPlay = new Audio(`https://hearthstonesounds.s3.amazonaws.com/${card["id"]}_S1.wav`);
        let audioAttack = new Audio(`https://hearthstonesounds.s3.amazonaws.com/${card["id"]}_A1.wav`);
        let audioDeath = new Audio(`https://hearthstonesounds.s3.amazonaws.com/${card["id"]}_D.wav`);
        let audioConcede = new Audio(`https://hearthstonesounds.s3.amazonaws.com/${card["id"]}_C.wav`);
        let audioGreetings = new Audio(`https://hearthstonesounds.s3.amazonaws.com/${card["id"]}_EM_G1.wav`);
        let audioWellPlayed = new Audio(`https://hearthstonesounds.s3.amazonaws.com/${card["id"]}_EM_WP.wav`);
        let audioThanks = new Audio(`https://hearthstonesounds.s3.amazonaws.com/${card["id"]}_EM_TH1.wav`);
        let audioWow = new Audio(`https://hearthstonesounds.s3.amazonaws.com/${card["id"]}_EM_W.wav`);
        let audioOops = new Audio(`https://hearthstonesounds.s3.amazonaws.com/${card["id"]}_EM_O.wav`);
        let audioThreaten = new Audio(`https://hearthstonesounds.s3.amazonaws.com/${card["id"]}_EM_T.wav`);

        console.log(audioIntro);
        console.log(audioPlay);

        return (
            <div>
                <span className="section">Sounds</span>
                <div className="legend-info">
                    <span className="legend">Intro</span>
                    <span className="value"><button className="play-audio material-icons" onClick={() => audioIntro.play()}>play_arrow</button></span>
                </div>
                <div className="legend-info">
                    <span className="legend">Play</span>
                    <span className="value"><button className="play-audio material-icons" onClick={() => audioPlay.play()}>play_arrow</button></span>
                </div>
                <div className="legend-info">
                    <span className="legend">Attack</span>
                    <span className="value"><button className="play-audio material-icons" onClick={() => audioAttack.play()}>play_arrow</button></span>
                </div>
                <div className="legend-info">
                    <span className="legend">Death</span>
                    <span className="value"><button className="play-audio material-icons" onClick={() => audioDeath.play()}>play_arrow</button></span>
                </div>
                <div className="legend-info">
                    <span className="legend">Concede</span>
                    <span className="value"><button className="play-audio material-icons" onClick={() => audioConcede.play()}>play_arrow</button></span>
                </div>
                <div className="legend-info">
                    <span className="legend">Greetings</span>
                    <span className="value"><button className="play-audio material-icons" onClick={() => audioGreetings.play()}>play_arrow</button></span>
                </div>
                <div className="legend-info">
                    <span className="legend">Well played</span>
                    <span className="value"><button className="play-audio material-icons" onClick={() => audioWellPlayed.play()}>play_arrow</button></span>
                </div>
                <div className="legend-info">
                    <span className="legend">Thanks</span>
                    <span className="value"><button className="play-audio material-icons" onClick={() => audioThanks.play()}>play_arrow</button></span>
                </div>
                <div className="legend-info">
                    <span className="legend">Wow</span>
                    <span className="value"><button className="play-audio material-icons" onClick={() => audioWow.play()}>play_arrow</button></span>
                </div>
                <div className="legend-info">
                    <span className="legend">Oops</span>
                    <span className="value"><button className="play-audio material-icons" onClick={() => audioOops.play()}>play_arrow</button></span>
                </div>
                <div className="legend-info">
                    <span className="legend">Threaten</span>
                    <span className="value"><button className="play-audio material-icons" onClick={() => audioThreaten.play()}>play_arrow</button></span>
                </div>
            </div>
        );
    }

    render () {
        let card = this.props.card;
        let lang = getLanguage();

        return (
            <aside className="aside-tools">
                <span className="title">{card["name"][lang]}</span>
                <span className="section">Card</span>
                <div className="display-card">
                    <img
                        className={`tile ${card["type"] === "HERO" && "hero-pos"}`}
                        src={`https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${card["id"]}.png`}
                    />
                </div>
                <div className="legend-info-icon">
                    <span className="legend">Class</span>
                    <div className="value">
                        <span>{HsData.getClassName(card["cardClass"])}</span>
                        <img className="class-icon" src={this.getClassIcon(card["cardClass"])} />
                    </div>
                </div>
                <span className="section">Information</span>
                <div className="legend-info">
                    <span className="legend">Cost</span>
                    <span className="value">{card["cost"]}</span>
                </div>
                <div className="legend-info">
                    <span className="legend">Type</span>
                    <span className="value">{HsData.getTypeName(card["type"])}</span>
                </div>
                { card["type"] === "MINION" &&
                    (<div className="legend-info">
                        <span className="legend">Race</span>
                        <span className="value">{HsData.getRaceName(card["race"])}</span>
                    </div>)
                }
                { this.getHtmlAttack() } { this.getHtmlHealth() }
                <div className="info">
                    <span dangerouslySetInnerHTML={{__html: HsData.normalizeCardText(card["text"][lang])}}></span>
                </div>
                <div className="legend-info">
                    <span className="legend">Rarity</span>
                    <span className="value">{HsData.getRarityName(card["rarity"])}</span>
                </div>
                <div className="legend-info">
                    <span className="legend">Set</span>
                    <span className="value">{HsData.getExpSymbol(card["set"])}</span>
                </div>
                <div className="legend-info">
                    <span className="legend">Artist</span>
                    <span className="value">{card["artist"]}</span>
                </div>
                <div className="info flavor">
                    <span>{card["flavor"][lang]}</span>
                </div>
                { card["type"] === "MINION" && this.getCreatureSounds() }
                { card["type"] === "HERO" && this.getHeroSounds() }
            </aside>
        );
    }
}

export default CardDataPanel;