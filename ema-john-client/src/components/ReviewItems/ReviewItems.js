import React from 'react';

const ReviewItems = (props) => {
    // console.log(props.product)
    const { removeProduct, product: { key, name, quantity, price } } = props;
    // const { key, name, quantity, price } = props.product;

    const itemStyle = {
        borderBottom: '1px solid gray',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '100px'
    }

    return (
        <div style={itemStyle}>
            <h4>{name}</h4>
            <p>Quantity: {quantity}</p>
            <small> ${price} </small>
            <br/>
            <br/>
            <button
                className="remove-btn"
                onClick={()=>{removeProduct(key)}}>
                Remove
            </button>
        </div>
    );
};

export default ReviewItems;