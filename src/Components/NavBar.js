import React from "react";
import {BrowserRouter, Link} from "react-router-dom";

import menu_enUS from "../img/lang/enUS.png";
import menu_deDE from "../img/lang/deDE.png";
import menu_esES from "../img/lang/esES.png";
import menu_esMX from "../img/lang/esMX.png";
import menu_frFR from "../img/lang/frFR.png";
import menu_itIT from "../img/lang/itIT.png";
import menu_jaJP from "../img/lang/jaJP.png";
import menu_koKR from "../img/lang/koKR.png";
import menu_plPL from "../img/lang/plPL.png";
import menu_ptBR from "../img/lang/ptBR.png";
import menu_ruRU from "../img/lang/ruRU.png";
import menu_thTH from "../img/lang/thTH.png";
import menu_zhCN from "../img/lang/zhCN.png";
import menu_zhTW from "../img/lang/zhTW.png";

import getLanguage, { setLanguage } from "../Logic/Language";

class NavBar extends React.Component {
    constructor () {
        super();

        this.state = {
            showLanguages: false,
        }
    }

    setLanguageCookie (lang) {
        setLanguage(lang);

        this.setState({
            showLanguages: false,
        })
        this.props.forceGlobalUpdate();
    }

    getLanguageDropDown () {
        return (
            <div className="dropdown-menu">
                <div className={`${getLanguage() === "enUS" && "selected"}`} onClick={() => this.setLanguageCookie("enUS")}><img src={menu_enUS} /><span>English</span></div>
                <div className={`${getLanguage() === "deDE" && "selected"}`} onClick={() => this.setLanguageCookie("deDE")}><img src={menu_deDE} /><span>Deutsch (German)</span></div>
                <div className={`${getLanguage() === "esES" && "selected"}`} onClick={() => this.setLanguageCookie("esES")}><img src={menu_esES} /><span>Español (Spanish, Spain)</span></div>
                <div className={`${getLanguage() === "esMX" && "selected"}`} onClick={() => this.setLanguageCookie("esMX")}><img src={menu_esMX} /><span>Español (Spanish, Mexico)</span></div>
                <div className={`${getLanguage() === "frFR" && "selected"}`} onClick={() => this.setLanguageCookie("frFR")}><img src={menu_frFR} /><span>Français (French)</span></div>
                <div className={`${getLanguage() === "itIT" && "selected"}`} onClick={() => this.setLanguageCookie("itIT")}><img src={menu_itIT} /><span>Italiano (Italian)</span></div>
                <div className={`${getLanguage() === "jaJP" && "selected"}`} onClick={() => this.setLanguageCookie("jaJP")}><img src={menu_jaJP} /><span>日本語 (Japanese)</span></div>
                <div className={`${getLanguage() === "koKR" && "selected"}`} onClick={() => this.setLanguageCookie("koKR")}><img src={menu_koKR} /><span>한국어 (Korean)</span></div>
                <div className={`${getLanguage() === "plPL" && "selected"}`} onClick={() => this.setLanguageCookie("plPL")}><img src={menu_plPL} /><span>Polski (Polish)</span></div>
                <div className={`${getLanguage() === "ptBR" && "selected"}`} onClick={() => this.setLanguageCookie("ptBR")}><img src={menu_ptBR} /><span>Português (Portuguese)</span></div>
                <div className={`${getLanguage() === "ruRU" && "selected"}`} onClick={() => this.setLanguageCookie("ruRU")}><img src={menu_ruRU} /><span>Русский (Russian)</span></div>
                <div className={`${getLanguage() === "thTH" && "selected"}`} onClick={() => this.setLanguageCookie("thTH")}><img src={menu_thTH} /><span>ไทย (Thai)</span></div>
                <div className={`${getLanguage() === "zhCN" && "selected"}`} onClick={() => this.setLanguageCookie("zhCN")}><img src={menu_zhCN} /><span>中文 (Chinese, China)</span></div>
                <div className={`${getLanguage() === "zhTW" && "selected"}`} onClick={() => this.setLanguageCookie("zhTW")}><img src={menu_zhTW} /><span>中文 (Chinese, Taiwan)</span></div>
            </div>
        );
    }


    render () {
        return (
            <nav className="navbar">
                <Link className="nav-item title" to="/">the Hearthstone project</Link>
                <div className="dropdown-container">
                    <button className={`dropdown-toggle ${this.state.showLanguages ? "open" : ""}`} onClick={() => this.setState({showLanguages: !this.state.showLanguages})}>Language</button>
                    {this.state.showLanguages && this.getLanguageDropDown()}
                </div>
                <Link className="nav-item" to="/cards">Cards</Link>
                <Link className="nav-item" to="/decks">My decks</Link>
                <Link className="nav-item" to="/stores">Stores</Link>
            </nav>
        );
    }
}

export default NavBar;