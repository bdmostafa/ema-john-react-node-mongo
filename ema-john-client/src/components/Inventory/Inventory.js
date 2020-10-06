import React from 'react';

const Inventory = () => {
    const product = {};
    const handleAddProduct = () => {
        fetch('https://cryptic-ocean-79527.herokuapp.com/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(product)
        })
    }
    return (
        <div>
            <form action="">
                <p><span>Name: </span> <input type="text" name="" id=""/></p>
                <p><span>Price: </span> <input type="text" name="" id=""/></p>
                <p><span>Quantity: </span> <input type="number" name="" id=""/></p>
                <p><span>Product Image</span> <input type="file" name="" id=""/></p>
                <button onClick={handleAddProduct}>Add Product</button>
            </form>
            
        </div>
    );
};

export default Inventory;