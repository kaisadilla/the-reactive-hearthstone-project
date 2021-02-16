import React from 'react';
import CardDataPanel from '../Components/Cards/CardDataPanel';
import HsData from '../Logic/HsData';
import getLanguage from '../Logic/Language';

class CardPage extends React.Component {
    constructor () {
        super();
        let cardId = window.location.pathname.split("/").pop();
        let card = HsData.getCardById(cardId);
        this.state = {
            card: card
        };
    }

    componentDidMount () {
        document.title = `${this.state.card["name"][getLanguage()]} – the Hearthstone project`;
    }

    render () {
        return (
            <div>
                <CardDataPanel card={this.state.card} />
                <main className="left-aside">

                </main>
            </div>
        );
    }
}

export default CardPage;