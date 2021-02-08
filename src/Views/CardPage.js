import React from 'react';
import CardDataPanel from '../Components/Cards/CardDataPanel';
import HsData from '../Logic/HsData';

class CardPage extends React.Component {
    componentDidMount () {
        let cardId = window.location.pathname.split("/").pop();
        let card = HsData.getCardById(cardId);
        document.title = `${card["name"]} – the Hearthstone project`;
    }

    render () {
        return (
            <div>
                <CardDataPanel />
                <main className="left-aside">

                </main>
            </div>
        );
    }
}

export default CardPage;