import React from 'react';

class CardShowcase extends React.Component {
    state = {  }
    render () {
        let id = this.props.cardId;
        return (
            <a className="gallery-card-item" href={`card-info/${id}`} target="_blank">
                <img className="card-showcase" src={`https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${id}.png`} />
            </a>
        );
    }
}

export default CardShowcase;