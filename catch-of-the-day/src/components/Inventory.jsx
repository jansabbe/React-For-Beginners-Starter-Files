import React from 'react';
import AddFishForm from './AddFishForm'
import * as _ from 'lodash';
export default class Inventory extends React.Component {

    updateFish(event, key, fish) {
        const updatedFish = {...fish, [event.target.name]: event.target.value}
        this.props.updateFish(key, updatedFish);
    }

    renderInventory(fish, key) {
        return (
            <div className="fish-edit" key={key}>
                <input onChange={e => this.updateFish(e, key, fish)} type="text" name="name" value={fish.name} placeholder="Name" />
                <input onChange={e => this.updateFish(e, key, fish)} type="text" name="price" value={fish.price} placeholder="Price" />
                <select onChange={e => this.updateFish(e, key, fish)} name="status" value={fish.status}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold out!</option>
                </select>
                <textarea onChange={e => this.updateFish(e, key, fish)} placeholder="Description" name="desc" value={fish.desc} />
                <input onChange={e => this.updateFish(e, key, fish)} type="text"  name="image" value={fish.image} placeholder="Image Url" />
                <button onClick={e => this.props.removeFish(key)}>Delete Item</button>

            </div>
        )
    }

    render() {
        return (
            <div>
                <h2>Inventory</h2>
                {_.map(this.props.fishes, (f,k) => this.renderInventory(f,k))}
                <AddFishForm addFish={f => this.props.addFish(f)}></AddFishForm>
                <button onClick={() => this.props.loadSamples()}>Load samples</button>
            </div>
        )
    }
}