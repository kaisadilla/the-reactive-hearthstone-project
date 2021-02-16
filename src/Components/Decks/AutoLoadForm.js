import React from 'react';

class AutoLoadForm extends React.Component {
    
    render() {
        return (
            <div className="disable-screen no-scroll">
                <div className="modal-dialog large-dialog">
                    <div className="field">
                        <span>There are unsaved changes stored in the backup. Do you want to load them?</span>
                    </div>
                    <div className="button-row">
                        <button type="button" className="btn-export" onClick={this.props.loadBackup}>Load deck</button>
                        <button type="button" className="btn-cancel" onClick={this.props.discardBackup}>Do not load</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AutoLoadForm;