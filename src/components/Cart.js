import React, { useEffect } from 'react';
import { Alert, Button, Card, Col, Container, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { addToCartProduct, removeFromCartProduct } from '../redux/actions/cartAction';

const Cart = () => {
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);
    const qty = Number(history.location.search.split('=')[1]);

    useEffect(() => {
        if (id) {
            dispatch(addToCartProduct(id, qty));
        }
    }, [dispatch, id, qty])

    const items = cartItems.reduce((acc, item) => acc + (item.qty * item.price), 0);
    const tax = items > 1000 ? items * 0.05 : 0;
    const shipping = items > 1000 ? items * 0.02 : 0;
    const total = items + tax + shipping;

    const checkoutHandler = () => {
        history.push('/shipping');
    }

    return (
        <section className="custom-height py-5">
            <Container>
                <Row>
                    {
                        cartItems.length > 0 ? (
                            <>
                                <Col md={8}>
                                    <h1>Cart</h1>
                                    <hr />
                                    {
                                        cartItems.map(item => {
                                            return <Card className="p-3 mt-4" key={item.id}>
                                                <Row className="d-flex align-items-center">
                                                    <Col lg={2}>
                                                        <Image src={item.image} thumbnail />
                                                    </Col>
                                                    <Col lg={3} className="px-0">
                                                        <h5>{item.name}</h5>
                                                    </Col>
                                                    <Col lg={2} className="px-0 text-center">
                                                        <h5>${item.price}</h5>
                                                    </Col>
                                                    <Col lg={4} className="px-0 text-center">
                                                        <h5>
                                                            ${item.price} X {item.qty} = ${(item.price * item.qty).toFixed(2)}
                                                        </h5>
                                                    </Col>
                                                    <Col lg={1} className="px-0">
                                                        <Button onClick={() => dispatch(removeFromCartProduct(item.id))}>
                                                            <i className="fas fa-trash"></i>
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        })
                                    }
                                </Col>
                                <Col md={4} className="mt-2">
                                    <ListGroup>
                                        <ListGroup.Item>
                                            <h2 className="text-uppercase">Order Summary</h2>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Items: </strong>${items.toFixed(2)}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Shipping: </strong>${shipping.toFixed(2)}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Tax: </strong>${tax.toFixed(2)}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Total: </strong>${total.toFixed(2)}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Button
                                                onClick={checkoutHandler}
                                            >Checkout To Proceed</Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </>
                        ) : (
                                <Alert variant='danger'>
                                    Your cart is empty. <Link to="/">Go Back</Link>
                                </Alert>
                            )
                    }
                </Row>
            </Container>
        </section>
    );
};

export default Cart;