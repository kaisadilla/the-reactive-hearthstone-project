import React from "react";
import {BrowserRouter, Link} from "react-router-dom";

class NavBar extends React.Component {
    render () {
        return (
            <nav className="navbar">
                <Link className="nav-item title" to="/">the Hearthstone project</Link>
                <Link className="nav-item" to="/cards">Cards</Link>
                <Link className="nav-item" to="/decks">My decks</Link>
            </nav>
        );
    }
}

export default NavBar;