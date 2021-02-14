import React, { useState } from 'react';
import MousePos from '../../Logic/MouseTracker';

function CardHoverDisplay (props) {
    const vHeight = window.innerHeight; // the total height of the screen
    const mHeight = MousePos.y; // the current height position (y) of the mouse
    const top = (mHeight + 400 > vHeight) ? (MousePos.y - 425) : (MousePos.y + 45);

    return (
        <div className="card-hover" style={{top: `${top}px`}}>
            <img src={`https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${props.cardId}.png`} />
        </div>
    );
}

export default CardHoverDisplay;