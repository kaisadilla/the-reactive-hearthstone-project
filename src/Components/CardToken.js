import React from 'react';

class CardToken extends React.Component {
    render () {
        return (
            <div className="card-token-reduced draggable" draggable="true" onDragStart={void(0)}>
                <div className="card-cost rarity-rare">5</div>
                <div className="card-name">
                    <img className="tile" src="https://art.hearthstonejson.com/v1/tiles/EX1_033.png" />
                    <span className="tile-fade-out"></span>
                    <span className="caption">Thing from Above</span>
                </div>
                <div className="card-amount">2</div>
            </div>
        );
    }
}

export default CardToken;