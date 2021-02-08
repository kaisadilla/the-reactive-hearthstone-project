import logo from './logo.svg';
import React from 'react';
//import './App.css';

import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import CardList from "./Views/CardList";
import DeckList from "./Views/DeckList";

import NavBar from "./Components/NavBar";

import HsData from "./Logic/HsData";
import CardPage from './Views/CardPage';

class App extends React.Component {
    constructor () {
        super();
        this.URL_CARD_COLLECTIBLE = "https://raw.githubusercontent.com/kaisadilla/the-hearthstone-project/main/assets/json/cards.collectible.json";
        this.URL_EXPANSIONS = "https://raw.githubusercontent.com/kaisadilla/the-hearthstone-project/main/assets/json/expansions.json";

        this.state = {
            dataReady: false,
        }
    }

    componentDidMount () {
        fetch(this.URL_CARD_COLLECTIBLE)
            .then(resp => resp.json())
            .then(json => {
                HsData.collectibleCards = json;
                console.log("Resource loaded: collectible cards");
                this._checkLoaded();
            });

        fetch(this.URL_EXPANSIONS)
            .then(resp => resp.json())
            .then(json => {
                HsData.expansions = json;
                console.log("Resource loaded: expansions");
                this._checkLoaded();
            });
    }
    
    // checks if all the data has been loaded, and sets the flag "dataReady" if it is.
    _checkLoaded () {
        this.setState({
            dataReady: typeof HsData.collectibleCards != "undefined" && typeof HsData.expansions != "undefined"
        })
    }

    render () {
        if (this.state.dataReady) {
            return (
                <div className="App">
                    <Router>
                        <NavBar />
                        <div className="page-content">
                            <Switch>
                                <Route path="/cards" component={CardList} />
                                <Route path="/card-info" component={CardPage} />
                                <Route path="/decks" component={DeckList} />
                            </Switch>
                        </div>
                    </Router>
                </div>
            );
        }
        else {
            return (
                <div className="App">
                    Loading... {/* TODO: This is pretty bland...*/}
                </div>
            );
        }
    }
}

export default App;
