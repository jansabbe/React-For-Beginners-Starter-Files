import React from 'react';

export default class AddFishForm extends React.Component {
    createFish(event) {
        event.preventDefault();
        const fish = {
            name: this.nameInput.value,
            price: this.priceInput.value,
            status: this.statusSelect.value,
            desc: this.descriptionTextArea.value,
            url: this.urlInput.value
        }
        this.props.addFish(fish);
        this.fishForm.reset();
    }

    render() {
        return (
            <form ref={f => this.fishForm = f} className="fish-edit" onSubmit={e=> this.createFish(e)}>
                <input ref={i => this.nameInput = i}type="text" placeholder="Name" />
                <input ref={i => this.priceInput = i}type="text" placeholder="Price" />
                <select ref={i => this.statusSelect = i}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold out!</option>
                </select>
                <textarea ref={i => this.descriptionTextArea = i}placeholder="Description" />
                <input ref={i => this.urlInput = i}type="text" placeholder="Image Url" />
                <button type="submit">Add Item</button>
            </form>
        )
    }
}