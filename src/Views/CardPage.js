import React from 'react';
import CardDataPanel from '../Components/Cards/CardDataPanel';
import DeckContainerList from '../Components/Decks/DeckContainerList';
import HsData from '../Logic/HsData';
import HsDB from '../Logic/HsDB';
import getLanguage from '../Logic/Language';

class CardPage extends React.Component {
    constructor () {
        super();
        let cardId = window.location.pathname.split("/").pop();
        let card = HsData.getCardById(cardId);
        this.state = {
            card: card,
            decksThatContainIt: [],
        };
    }

    componentDidMount () {
        document.title = `${this.state.card["name"][getLanguage()]} – the Hearthstone project`;
        // push all the decks that contain this card to state.decksThatContainIt.
        HsDB.getAllDecks().then(res => {
            for (let d of res) {
                if (d.cards.includes(this.state.card["id"])) {
                    this.setState(prevState => {
                        return {decksThatContainIt: [...prevState.decksThatContainIt, d]};
                    })
                }
            }
        });
    }

    render () {
        return (
            <div>
                <CardDataPanel card={this.state.card} />
                <main className="left-aside">
                    {this.state.decksThatContainIt.length > 0 && <DeckContainerList decks={this.state.decksThatContainIt} />}
                </main>
            </div>
        );
    }
}

export default CardPage;