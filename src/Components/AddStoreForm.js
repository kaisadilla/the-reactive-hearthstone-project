import React from 'react';

class AddStoreForm extends React.Component {
    constructor () {
        super();

        this.tryAddStore = this.tryAddStore.bind(this);

        this.state = {
            code: -1,
            name: "",
            color: null,
            openHours: null,
            closeHours: null,
            opened: null,
            type: null,
            holdsTournaments: false,
            dataError: false,
        }
    }

    componentDidUpdate () {
        console.log(this.state);
    }

    tryAddStore () {
        if (this.state.code < 0 || isNaN(this.state.code) || this.state.code.length === 0 || this.state.name.length === 0
            || this.state.color == null || this.state.openHours == null || this.state.closeHours == null || this.state.opened == null
            || this.state.type == null)
        {
            this.setState({
                dataError: true,
            })
        }
        else {
            this.props.addStore({
                coords: this.props.coords,
                code: this.state.code,
                name: this.state.name,
                color: this.state.color,
                openHours: this.state.openHours,
                closeHours: this.state.closeHours,
                opened: this.state.opened,
                type: this.state.type,
                holdsTournaments: this.state.holdsTournaments,
            })
        }
    }

    render() {
        return (
            <div className="disable-screen no-scroll">
                <div className="modal-dialog small-dialog">
                    <div className="field">
                        <label htmlFor="code">Code (unique): </label>
                        <input id="code" type="number" className="deck-code" onChange={evt => this.setState({code: evt.target.value})}/>
                    </div>
                    <div className="field">
                        <label htmlFor="name">Name: </label>
                        <input id="name" type="text" className="deck-code" onChange={evt => this.setState({name: evt.target.value})} maxLength="20"/>
                    </div>
                    <div className="field">
                        <label htmlFor="color">Color: </label>
                        <input id="color" type="color" className="deck-code" onChange={evt => this.setState({color: evt.target.value})}/>
                    </div>
                    <div className="field">
                        <label htmlFor="open-hours">Open hours: </label>
                        <input id="open-hours" type="time" className="deck-code" onChange={evt => this.setState({openHours: evt.target.value})}/>
                        <label htmlFor="close-hours"> to </label>
                        <input id="close-hours" type="time" className="deck-code" onChange={evt => this.setState({closeHours: evt.target.value})}/>
                    </div>
                    <div className="field">
                        <label htmlFor="opened">Opening date: </label>
                        <input id="opened" type="date" className="deck-code" onChange={evt => this.setState({opened: evt.target.value})}/>
                    </div>
                    <div className="field-radiogroup">
                        <span className="group-name">Store type</span>
                        <div className="radio-option">
                            <input id="pub" type="radio" name="store-type" className="deck-code" value="pub" onChange={evt => this.setState({type: evt.target.value})}/>
                            <label htmlFor="pub">Pub</label>
                        </div>
                        <div className="radio-option">
                            <input id="gamestore" type="radio" name="store-type" className="deck-code" value="gamestore" onChange={evt => this.setState({type: evt.target.value})}/>
                            <label htmlFor="gamestore">Game store</label>
                        </div>
                        <div className="radio-option">
                            <input id="other" type="radio" name="store-type" className="deck-code" value="other" onChange={evt => this.setState({type: evt.target.value})}/>
                            <label htmlFor="other">Other</label>
                        </div>
                    </div>
                    <div className="field">
                        <input id="tournament" type="checkbox" className="deck-code" onChange={evt => this.setState({holdsTournaments: evt.target.checked})}/>
                        <label htmlFor="tournament">Holds tournaments</label>
                    </div>
                    {this.state.dataError && <span className="notif">Some data on this form is not valid.</span>}
                    <div className="button-row">
                        <button type="button" className="btn-export" onClick={this.tryAddStore}>Add store</button>
                        <button type="button" className="btn-cancel" onClick={this.props.closeForm}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddStoreForm;