import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";

const ProductCard = ({ product }) => {
    const options = {
        size: 26,
        value: product.rating ? product.rating : 0,
        edit: false,
        isHalf: true,
    };
    return (
        <Col md={4}>
            <Card style={{ minHeight: '480px' }} className="mt-4">
                <Card.Img variant="top" className="p-2" src={product.image} />
                <Card.Body className="text-left">
                    <Link to={`/products/${product._id}`}><h3>{product.name}</h3></Link>
                    <div className="d-flex align-items-center justify-content-between">
                        <ReactStars {...options} />
                        <p className="mb-0">{product.numReviews} Reviews</p>
                    </div>
                    <h2 className="mt-3">${product.price}</h2>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default ProductCard;