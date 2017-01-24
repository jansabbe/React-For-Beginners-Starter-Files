import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import * as _ from 'lodash';
import base from '../base';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            fishes: {},
            order: {}
        }
    }

    componentWillMount() {
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {context:this, state:'fishes'});

        const prevOrder = localStorage.getItem(`${this.props.params.storeId}-order`)
        if (prevOrder) {
            this.setState({order: JSON.parse(prevOrder)})
        }
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem(`${this.props.params.storeId}-order`, JSON.stringify(nextState.order));
    }

    addFish(fish) {
        
        const fishes = {...this.state.fishes, [`fish-${Date.now()}`]: fish}
        this.setState({fishes})
    }

    updateFish(key, fish) {
        const fishes = {...this.state.fishes, [key]: fish}
        this.setState({fishes})
    }

    removeFish(key) {
        const fishes = {...this.state.fishes, [key]:null}
        this.setState({fishes})
    }

    addToOrder(key) {
        const order = {...this.state.order, [key]: this.state.order[key] + 1 || 1}
        this.setState({order})
    }

    removeFromOrder(key) {
        const order = _.omit(this.state.order, key);
        this.setState({order})
    }

    loadSamples() {
        this.setState({
            fishes: sampleFishes
        })
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="list-of-fishes">
                        {_.map(this.state.fishes, (value,key) => <Fish key={key} details={value} addToOrder={() => this.addToOrder(key)} />)}
                    </ul>
                </div>
                <Order 
                    fishes={this.state.fishes} 
                    order={this.state.order}
                    removeFromOrder={k => this.removeFromOrder(k)}/>
                <Inventory 
                    addFish={f => this.addFish(f)} 
                    loadSamples={() => this.loadSamples()} 
                    fishes={this.state.fishes} 
                    updateFish={(k,v) => this.updateFish(k,v)}
                    removeFish={(k) => this.removeFish(k)} />
            </div>
        )
    }
}

export default App;