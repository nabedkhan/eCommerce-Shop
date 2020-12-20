import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getProductDetails } from '../redux/actions/productsAction';
import Loader from './Loader';

const ProductDetails = () => {
    const { productId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const { loading, product } = useSelector(state => state.productDetails);

    useEffect(() => {
        dispatch(getProductDetails(productId))
    }, [productId, dispatch])

    const [qty, setQty] = useState(1);
    const addToCartHandler = () => {
        history.push(`/cart/${productId}?qty=${qty}`);
    }

    return (
        <section className="custom-height py-5">
            <Container>
                <Row>
                    {
                        loading ? <Loader /> : (
                            <>
                                <Col md={6}>
                                    <Image src={product.image} thumbnail />
                                </Col>
                                <Col md={6}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h2>{product.name}</h2>
                                            <p>{product.description}</p>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Category:</strong> {product.category}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Price:</strong> ${product.price}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Status: </strong>
                                            {product.countInStock > 0 ? 'Available in Stock' : 'Out Of Stock'}
                                        </ListGroup.Item>
                                        {
                                            product.countInStock > 0 && <ListGroup.Item>
                                                <div className="d-flex align-items-center">
                                                    <strong className="mr-4">Quantity: </strong>
                                                    <Form.Control
                                                        as="select"
                                                        onChange={e => setQty(e.target.value)}
                                                        custom
                                                    >
                                                        {
                                                            [...Array(product.countInStock).keys()].map(quantity =>
                                                                <option key={quantity} value={quantity + 1}>
                                                                    {quantity + 1}
                                                                </option>)
                                                        }
                                                    </Form.Control>
                                                </div>
                                            </ListGroup.Item>
                                        }

                                        <ListGroup.Item>
                                            <Button
                                                variant="primary"
                                                disabled={product.countInStock < 1}
                                                onClick={addToCartHandler}
                                            >Add To Cart</Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </>
                        )
                    }
                </Row>
            </Container>
        </section>
    );
};

export default ProductDetails;