import React from 'react';
import {formatPrice} from '../helpers';
import CSSTransitionGroup from 'react-addons-css-transition-group';

export default class Order extends React.Component {
    render() {
        const orderIds = Object.keys(this.props.order)
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';
            return isAvailable ? prevTotal + (count * (fish.price || 0)) : prevTotal;
        }, 0)
        return (
            <div className="order-wrap">
                <h2>Your order</h2>
                <CSSTransitionGroup 
                    className="order" 
                    component="ul"
                    transitionName="order"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}>
                    {orderIds.map(i => this.renderOrderItem(i))}            
                    <li className="total">
                        <strong>Total:</strong>
                        {formatPrice(total)}
                    </li>
                </CSSTransitionGroup>
            </div>
        )
    }

    renderOrderItem(key) {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const remove = <button onClick={e=>this.props.removeFromOrder(key)}>&times;</button>;

        if (!fish || fish.status === 'unavailable') {
            return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer available {remove}</li>
        }
        return <li key={key}>
            <span>
                <CSSTransitionGroup
                    component="span"
                    className="count"
                    transitionName="count"
                    transitionEnterTimeout={250}
                    transitionLeaveTimeout={250}
                >   
                    <span key={count}>{count}</span>
                </CSSTransitionGroup>
                pieces {fish.name}
            </span>
            {remove}             
            <span className="price">{formatPrice(count * fish.price)}</span>
        </li>
    }

    static propTypes = {
        order: React.PropTypes.object.isRequired,
        fishes: React.PropTypes.object.isRequired,
        removeFromOrder: React.PropTypes.func.isRequired
    }

}