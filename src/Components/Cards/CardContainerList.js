import React from 'react';
import CardFilters from '../../Logic/CardFilters';
import HsData from '../../Logic/HsData';
import CardTokenExpanded from '../CardTokenExpanded';

class CardContainerList extends React.Component {
    state = {  }

    getAllCardElements () {
        const cards = [];
        const chosenExp = this.props.chosenExp;
        const filters = new CardFilters();

        for (const card of HsData.collectibleCards) {
            if ((chosenExp === "all" || card["set"] === chosenExp) && card["text"] !== undefined) {
                // check every filter
                if (   filters.checkQuery(this.props.filters.nameQuery, card)
                    && filters.checkClass(this.props.filters.cardClass, card)
                    && filters.checkCost(this.props.filters.cost, card)
                    && filters.checkRarity(this.props.filters.rarity, card)
                    && filters.checkType(this.props.filters.type, card)
                    && filters.checkTribe(this.props.filters.tribe, card)
                ) {
                    cards.push(<CardTokenExpanded cardId={card["id"]} key={card["id"]} />);
                }
            }
        }
        return cards;
    }

    render () {
        let cards = this.getAllCardElements();

        return (
            <div className="card-container-list" id="card-list">
                {cards}
            </div>
        );
    }
}

export default CardContainerList;