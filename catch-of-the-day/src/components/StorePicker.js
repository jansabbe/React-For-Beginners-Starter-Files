import React from 'react';
import {getFunName} from '../helpers';

export default class StorePicker extends React.Component {
    goToStore(event) {
        event.preventDefault();
        var storeId = this.storeInput.value;
        this.context.router.transitionTo(`/store/${storeId}`);
    }

    render() {
        return (
            <form className="store-selector" onSubmit={e => this.goToStore(e)}>
                <h2>Please enter a store</h2>
                <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={input => this.storeInput = input} />
                <button type="submit">Visit Store</button>
            </form>
        )
    }

    static contextTypes = {
        router: React.PropTypes.object
    }
}