import React from 'react'
import {formatPrice} from '../helpers';

export default class Fish extends React.Component {
    render() {
        const {image, name, price, desc} = this.props.details;
        const isAvailable = this.props.details.status === 'available';

        return (
            <li className="menu-fish">
                <img src={image} />
                <h3 className="fish-name">
                    {name}
                    <span className="price">{formatPrice(price)}</span>
                </h3>
                <p>{desc}</p>
                <button disabled={!isAvailable} onClick={()=> this.props.addToOrder()} >{isAvailable ? 'Add to Order' : 'Sold Out!'}</button>
            </li>
        )
    }
}