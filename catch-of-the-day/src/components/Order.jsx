import React from 'react';
import {formatPrice} from '../helpers';

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
                <ul className="order">
                    {orderIds.map(i => this.renderOrderItem(i))}            
                    <li className="total">
                        <strong>Total:</strong>
                        {formatPrice(total)}
                    </li>
                </ul>
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
            <span>{count} pieces {fish.name}</span>
            {remove}             
            <span className="price">{formatPrice(count * fish.price)}</span>
        </li>
    }

}