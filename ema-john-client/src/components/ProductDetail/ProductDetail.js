import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
    const { productKey } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    document.title = "Product Detail | EmaJohn"

    useEffect(() => {
        fetch(`https://cryptic-ocean-79527.herokuapp.com/product/${productKey}`)
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                setProduct(data[0])
            })
    }, [productKey])

    return (
        <div style={{ padding: '3rem' }}>
            <h2>Product Detail</h2>
            {
                loading
                    ? <Button className="mt-5" variant="primary" disabled>
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                            Loading...
                        </Button>
                    : <Product showCartBtn={false} product={product}></Product>
            }
        </div>
    );
};

export default ProductDetail;