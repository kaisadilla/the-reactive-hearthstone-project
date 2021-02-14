import React from 'react';
import ReactDOM from "react-dom";
import HsData from '../../Logic/HsData';

class DeckCodeForm extends React.Component {
    constructor () {
        super();

        this.codeField = React.createRef();

        this.updateCode = this.updateCode.bind(this);
        this.copyToClipboard = this.copyToClipboard.bind(this);
        this.tryImportCode = this.tryImportCode.bind(this);
        this.state = {
            code: "",
            notification: false,
        }
    }

    updateCode (evt) {
        this.setState({
            code: evt.target.value,
        })
    }

    copyToClipboard () {
        navigator.clipboard.writeText(this.props.code);
        this.setState({
            notification: true,
        })
    }

    tryImportCode () {
        const deck = HsData.decodeDeckCode(this.state.code);
        // if (deck exists & there's no deckClass restriction) or (deck exists & its class fits the deckClass restriction).
        if ((deck && !this.props.deckClass) || (deck && deck.class === this.props.deckClass)) {
            this.props.onImport(deck);
        }
        else {
            const DOMcodeField = ReactDOM.findDOMNode(this.codeField.current);
            DOMcodeField.className = "shake error";
            setTimeout(() => DOMcodeField.className = "", 500);
            this.setState({
                notification: true,
            })
        }
    }
    
    render () {
        return (
            <div className="disable-screen no-scroll">
                <div className="modal-dialog large-dialog">
                    {this.props.mode === "export" &&
                        <div style={{width: "800px"}}>
                            <div className="field">
                                <label htmlFor="code">Code: </label>
                                <input id="code" type="text" className="deck-code" value={this.props.code} disabled/>
                            </div>
                            {this.state.notification && <span className="notif">Code copied to clipboard.</span>}
                            <div className="button-row">
                                <button type="button" className="btn-export" onClick={this.copyToClipboard}>Export</button>
                                <button type="button" className="btn-cancel" onClick={this.props.closeForm}>Close</button>
                            </div>
                        </div>
                    }
                    {this.props.mode === "import" &&
                        <div style={{width: "800px"}}>
                            <div className="field">
                                <label htmlFor="code">Code: </label>
                                <input id="code" type="text" className="deck-code" onChange={this.updateCode} ref={this.codeField} />
                            </div>
                            {this.state.notification && <span className="notif">This code is not valid for this class.</span>}
                            <div className="button-row">
                                <button type="button" className="btn-import" onClick={this.tryImportCode}>Import</button>
                                <button type="button" className="btn-cancel" onClick={this.props.closeForm}>Close</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default DeckCodeForm;