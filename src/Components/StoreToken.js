import React from 'react';

class StoreToken extends React.Component {
    state = {  }
    render() {
        return (
            <div className="store-token" style={{backgroundColor: this.props.store.color}} onClick={this.props.onClick}>
                <span className="store-name">{this.props.store.name}</span>
                <span className="store-loc">{`${this.props.store.coords[0].toFixed(4)}, ${this.props.store.coords[1].toFixed(4)}`}</span>
            </div>
        );
    }
}

export default StoreToken;